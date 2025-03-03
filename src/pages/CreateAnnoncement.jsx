import React, { useContext, useState } from "react";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import NavUser from "../components/NavUser";

const CreateAnnoncement = () => {
  const { currentUser, updateUserData } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      try {
        const annoncesRef = collection(db, "annonces");
        await addDoc(annoncesRef, {
          userId: currentUser.uid,
          title,
          description,
          createdAt: new Date().toISOString(),
        });

        // Réinitialiser le formulaire
        setTitle("");
        setDescription("");
        alert("Annonce créée avec succès!");
      } catch (error) {
        console.error("Erreur lors de la création de l'annonce:", error);
        alert("Erreur lors de la création de l'annonce");
      }
    }
  };

  return (
    <div>
      <NavUser></NavUser>
      <h1>Publier une annonce</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default CreateAnnoncement;
