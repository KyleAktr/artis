import React, { useContext } from "react";
import Nav from "../components/Nav";
import { UserContext } from "../context/userContext";
import Footer from "../components/Footer";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Nav></Nav>
      <h1>HOME</h1>
      {currentUser ? (
        <h2>Content de te revoir</h2>
      ) : (
        <h2>Tu n'est pas connecté</h2>
      )}
      <Footer />
    </div>
  );
};

export default Home;
