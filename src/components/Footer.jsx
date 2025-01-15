import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
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
            <li>
              <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
            </li>
            <li>linkedin</li>
            <li>tiktok</li>
          </ul>
          <h2>artis</h2>
          <p>Artis © 2025</p>
        </div>
        <div className="newsletter">
          <h3>La newsletter</h3>
          <input type="text" placeholder="E-mail:" />
          <button>S'inscrire</button>
        </div>
      </div>
      <div className="footer-low">
        <div className="logo"></div>
        <div className="rgpd">
          <ul>
            <li>Confidentialité et cookies</li>
            <li>|</li>
            <li>Conditions générales</li>
            <li>|</li>
            <li>Accessibilité</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
