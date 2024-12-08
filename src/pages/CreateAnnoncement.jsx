import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const CreateAnnoncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnoncement = {
      title: title,
      description: description,
    };

    try {
      await axios.post("http://localhost:3001/announcements", newAnnoncement);
      alert("Annonce créée avec succès");
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
      alert("Erreur lors de la création de l'annonce.");
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div>
        <Nav></Nav>
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
