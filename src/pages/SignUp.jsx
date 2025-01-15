import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp } = useContext(UserContext);

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
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      navigate("/private/private-home");
      // console.log(cred);
    } catch (err) {
      // console.dir(err);
      if (err.code === "auth/invalid-email") {
        setValidation("Le format de l'e-mail n'est pas bon");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Un compte existe déjà avec cette e-mail");
      }
    }
  };

  return (
    <div>
      <Nav></Nav>
      <h1>SignUp</h1>
      <div className="signup-form">
        <div className="to-signin">
          <p>Déjà inscit ? </p>
          <a href="">M'identifier</a>
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
          <label htmlFor="signUpPWD">
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              placeholder="Mot de passe: "
            />
          </label>
          <label htmlFor="repeatPwd">
            <input
              ref={addInputs}
              name="pwd"
              required
              type="password"
              placeholder="Confirmer le mot de passe: "
            />
          </label>
          <p>{validation}</p>
          <button>Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
