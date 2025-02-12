import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { db } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const UserForm = () => {
  const { currentUser } = useContext(UserContext);
  const [validation, setValidation] = useState("");
  const [nom, setNom] = useState("");
  const [dicipline, setDicipline] = useState([
    "musique",
    "art du spéctacle",
    "peinture",
  ]);
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [age, setAge] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "utilisateurs", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setNom(docSnap.data().nom);
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
        { age, city, nom, details, bio, email, website },
        { merge: true }
      );
      alert("Profil mis à jour !");
    }
  };

  return (
    <div>
      <NavUser />

      <h1>
        Complétez votre profil pour être découvert et pour vous connecter avec
        d'autres artistes.
      </h1>
      <div className="form-user">
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
            <input />
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
              type="number"
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
      </div>
    </div>
  );
};

export default UserForm;
