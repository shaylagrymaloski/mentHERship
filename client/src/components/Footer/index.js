import React from "react";
import { Link } from "react-router-dom";
import donate from '../../logo/DonateNow.png';

import "./Footer.css";

const Footer = () => {
  return (
   
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6><Link to="/donations"><img src={donate}  alt="logo" /> 
</Link></h6>
            <p class="text-justify"> We rely soley on donations to fund our mentorship program.
                    All donations go to improving our program by adding 
                    more learning opportunities for both our mentors and mentees!</p>
          </div>

          
        </div>
       
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
        
            </p>
          </div>

        </div>
      </div>
</footer>
  );
};

export default Footer;