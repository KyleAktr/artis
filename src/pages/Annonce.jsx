import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import NavUser from "../components/NavUser";

const AnnonceDetails = () => {
  const { annonceId } = useParams(); // Récupérer l'ID depuis l'URL
  const [annonce, setAnnonce] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const docRef = doc(db, "annonces", annonceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAnnonce({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Aucune annonce trouvée !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    };

    fetchAnnonce();
  }, [annonceId]);

  if (!annonce) return <p>Chargement...</p>;

  return (
    <div>
      <NavUser />
      <h1>{annonce.title}</h1>
      <p>{annonce.description}</p>
      <p>Publié par : {annonce.creatorName}</p>
      <p>Le {new Date(annonce.createdAt).toLocaleDateString()}</p>

      <button onClick={() => navigate(`/annoncements`)}>
        Retour aux annnonces
      </button>
    </div>
  );
};

export default AnnonceDetails;
