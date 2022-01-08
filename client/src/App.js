import logo from './logo.svg';
import './App.css';

import Home from "./pages/Home";
import Donation from "./pages/Donations"

import {
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';



function App() {
  return (
    <div className="App">
      <Header/>

      <img src={logo} className="App-logo" alt="logo" />
       
        <Routes>
          <Route index element={<Home />} />
        </Routes>
          
    </div>
  );
}

export default App;
