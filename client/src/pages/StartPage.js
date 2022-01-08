import "../App.css";
import React from "react";
import logo from '../logo-headtags.png';
import register from '../logo/Register.png';
import login from '../logo/LogIn.png';
import { Link } from "react-router-dom";




const StartPage = () => {
    return (
      <div>
            <img src={logo} className="App-logo" alt="logo" /> 
            <div class="login"> 
              <div> <Link to="/register"><img src={register} /> </Link></div>
              <div >Already Registered? <Link to="/login"><img src={login}/> </Link> </div>
            </div>
      </div>
  
    );
  };
  
  export default StartPage;