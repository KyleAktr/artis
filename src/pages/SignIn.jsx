import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_artis.png";
import GoogleLogo from "../assets/img/google-logo.png";

// Composant de la page de connexion des utilisateurs
const SignIn = () => {
  // Récupère les fonctions `signIn` et `signInGoogle` depuis le contexte UserContext
  const { signIn, signInGoogle } = useContext(UserContext);

  // Hook pour naviguer entre les routes de l'application
  const navigate = useNavigate();

  // État local pour afficher les messages d'erreur ou de validation
  const [validation, setValidation] = useState("");

  // Référence utilisée pour accéder dynamiquement aux champs du formulaire
  const inputs = useRef([]);
  const addInputs = (el) => {
    // Ajoute les éléments de formulaire (email et mot de passe) à la référence `inputs`
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  // Référence pour manipuler le formulaire
  const formRef = useRef();

  // Fonction pour gérer la soumission du formulaire
  const handleForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    try {
      // Appelle la fonction d'authentification avec e-mail et mot de passe
      await signIn(inputs.current[0].value, inputs.current[1].value);
      // Réinitialise les messages d'erreur
      setValidation("");
      // Redirige l'utilisateur vers une page privée après connexion réussie
      navigate("/private/private-home");
    } catch {
      // Affiche un message d'erreur si l'authentification échoue
      setValidation("E-mail et/ou mot de passe incorrect");
    }
  };

  // Fonction pour gérer la connexion via Google
  const handleGoogleSignIn = async () => {
    try {
      // Appelle la fonction d'authentification avec Google
      await signInGoogle();
      // Redirige l'utilisateur vers une page privée après connexion réussie
      navigate("/private/private-home");
    } catch (err) {
      // Affiche un message d'erreur en cas de problème avec Google
      setValidation("Erreur avec Google. Réessayez.");
      console.error(err);
    }
  };

  // Fonction pour rediriger vers la page d'inscription
  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="signin">
      <Nav></Nav>
      <div className="signin-form">
        <img className="logo" src={Logo} alt="" />
        <div className="to-signup">
          <p>Première fois ici ? </p>
          <p className="navigate" onClick={handleClick}>
            Inscivez-vous
          </p>
        </div>
        <form ref={formRef} onSubmit={handleForm}>
          <label htmlFor="signInEmail">
            <input
              ref={addInputs}
              name="email"
              required
              type="email"
              placeholder="E-mail: "
            />
          </label>
          <label htmlFor="signInPwd">
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              placeholder="Mot de passe: **********"
            />
          </label>
          <p className="validation">{validation}</p>
          <button>Connexion</button>
        </form>
        <div className="connexion-with">
          <div class="separator">
            <span>Ou</span>
          </div>
          <img
            onClick={handleGoogleSignIn}
            className="google-logo"
            src={GoogleLogo}
            alt=""
          />
        </div>
        <p>Artis © 2025</p>
      </div>
    </div>
  );
};

export default SignIn;
