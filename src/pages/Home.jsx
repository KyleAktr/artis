import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import NavUser from "../components/NavUser";
import Nav from "../components/Nav";
import "../styles/pages/_home.scss";
import ThemeToggle from "../components/ThemeToggle";

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
      <ThemeToggle />
    </div>
  );
};

export default Home;
