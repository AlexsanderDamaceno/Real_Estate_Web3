import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header.js';
import Banner from './components/Banner.js';



function App() 
{
  return (
    <div className>
    <Header/>
    <Banner/>
    </div>
  );
}

export default App;
