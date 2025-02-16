import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

// Instanciation du fournisseur d'authentification Google
const googleProvider = new GoogleAuthProvider();

// Création du contexte utilisateur
export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  // Fonction pour mettre à jour les données utilisateur
  const updateUserData = async () => {
    if (currentUser) {
      const userRef = doc(db, "utilisateurs", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, "utilisateurs", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({});
        }
      } else {
        setUserData({}); // Réinitialisation des données utilisateur lors de la déconnexion
      }
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  // Fonction d'inscription
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);

  // Fonction de connexion
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  // Connexion avec Google
  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  // Fonction de déconnexion
  const signOutUser = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserData({});
  };

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        signInGoogle,
        signOutUser,
        updateUserData,
        currentUser,
        userData,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
