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
      {currentUser ? "Ravi de te revoir" : "Yo, connecte toi"}
      <Footer />
    </div>
  );
};

export default Home;
