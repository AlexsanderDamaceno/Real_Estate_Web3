import { Link } from "react-router-dom";

import Banner_house from '../assets/House1.jpg'; 

const Banner = () => 
{

 return (
  <section className="py-3 h-full max-h-[640px] mb-8 xl:mb-24 mr-1">

  <div className="rounded-md	 rounded-lg rounded-xl rounded-3xl lg:ml-8 xl:ml-[135px] flex flex-col flex-1 px-4 lg:px-0 items-center lg:items-start lg:flex-row text-center lg:text-left justify-center">

  <h1 className="text-4x1 lg:text-[58px] font-semibold">
   <span className="text-blue-600">Buy</span> Your Dream House Today!
   </h1>

  <div>


    <img src={Banner_house} alt='' width="640" height="640
    " ></img>


  </div>

   
  
  </div>

  </section>

 );

}


export default Banner; 
