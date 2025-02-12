import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { Link, useNavigate } from "react-router-dom";

const UserProfil = () => {
  const { currentUser, userData } = useContext(UserContext);

  return (
    <div>
      <NavUser />
      <h1>Bienvenue dans le clan {userData.nom} !</h1>
      <br />
      <h2>Prêt à te forger une réputation à {userData.city} ?</h2>
      <Link to="/private/private-user-profil-form">Modifier mon profil</Link>
    </div>
  );
};

export default UserProfil;
