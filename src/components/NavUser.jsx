import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "../styles/components/_navbar.scss";
import logoImg from "../assets/img/logo_artis.png";

const NavUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const { signOutUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch {
      alert(
        "Impossible de déconnecter pour une raison inconnue. Merci de vérifier votre connexion internet."
      );
    }
  };

  return (
    <div className="navbar">
      <div className={`nav ${isHomePage ? 'home-nav' : ''}`}>
        <div className="nav-left">
          <Link to="/">
            <img src={logoImg} alt="Artis" className="logo-img" />
          </Link>
        </div>
        
        <div className="nav-center">
          <Link to="/home">Accueil</Link>
          <Link to="/annoncements">Voir les annonces</Link>
          <Link to="/create">Créer une annonce</Link>
          <Link to="/about">À propos</Link>
        </div>
        
        <div className="nav-right">
          <Link to="/private/private-user-profil">Mon Profil</Link>
          <button onClick={logOut} className="logout-btn">Déconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
