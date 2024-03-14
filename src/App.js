import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header.js';
import Banner from './components/Banner.js';
import HouseView from './components/HousesView.js';



function App() 
{
  return (
    <div className>
    <Header/>
    <Banner/>
    <HouseView/>
    </div>
  );
}

export default App;
