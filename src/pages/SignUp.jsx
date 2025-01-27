import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_artis.png";
import GoogleLogo from "../assets/img/google-logo.png";

// Composant de la page d'inscription des utilisateurs
const SignUp = () => {
  // Récupère les fonctions `signUp` et `signInGoogle` du contexte UserContext
  const { signUp, signInGoogle } = useContext(UserContext);

  // Hook pour naviguer entre les routes de l'application
  const navigate = useNavigate();

  // État local pour stocker les messages de validation ou d'erreur
  const [validation, setValidation] = useState("");

  // Référence utilisée pour récupérer les valeurs des champs de formulaire
  const inputs = useRef([]);
  const addInputs = (el) => {
    // Ajoute chaque champ de formulaire à la référence `inputs` s'il n'y est pas déjà
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  // Référence pour manipuler le formulaire (par exemple pour le réinitialiser)
  const formRef = useRef();

  // Fonction de gestion du formulaire d'inscription
  const handleForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission du formulaire

    // Validation côté client : Vérifie que les mots de passe sont suffisants et identiques
    if (
      inputs.current[1].value.length < 6 ||
      inputs.current[2].value.length < 6
    ) {
      setValidation("6 caractères minimum");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passes ne correspondent pas");
      return;
    }

    try {
      // Appelle la fonction d'inscription avec e-mail et mot de passe
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset(); // Réinitialise le formulaire
      setValidation(""); // Réinitialise les messages de validation
      navigate("/private/private-user-profil"); // Redirige l'utilisateur vers une page privée
    } catch (err) {
      // Gestion des erreurs spécifiques à Firebase
      console.dir(err);
      if (err.code === "auth/invalid-email") {
        setValidation("Le format de l'e-mail n'est pas bon");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Un compte existe déjà avec cette e-mail");
      }
    }
  };

  // Fonction de gestion de l'inscription via Google
  const handleGoogleSignIn = async () => {
    try {
      // Appelle la fonction d'authentification avec Google
      await signInGoogle();
      navigate("/private/private-user-profil"); // Redirige vers une page privée après la connexion
    } catch (err) {
      // Affiche un message d'erreur en cas de problème avec l'authentification Google
      setValidation("Erreur avec Google. Réessayez.");
      console.error(err);
    }
  };

  // Fonction pour rediriger vers la page de connexion
  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div className="signup">
      <Nav></Nav>
      <div className="signup-form">
        <img className="logo" src={Logo} alt="" />
        <div className="to-signin">
          <p>Déjà inscrit ? </p>
          <p className="navigate" onClick={handleClick}>
            M'identifier
          </p>
        </div>
        <form ref={formRef} onSubmit={handleForm}>
          <label htmlFor="signUpEmail">
            <input
              ref={addInputs}
              name="email"
              required
              type="email"
              placeholder="E-mail: "
            />
          </label>
          <label htmlFor="signUpPwd">
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              placeholder="Mot de passe: **********"
            />
          </label>
          <label htmlFor="repeatPwd">
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              placeholder="Confirmer le mot de passe: **********"
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

export default SignUp;
