import React, { useContext } from "react";
import Nav from "../../../components/Nav";
import { UserContext } from "../../../context/userContext";

const PrivateHome = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Nav />
      <h1>Bienvenue {currentUser.email}</h1>
      <h2>Mon profil</h2>
    </div>
  );
};

export default PrivateHome;
