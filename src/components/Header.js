import { Link } from "react-router-dom";

import Logo from '../assets/Logo.png'; 

const Header = () => 
{

 return (

     <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Company Logo" className="h-8 mr-2" />
        <span className="text-lg font-bold">EtherHomes</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/marketplace" className="hover:text-gray-300">MarketPlace</Link>
         <Link to="/sellhouse" className="hover:text-gray-300">Sell</Link>
         <Link to="/myhouses" className="hover:text-gray-300">MyHouses</Link>
         <Link to="/connectaccount" className="hover:text-gray-300">Connect Account</Link>
        </div>
    </div>

 );


}


export default Header; 
