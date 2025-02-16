import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { Link, useNavigate } from "react-router-dom";

const UserProfil = () => {
  const { currentUser, userData } = useContext(UserContext);

  return (
    <div className="user-profile">
      <NavUser />
      <div className="profile-content">
        <h1>Profil de {userData.nom || "Artiste"}</h1>
        
        <div className="profile-info">
          <div className="info-section">
            <h2>Informations générales</h2>
            <p>Nom: {userData.nom}</p>
            <p>Ville: {userData.city}</p>
            <p>Discipline(s) : {userData.dicipline}</p>
            <p>Détails spécifiques selon la discipline artistique : {userData.details}</p>
            <p>Bio: ? {userData.bio}</p>
            <p>Âge: ? {userData.age}</p>

          </div>

          <div className="info-section">
            <h2>Coordonnées et réseaux</h2>
            <p>Email : {userData.email}</p>
            <p>Site web : 
              {userData.website ? (
                <a href={userData.website} target="_blank" rel="noopener noreferrer">
                  {userData.website}
                </a>
              ) : (
                "Non renseigné"
              )}
            </p>
          </div>
        </div>

        <Link to="/private/private-user-profil-form" className="edit-button">
          Modifier mon profil
        </Link>
      </div>
    </div>
  );
};

export default UserProfil;
