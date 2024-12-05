import React from "react";
import '../CSS/Components/Footer.css'
import kangaroo from '../assets/images/kgroo.png'
import instagram from '../assets/images/instagram.png'
import facebook from '../assets/images/facebook.png'
import linkedin from '../assets/images/linkedin.png'
import twitter from '../assets/images/twitter.png'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="top-footer">
        <img src={kangaroo}></img>
        <p>Kangaroo</p>
      </div>
      <div className="bottom-footer">
        <img src={instagram}></img>
        <img src={facebook}></img>
        <img src={linkedin}></img>
        <img src={twitter}></img>
      </div>
    </footer>
  );
};

export default Footer;
