import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import NavUser from "../../../components/NavUser";
import { Link, useNavigate } from "react-router-dom";


const UserProfil = () => {
  const { currentUser, userData } = useContext(UserContext);
  const [userAnnonces, setUserAnnonces] = useState([])

  useEffect(() => {
    const fetchUserAnnonces = async () => {
      if (currentUser) {
        try {
          // Créer une requête pour filtrer les annonces par userId
          const q = query(
            collection(db, "annonces"),
            where("userId", "==", currentUser.uid)
          );
          
          const snapshot = await getDocs(q);
          const annoncesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Trier les annonces par date de création (plus récentes en premier)
          const sortedAnnonces = annoncesData.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          
          setUserAnnonces(sortedAnnonces);
        } catch (error) {
          console.error("Erreur lors de la récupération des annonces:", error);
        }
      }
    };

    fetchUserAnnonces();
  }, [currentUser]);

  return (
    <div className="user-profile">
      <NavUser />
      <div className="profile-content">
        <h1>Profil de {userData.nom || "Artiste"}</h1>

        <div className="profile-info">
          {userData.photoURL ? (
            <div className="profile-photo">
              <img 
                src={userData.photoURL} 
                alt="Photo de profil" 
                className="profile-image"
              />
            </div>
          ) : (
            <div className="profile-photo-placeholder">
              {userData.nom ? userData.nom.charAt(0).toUpperCase() : "A"}
            </div>
          )}
          
          <div className="info-container">
            <div className="info-section">
              <h2>Informations générales</h2>
              <p>Nom: {userData.nom}</p>
              <p>Ville: {userData.city}</p>
              <p>Discipline(s) : {userData.dicipline}</p>
              <p>
                Détails spécifiques selon la discipline artistique :{" "}
                {userData.details}
              </p>
              <p>Bio: ? {userData.bio}</p>
              <p>Âge: ? {userData.age}</p>
            </div>

            <div className="info-section">
              <h2>Coordonnées et réseaux</h2>
              <p>Email : {userData.email}</p>
              <p>
                Site web :
                {userData.website ? (
                  <a
                    href={userData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.website}
                  </a>
                ) : (
                  "Non renseigné"
                )}
              </p>
            </div>
          </div>
        </div>

        <Link to="/private/private-user-profil-form" className="edit-button">
          Modifier mon profil
        </Link>
      </div>
      <br />
      <h2>Mes annonces :</h2>
      {userAnnonces.length === 0 ? (
            <p>Vous n'avez pas encore publié d'annonces.</p>
          ) : (
            userAnnonces.map((annonce) => (
              <div key={annonce.id}>
                <h3>{annonce.title}</h3>
                <p>{annonce.description}</p>
                <p>Publié le: {new Date(annonce.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
    </div>
  );
};

export default UserProfil;
