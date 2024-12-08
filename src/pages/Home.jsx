import React from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
  const handleClick = () => {
    alert("Bouton cliqué !");
  };
  return (
    <div>
      <Nav></Nav>
      <h1>HOME</h1>
      <Button label="Clique ici" onClick={handleClick} />
      <NavLink to="/about">
        <li>Page About</li>
      </NavLink>
    </div>
  );
};

export default Home;
