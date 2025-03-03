import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import NavUser from "../components/NavUser";

const Annoncements = () => {
  const [annoncements, setAnnoncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const annoncesRef = collection(db, "annonces");
        const snapshot = await getDocs(annoncesRef);
        const annoncesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAnnoncements(annoncesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="annoncements">
      <NavUser></NavUser>
      <h1>Liste des Annonces</h1>
      <ul>
        {annoncements.map((annoncement) => (
          <li key={annoncement.id}>
            <h2>{annoncement.title}</h2>
            <p>{annoncement.description}</p>
            <p>Publié par : {annoncement.creatorName}</p>
            <p>Le {new Date(annoncement.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Annoncements;
