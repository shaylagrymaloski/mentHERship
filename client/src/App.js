import logo from './logo.svg';
import './App.css';

import Home from "./pages/Home";
import Donation from "./pages/Donations"
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';



function App() {
  return (
    <div className="App">
      <Header/>

      <img src={logo} className="App-logo" alt="logo" />


      {/* <Route>
       // <Route index element={<Home />} />
      </Route>  */}
    </div>
  );
}

export default App;
