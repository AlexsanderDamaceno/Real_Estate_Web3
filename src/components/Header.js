import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png'; 
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';



const Header = () => 
{

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');

  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }
  


  async function getAddress() 
  {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  async function connectAccount()
  {
/*
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x5')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
     })


    }  

    */

    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
}


  useEffect(() => {

        if(window.ethereum == undefined)
          return;
       
        let val = window.ethereum.isConnected();
       
        if(val)
        {
          console.log("here");
          getAddress();
          toggleConnect(val);
          updateButton();
        }

        window.ethereum.on('accountsChanged', function(accounts){
          window.location.replace(location.pathname)
        })

  });


 return (

     <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Company Logo" className="h-8 mr-2" />
        <span className="text-lg font-bold">EtherHomes</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/marketplace" className="hover:text-gray-300">MarketPlace</Link>
         <Link to="/sellhouse" className="hover:text-gray-300">Sell</Link>
         <Link to="/myhouses" className="hover:text-gray-300">My Houses</Link>
      </div>

        <div>
        <div className='text-white text-bold text-right  text-sm '>
        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded text-sm mr-2 " onClick={connectAccount}>{ connected ? "Connected":"Connect Wallet"}</button>
        {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
         
         </div>
        </div>

    </div>

 );


}


export default Header; 
