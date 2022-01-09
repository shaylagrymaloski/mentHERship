import "../App.css";
import React from "react";
import logo from '../logo-headtags.png';
import register from '../logo/Register.png';
import login from '../logo/LogIn.png';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';




const StartPage = () => {
    return (
      <div class="startContainer">
            <img src={logo} className="App-logo" alt="logo" /> 
            <div> 
              <div> <Link to="/register"><img src={register}/> </Link></div>
              <span class="alreadyRegister">Already Registered? </span>
              <Link to="/login"><img class="loginImage" src={login}/> </Link>
            </div>
            <Footer/>
      </div>
    );
  };
  
  export default StartPage;