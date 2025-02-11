import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";

const UserProfil = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <NavUser />
      <h1>Bienvenue dans le clan Artis ! {currentUser.email}</h1>
      <br />
      <h2>
        Avant de commencer à trouver tes nouveaux compagnons de route, nous
        avons besoins de quelques informations.{" "}
      </h2>
    </div>
  );
};

export default UserProfil;
