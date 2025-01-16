import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase-config";

// Instanciation du fournisseur d'authentification Google
const googleProvider = new GoogleAuthProvider();

// Création d'un contexte pour gérer l'état utilisateur
export const UserContext = createContext();

// Composant fournisseur de contexte pour encapsuler l'application
export function UserContextProvider(props) {
  // État local pour conserver les informations sur l'utilisateur actuel
  const [currentUser, setCurrentUser] = useState();
  // État pour indiquer si les données d'authentification sont en cours de chargement
  const [loadingData, setLoadingData] = useState(true);

  // Utilisation de `useEffect` pour écouter les changements d'état de l'utilisateur
  useEffect(() => {
    // Souscription à l'état d'authentification Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Mise à jour de l'état utilisateur lors d'un changement (connexion ou déconnexion)
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    // Nettoyage de la souscription lors de la destruction du composant
    return unsubscribe;
  }, []);

  // Fonction pour créer un compte utilisateur avec e-mail et mot de passe
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);

  // Fonction pour connecter un utilisateur existant avec e-mail et mot de passe
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  // Fonction pour connecter un utilisateur via Google
  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  return (
    // Fournit les fonctions d'authentification et l'état utilisateur à toute l'application
    <UserContext.Provider value={{ signUp, currentUser, signIn, signInGoogle }}>
      {/* Rend les enfants du composant seulement lorsque les données d'authentification sont chargées */}
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
