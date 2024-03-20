import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useContext } from "react";
import HouseCard from './HouseCards.js';
import Footer from './Footer.js';
import HouseRealEstate from '../HouseRealEstate.json';
import axios from "axios";
import { useState } from "react";
import Header from './Header.js';
import Banner from './Banner.js';



const HouseView = () => 
{

const houses = [];

let addr = "";


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
  

  
    const signer = provider.getSigner();

    addr = await signer.getAddress();
   
    let contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADRESS, HouseRealEstate.abi, signer)
  
   
    let transaction = await contract.getAllHouses()
 
    const items = await Promise.all(transaction.map(async i => {

        var tokenURI = await contract.tokenURI(i.tokenId);

        let House_Listed = await contract.getListedTokenForId(i.tokenId);

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
            Listed: House_Listed.currentlyListed,
           
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

 

 let count_listed = 0; 


 


 return (
  <div>

  <Header/>
  <Banner/>

  <div>
  
  <div className="container mx-auto">


  <h1 className="text-3xl font-bold mb-4">Available Houses</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.map((house, index) => (

        (house.Listed) &&  <HouseCard key={index} house={house} />
        
        

      ))}

    
   </div>

  
</div>




</div>
<Footer  position={"relative"}/>
</div>



 );


}


export default HouseView; 