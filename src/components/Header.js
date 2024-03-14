import { Link } from "react-router-dom";

const Header = () => 
{

 return (

  <div>

  <div className="container flex">

  <div className="flex gap-6 items-center">

  <Link className="bg-blue-600 hover:bg-blue-800 transition text-white px-4 py-3 rounded-lg" to=''> MarketPlace</Link>
  <Link className="bg-blue-600 hover:bg-blue-800 transition text-white px-4 py-3 rounded-lg" to=''> Sell </Link>
  <Link className="bg-blue-600 hover:bg-blue-800 transition text-white px-4 py-3 rounded-lg" to=''> My Houses </Link>
  <Link className="bg-blue-600 hover:bg-blue-800 transition text-white px-4 py-3 rounded-lg" to=''> Log in</Link>
  
  </div> 

  </div>
  
  </div>

 );


}


export default Header; 
