import { Link } from "react-router-dom";
import { useEffect , useState } from "react";


const HouseCard = ({ house }) => {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    


    return (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={toggleModal}>
            <img src={house.imageUrl} alt={house.name} className="mb-4" />
            <h2 className="text-xl font-bold">{house.name}</h2>
            <p className="text-gray-600 mb-2">{house.description}</p>
            <p className="text-gray-800 font-semibold">{house.price}</p>
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
                <img src={house.imageUrl} alt={house.name} className="mb-4" />
                <h2 className="text-xl font-bold">{house.name}</h2>
                <p className="text-gray-600 mb-2">{house.description}</p>
                <p className="text-gray-800 font-semibold">{house.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Buy</button>
              </div>
            </div>
          )}
        </>
      );
          
    
  };

  export default HouseCard;