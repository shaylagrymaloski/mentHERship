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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* <Route> */}
       {/* // <Route index element={<Home />} /> */}
        {/* <Route path="/donations" element={<Donation />} />
      </Route> */}
    </div>
  );
}

export default App;
