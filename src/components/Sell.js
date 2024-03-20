import Navbar from "./Header";
import { useState } from "react";
import HouseRealEstate from '../HouseRealEstate.json';
import { uploadFileToIPFS, uploadJSONToIPFS }  from "../pinate.js";
import { useLocation } from "react-router";
import Footer from "./Footer.js";



export default function SellHouse () 
{

    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();
    

    async function OnChangeFile(e) 
    {
        var file = e.target.files[0];

        console.log(ethers.version)
        
        try {
            
          
            updateMessage("Uploading image.. please dont click anything!")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                
                updateMessage("")
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }


    async function uploadMetadataToIPFS() 
    {
        const {name, description, price} = formParams;
        
        if( !name || !description || !price || !fileURL)
        {
            updateMessage("Please fill all the fields!")
            return -1;
        }

        const nftJSON =
        {
            name, description, price, image: fileURL
        }

        try
        {
            
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }

        catch(e) 
        {
            console.log("error uploading JSON metadata:", e);
        }
    }

    async function resolveENSName(ensName) {
        const provider = ethers.getDefaultProvider(); // Use your Ethereum provider
        const address = await provider.resolveName(ensName);
        return address;
    }

    async function listHouse(e)
    {
        e.preventDefault();

       
        try {
            const metadataURL = await uploadMetadataToIPFS();

            if(metadataURL === -1)
                return;

    
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const signer = await provider.getSigner();

            console.log("name: " + resolveENSName(HouseRealEstate.contractName + ".eth"));


            updateMessage("Uploading House NFT(takes  about 5 mins).. please dont click anything!")

       
            let contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADRESS, HouseRealEstate.abi, signer);

  
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getHouseUploadPrice()
            listingPrice = listingPrice.toString()

        

            
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
           
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")

            
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    return (
        <div>
        <div className="">
        <Navbar></Navbar>
       
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-blue-500 mb-8">Upload your House to the  House marketplace</h3>
                <div className="mb-4">
                    <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="name">House Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="House Name..." onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="description">House Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="House Description" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-red-500 text-center">{message}</div>
                <button onClick={listHouse} className="font-bold mt-10 w-full bg-blue-500 text-white rounded p-2 shadow-lg" id="list-button">
                    Upload House
                </button>
            </form>
            </div>
          </div>
         <Footer position={"relative"}/>
        </div>
    )
}