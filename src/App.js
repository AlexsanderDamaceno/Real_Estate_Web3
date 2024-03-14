import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header.js';
import Banner from './components/Banner.js';
import HouseView from './components/HousesView.js';
import Footer from './components/Footer.js';



function App() 
{
  return (
    <div className>
    <Header/>
   
    <div className="pt-10">
       <Banner/>
    </div>
   
    <HouseView/>
    <Footer/>
    </div>
  );
}

export default App;
