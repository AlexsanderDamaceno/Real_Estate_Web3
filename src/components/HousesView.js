import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useContext } from "react";
import HouseCard from './HouseCards.js';
import HouseRealEstate from '../HouseRealEstate.json';
import axios from "axios";
import { useState } from "react";



const HouseView = () => 
{

const houses = [];


const [data, updateData] = useState(houses);
const [dataFetched, updateFetched] = useState(false);

const GetIpfsUrlFromPinata = (pinataUrl) => 
{
  var IPFSUrl = pinataUrl.split("/");
  const lastIndex = IPFSUrl.length;
  IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
  return IPFSUrl;
};

async function  getAllNFTs() {
    const ethers = require("ethers");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const signer = provider.getSigner(accounts[0]);
    alert(process.env.REACT_APP_CONTRACT_ADRESS);
    let contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADRESS, HouseRealEstate.abi, signer)
  
   
    let transaction = await contract.getAllHouses()
  

   
    const items = await Promise.all(transaction.map(async i => {

        var tokenURI = await contract.tokenURI(i.tokenId);

       

        tokenURI = GetIpfsUrlFromPinata(tokenURI);

        let meta = await axios.get(tokenURI);
        meta = meta.data;

       

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

 


 return (


  <div className="container mx-auto">
  <h1 className="text-3xl font-bold mb-4">Available Houses</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data && data.map(house => (
      <HouseCard key={house.id} house={house} />
    ))}
  </div>
</div>



 );


}


export default HouseView; 