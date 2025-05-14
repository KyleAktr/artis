import React, { useContext } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import NavUser from "../components/NavUser";
import { UserContext } from "../context/userContext";

const About = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser ? <NavUser /> : <Nav />}
      <h1>ABOUT</h1>
      <Footer />
    </div>
  );
};

export default About;
