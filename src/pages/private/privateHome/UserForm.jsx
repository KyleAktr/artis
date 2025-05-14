import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import NavUser from "../../../components/NavUser";
import { db, storage } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
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
  const [photoURL, setPhotoURL] = useState("");
  const [previousPhotoURL, setPreviousPhotoURL] = useState("");
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  
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
          setPhotoURL(docSnap.data().photoURL || "");
          setPreviousPhotoURL(docSnap.data().photoURL || "");
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handlePhotoChange = async (e) => {
    if (e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      
      try {
        setUploading(true);
        
        if (!storage) {
          throw new Error("Firebase Storage n'est pas correctement initialisé");
        }
        
        // Suppression de l'ancienne photo si elle existe
        if (previousPhotoURL) {
          try {
            const oldPhotoPath = decodeURIComponent(previousPhotoURL.split('/o/')[1].split('?')[0]);
            const oldPhotoRef = ref(storage, oldPhotoPath);
            await deleteObject(oldPhotoRef);
            console.log("Ancienne photo supprimée avec succès");
          } catch (deleteError) {
            console.error("Erreur lors de la suppression de l'ancienne photo:", deleteError);
          }
        }
        
        const storageRef = ref(storage, `profilePhotos/${currentUser.uid}_${Date.now()}`);
        
        await uploadBytes(storageRef, selectedPhoto);
        
        const url = await getDownloadURL(storageRef);
        
        setPhotoURL(url);
        setPreviousPhotoURL(url);
        
        const userRef = doc(db, "utilisateurs", currentUser.uid);
        await setDoc(userRef, { photoURL: url }, { merge: true });
        
        alert("Photo de profil mise à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors du téléchargement de la photo:", error);
        alert(`Erreur lors du téléchargement de la photo: ${error.message}`);
      } finally { 
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (currentUser) {
      const userRef = doc(db, "utilisateurs", currentUser.uid);
      
      // Créer un objet vide pour les données utilisateur
      const userData = {};
      
      if (nom !== undefined && nom !== "") userData.nom = nom;
      if (city !== undefined && city !== "") userData.city = city;
      if (dicipline !== undefined && dicipline !== "") userData.dicipline = dicipline;
      if (details !== undefined && details !== "") userData.details = details;
      if (bio !== undefined && bio !== "") userData.bio = bio;
      if (email !== undefined && email !== "") userData.email = email;
      if (website !== undefined && website !== "") userData.website = website;
      if (age !== undefined && age !== "") userData.age = age;
      if (photoURL !== undefined && photoURL !== "") userData.photoURL = photoURL;
      
      await setDoc(userRef, userData, { merge: true });
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
        <div className="user-photo">
          <h2>Photo de profil</h2>
          <div className="photo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            {photoURL && (
              <img 
                src={photoURL} 
                alt="Photo de profil" 
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px' }} 
              />
            )}
            
            <label 
              htmlFor="photo-upload" 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: uploading ? '#ccc' : '#4a4a4a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                display: 'inline-block'
              }}
            >
              {uploading ? 'Téléchargement en cours...' : 'Choisir une photo'}
            </label>
            <input 
              id="photo-upload"
              type="file" 
              accept="image/*" 
              onChange={handlePhotoChange} 
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </div>
        </div>

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
