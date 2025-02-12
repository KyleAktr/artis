import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const NavUser = () => {
  const navigate = useNavigate();
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
      <div className="nav">
        <Link to="/home">Accueil</Link>
        <Link to="/annoncements">Voir les annonces</Link>
        <Link to="/create">Créer une annonce</Link>
        <Link to="/about">À propos</Link>
        <Link to="/private/private-user-profil">Mon Profil</Link>
        <button onClick={logOut}>Déconnexion</button>
      </div>
    </div>
  );
};

export default NavUser;
