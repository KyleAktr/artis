import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Annoncements = () => {
    const [annoncements, setAnnoncement] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/announcements")
        .then((response) => {
            setAnnoncement(response.data);
        })
        .catch((error) => {
            console.error("Erruer lors de la récupération des annonces :", error);
            
        })
    })




    return (
        <div>
            <Link to="/create">Publier une annonce</Link>
            <h1>Liste des Annonces</h1>
            <ul>
                {annoncements.map((annoncement) => (

                <li key={annoncement.id}>
                    <h2>{annoncement.title}</h2>
                    <p>{annoncement.description}</p>

                </li>
                ))}
            </ul>
        </div>
    );
};

export default Annoncements;