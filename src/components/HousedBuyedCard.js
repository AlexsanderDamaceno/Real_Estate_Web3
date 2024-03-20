import { Link } from "react-router-dom";
import { useEffect , useState } from "react";
import { GetIpfsUrlFromPinata } from "../pinate";
import HouseRealEstate from '../HouseRealEstate.json';


const HouseCardBuyed = ({ house }) => {

    

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    
    
    const ImageIPFSUrl = GetIpfsUrlFromPinata(house.image);

    const [message, updateMessage] = useState('');



    async function buyNFT(tokenId) 
    {
      try {
          const ethers = require("ethers");
         
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
         
          let contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADRESS, HouseRealEstate.abi, signer);
          const salePrice = ethers.utils.parseUnits(house.price, 'ether')

          updateMessage("Buying the House... Please Wait While Processing Transaction")

      

          let transaction = await contract.executeSale(tokenId, {value:salePrice});
          await transaction.wait();
  
          alert('You successfully bought the  House!');
          updateMessage("");
      }
      catch(e) {
          alert("Upload Error Info"+e)
      }
  }

 
  

    return (
       <div>
          <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={toggleModal}>
            <img src={ImageIPFSUrl} alt={house.name} className="mb-4  w-full" />
            <h2 className="text-xl font-bold">{house.name}</h2>
            <p className="text-gray-600 mb-2">{house.description}</p>
            <p className="text-gray-800 font-semibold">{"Price "}{house.price}{"  Ether"}</p>
          </div>

          {showModal && (
           
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50" onClick={closeModal}>
              <div className="bg-white rounded-lg shadow-md p-4 w-1/3" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
                
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
               
                </button>

                <img src={ImageIPFSUrl} alt={house.name} className="mb-4 w-full" />
                <h2 className="text-xl font-bold">{house.name}</h2>
                <p className="text-gray-600 mb-2">{house.description}</p>
                <p className="text-gray-800 font-semibold">{"Price "} {house.price} {"  Ether"}</p>
                           
              </div>
            </div>
          )}
        </div>
      );
          
    
  };

  export default HouseCardBuyed;