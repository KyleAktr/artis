import React from "react";
import image from "../../../assets/img/8V9A8715-Modifier-2-Modifier-Modifier.jpg";
import Nav from "../../../components/Nav";

const PrivateHome = () => {
  return (
    <div>
      <Nav />
      <h1>Connecté !</h1>
      <img src={image} alt="" />
    </div>
  );
};

export default PrivateHome;
