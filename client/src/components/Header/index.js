import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
        <div><Link to="/">Home</Link></div>
        <div><Link to="/donations">Donations</Link></div>
        
        
    </div>
  );
};

export default Header;