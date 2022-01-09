import React from "react";
import { Link } from "react-router-dom";
import logo from '../../logo-headtags.png';

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
        <div><Link to="/"> <img className="headerLogo" src={logo} alt="logo" /> </Link></div>       
    </div>
  );
};

export default Header;