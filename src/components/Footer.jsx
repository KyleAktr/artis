import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="about">
        <h3>À propos</h3>
        <ul>
          <li>Qui somme nous ?</li>
          <li>FAQ</li>
          <li>Notre but</li>
        </ul>
      </div>
      <div className="find-us">
        <h3>Nous rencontrer</h3>
        <ul>
          <li>Interview</li>
          <li>Les membres</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="social-networks">
        <h3>Nos réseaux</h3>
        <ul>
          <li>insta</li>
          <li>linkedin</li>
          <li>tiktok</li>
        </ul>
      </div>
      <div className="newsletter">
        <h3>La newsletter</h3>
        <input type="text" placeholder="E-mail:" />
        <button>S'inscrire</button>
      </div>
    </div>
  );
};

export default Footer;
