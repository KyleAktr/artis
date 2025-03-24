import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { db } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { currentUser, updateUserData } = useContext(UserContext);
  const currentUserEmail = currentUser.email;
  const [validation, setValidation] = useState("");
  const [nom, setNom] = useState("");
  const [dicipline, setDicipline] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(currentUserEmail);
  const [website, setWebsite] = useState("");
  const [age, setAge] = useState("");
  const disciplines = [
    "Musique",
    "Graphisme",
    "AudioVisuel",
    "Art / Scène",
    "Photographie",
    "Mode",
  ];

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "utilisateurs", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setNom(docSnap.data().nom);
          setDicipline(docSnap.data().dicipline || "");
          setDetails(docSnap.data().details);
          setCity(docSnap.data().city);
          setBio(docSnap.data().bio);
          setEmail(docSnap.data().email);
          setWebsite(docSnap.data().website);

          setAge(docSnap.data().age);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      const userRef = doc(db, "utilisateurs", currentUser.uid);
      await setDoc(
        userRef,
        { age, city, nom, dicipline, details, bio, email, website },
        { merge: true }
      );
      await updateUserData();
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/private/private-user-profil");
  };

  return (
    <div>
      <NavUser />
      <h1>
        Complétez votre profil pour être découvert et pour vous connecter avec
        d'autres artistes.
      </h1>
      <form className="form-user" onSubmit={handleClick}>
        <div className="user-infos">
          <h2>Informations générales</h2>
          <label>
            Nom :
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
          <label>
            Dicipline(s) :
            <select
              value={dicipline}
              onChange={(e) => setDicipline(e.target.value)}
            >
              <option value="">Sélectionnez une discipline</option>
              {disciplines.map((disc) => (
                <option key={disc} value={disc}>
                  {disc.charAt(0).toUpperCase() + disc.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Détails spécifiques selon la dicipline artistique :
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>

          <label>
            Ville :
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label>
            Âge :
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label>
            Bio :
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
        </div>

        <div className="user-contact">
          <h2>Coordonnées et réseaux</h2>
          <label>E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Site web/portfolio</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <p className="validation">{validation}</p>
        <button onClick={handleSave}>Enregistrer</button>
      </form>
    </div>
  );
};

export default UserForm;
