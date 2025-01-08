import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar">
      <Link to="/home">Accueil</Link>
      <Link to="/signin">Se connecter</Link>
      <Link to="/signup">S'inscrire</Link>
      <Link to="/annoncements">Voir les annonces</Link>
      <Link to="/create">Créer une annonce</Link>
      <Link to="/about">A propos</Link>
    </div>
  );
};

export default Nav;
