import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase-config";
import "../styles/components/_navbar.scss";
import logoImg from "../assets/img/logo_artis.png";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert(
        "Impossible de déconnecter pour une raison inconnue. Merci de vérifier votre connexion internet."
      );
    }
  };

  return (
    <div className="navbar">
      <div className={`nav ${isHomePage ? "home-nav" : ""}`}>
        <div className="nav-left">
          <Link to="/">
            <img src={logoImg} alt="Artis" className="logo-img" />
          </Link>
        </div>

        <div className="nav-center">
          <Link to="/home">Accueil</Link>
          <Link to="/annoncements">Voir les annonces</Link>
          <Link to="/create">Créer une annonce</Link>
          <Link to="/about">A propos</Link>
        </div>

        <div className="nav-right">
          <Link to="/signin" className="connect-btn">
            Se connecter
          </Link>
          <Link to="/signup" className="colorbtn">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
