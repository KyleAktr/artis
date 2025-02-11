import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { db } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const UserForm = () => {
  const { currentUser } = useContext(UserContext);
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, "utilisateurs", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setAge(docSnap.data().age);
          setCity(docSnap.data().city);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (currentUser) {
      const userRef = doc(db, "utilisateurs", currentUser.uid);
      await setDoc(userRef, { age, city }, { merge: true });
      alert("Profil mis à jour !");
    }
  };

  return (
    <div>
      <NavUser />
      <label>Âge :</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label>Ville :</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSave}>Enregistrer</button>
    </div>
  );
};

export default UserForm;
