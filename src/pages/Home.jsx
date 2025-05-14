import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import NavUser from "../components/NavUser";
import Nav from "../components/Nav";
import "../styles/pages/_home.scss";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="home-page">
      {currentUser ? <NavUser /> : <Nav />}

      <div className="hero-section">
        <div className="logo">
          <h1>artis</h1>
        </div>
        <p className="tagline">La plateforme pour les artistes</p>

        <div className="scroll-indicator">
          <p>Swipe</p>
          <div className="double-arrow">
            <span className="arrow">&#8964;</span>
            <span className="arrow">&#8964;</span>
          </div>
        </div>
      </div>
      <div className="home-description">
        <div className="home-description-text">
          <p>
            <strong> ARTIS </strong> est un site internet qui permet aux
            artistes de différents domaines (musique, graphisme, danse, cinéma,
            mode, etc.) de collaborer ensemble. <br />
          </p>
          <p>
            Le principe est simple : un artiste publie une annonce pour son
            projet en indiquant le type de profil qu’il recherche. Par exemple,
            un rappeur qui cherche un vidéaste pour réaliser un clip. Les
            artistes intéressés par l’annonce peuvent répondre et proposer leur
            aide. Une fois mis en contact, ils peuvent travailler ensemble pour
            concrétiser le projet.
          </p>
          <br />
          <p>
            <strong> ARTIS </strong> facilite ainsi les rencontres créatives et
            les collaborations entre artistes.
          </p>

          <Link className="colorbtn">Collaborer</Link>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Home;
