import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";

const PrivateHome = () => {
  const { currentUser, userData } = useContext(UserContext);

  return (
    <div>
      <NavUser />
      <h1>Bienvenue {currentUser.email}</h1>
      <p>Tu habite à {userData.city}</p>
      <h2>Mon profil</h2>
    </div>
  );
};

export default PrivateHome;
