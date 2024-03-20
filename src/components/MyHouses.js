import Navbar from "./Header";
import { useLocation, useParams } from 'react-router-dom';
import HouseRealEstate from "../HouseRealEstate.json";
import axios from "axios";
import { useState } from "react";
import HouseCard from "./HouseCards";
import Header from "./Header";
import HouseCardBuyed from "./HousedBuyedCard";
import Footer from "./Footer";


export default function ListMyHouses () {


    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getHouseData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        
        let contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADRESS, HouseRealEstate.abi, signer)       
        let transaction = await contract.getMyHouse()

      
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
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

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }





    const params = useParams();
    const tokenId = params.tokenId;
    
    if(!dataFetched)
         getHouseData(tokenId);

  

    return (
        <div>
        <Header></Header>
        <div className="container mx-auto">

        <h1 className="text-3xl font-bold mb-4">Available Houses:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data && data.map(house => (

            <HouseCardBuyed key={house.id} house={house} />
          ))}
        </div>
          
        <div className="mt-10 text-xl text-center">
        {data.length == 0 ? " No House(s) to display":""}
      
         </div>

      </div>

      <Footer  position={"fixed"}/>
    </div>
      
    )
};