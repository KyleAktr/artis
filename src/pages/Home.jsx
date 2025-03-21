import React, { useContext } from "react";
import Nav from "../components/Nav";
import { UserContext } from "../context/userContext";
import Footer from "../components/Footer";
import NavUser from "../components/NavUser";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {/* <Nav></Nav> */}
      {currentUser ? (
        <>
          <NavUser></NavUser>
          <h2>Bienvue {currentUser.email}</h2>
        </>
      ) : (
        <>
          <Nav></Nav>
          <h2>Tu n'es pas connecté</h2>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
