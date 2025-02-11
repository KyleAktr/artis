import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const NavUser = () => {
  const navigate = useNavigate();

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
      <div className="nav">
        <Link to="/home">Accueil</Link>
        <Link to="/annoncements">Voir les annonces</Link>
        <Link to="/create">Créer une annonce</Link>
        <Link to="/about">A propos</Link>
        <Link to="/signin">Se connecter</Link>
        <Link to="/signup">S'inscrire</Link>
        <button onClick={logOut}>Déconnexion</button>
      </div>
    </div>
  );
};

export default NavUser;
