import logo from './logo-headtags.png';
import './App.css';

import Home from "./pages/Home";
import Donation from "./pages/Donations"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StartPage from "./pages/StartPage"

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
          <Route index element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/donations" element={<Donation />} />
        </Routes>
          
    </div>
  );
}

export default App;
