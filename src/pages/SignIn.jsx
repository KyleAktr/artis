import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_artis.png";
import GoogleLogo from "../assets/img/google-logo.png";

const SignIn = () => {
  const { signIn, signInGoogle } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);
      // formRef.current.reset();
      setValidation("");
      navigate("/private/private-home");
      // console.log(cred);
    } catch {
      setValidation("E-mail et/ou mot de passe n'est pas bon");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      navigate("/private/private-home");
    } catch (err) {
      setValidation("Erreur avec Google. Réessayez.");
      console.error(err);
    }
  };

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
          <a onClick={handleClick}>Inscivez-vous</a>
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
