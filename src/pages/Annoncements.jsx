import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import NavUser from "../components/NavUser";
import Nav from "../components/Nav";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faListUl, faLocationDot, faCircleUser, faGraduationCap, faCircleInfo, faClock, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import "../styles/pages/_annoncements.scss";
import ThemeToggle from "../components/ThemeToggle";

const Annoncements = () => {
  const [annoncements, setAnnoncements] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    locations: false,
    artists: false,
    levels: false,
    purpose: false,
    duration: false,
    formation: false
  });
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    "Musique",
    "Graphisme",
    "AudioVisuel",
    "Art / Scène",
    "Photographie",
    "Mode",
  ];
  const numbers = [1, 2, 3, 4, "5+"];
  const levels = ["Débutant", "Intermédiaire", "Avancé"];
  const purposes = ["Lucratif", "Non-Lucratif"];
  const locations = [
    "Paris",
    "Lyon",
    "Marseille",
    "Bordeaux",
    "Lille",
    "Toulouse",
  ];
  const durations = ["Court terme", "Long terme"];
  const formations = ["Oui", "Non"];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const annoncesRef = collection(db, "annonces");
        const snapshot = await getDocs(annoncesRef);
        const annoncesData = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          console.log("Données brutes de l'annonce:", data);
          
          // Vérifier si l'annonce a un ID de créateur
          const creatorId = data.creatorId || data.userId || data.uid;
          
          if (creatorId) {
            console.log("ID du créateur trouvé:", creatorId);
            try {
              const userRef = doc(db, "utilisateurs", creatorId);
              const userSnap = await getDoc(userRef);
              
              if (userSnap.exists()) {
                const userData = userSnap.data();
                console.log("Données utilisateur pour", creatorId, ":", userData);
                
                // Vérifier les propriétés disponibles
                if (userData.photoURL) {
                  console.log("Photo trouvée:", userData.photoURL);
                } else {
                  console.log("Pas de photo trouvée dans les données utilisateur");
                }
                
                return {
                  id: docSnapshot.id,
                  ...data,
                  creatorPhotoURL: userData.photoURL || null,
                  creatorName: userData.nom || data.creatorName || "Utilisateur"
                };
              } else {
                console.log("Utilisateur non trouvé pour l'ID:", creatorId);
              }
            } catch (err) {
              console.error("Erreur lors de la récupération du profil utilisateur:", err);
            }
          } else {
            console.log("Pas d'ID de créateur trouvé dans l'annonce");
          }
          
          return {
            id: docSnapshot.id,
            ...data
          };
        }));
        
        console.log("Données des annonces enrichies:", annoncesData);
        setAnnoncements(annoncesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="annoncements-page">
      {currentUser ? <NavUser /> : <Nav />}

      <div className="content">
        <div className="filters-panel">
          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('categories')} 
              className={`filter-header ${expandedSections.categories ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faListUl} className="icon" />
                Catégories
              </span>
            </h2>
            {expandedSections.categories && (
              <div className="categories-grid">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${
                      selectedCategories.includes(category) ? "active" : ""
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    <div
                      className={`radio-circle ${
                        selectedCategories.includes(category) ? "active" : ""
                      }`}
                    />
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="theme-section">
            <ThemeToggle />
          </div>

          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('locations')} 
              className={`filter-header ${expandedSections.locations ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faLocationDot} className="icon" />
                Lieux
              </span>
            </h2>
            {expandedSections.locations && (
              <div className="select-container">
                <select>
                  <option value="">▼</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('artists')} 
              className={`filter-header ${expandedSections.artists ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faCircleUser} className="icon" />
                Artistes
              </span>
            </h2>
            {expandedSections.artists && (
              <div className="numbers-grid">
                {numbers.map((number) => (
                  <button
                    key={number}
                    className={selectedNumber === number ? "active" : ""}
                    onClick={() =>
                      setSelectedNumber(selectedNumber === number ? null : number)
                    }
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('levels')} 
              className={`filter-header ${expandedSections.levels ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                Niveaux
              </span>
            </h2>
            {expandedSections.levels && (
              <div className="categories-grid">
                {levels.map((level) => (
                  <button
                    key={level}
                    className={`category-btn ${
                      selectedLevel === level ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedLevel(selectedLevel === level ? null : level)
                    }
                  >
                    <div
                      className={`radio-circle ${
                        selectedLevel === level ? "active" : ""
                      }`}
                    />
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('purpose')} 
              className={`filter-header ${expandedSections.purpose ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faCircleInfo} className="icon" />
                But
              </span>
            </h2>
            {expandedSections.purpose && (
              <div className="categories-grid">
                {purposes.map((purpose) => (
                  <button
                    key={purpose}
                    className={`category-btn ${
                      selectedPurpose === purpose ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedPurpose(
                        selectedPurpose === purpose ? null : purpose
                      )
                    }
                  >
                    <div
                      className={`radio-circle ${
                        selectedPurpose === purpose ? "active" : ""
                      }`}
                    />
                    {purpose}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('duration')} 
              className={`filter-header ${expandedSections.duration ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faClock} className="icon" />
                Durée
              </span>
            </h2>
            {expandedSections.duration && (
              <div className="categories-grid">
                {durations.map((duration) => (
                  <button key={duration} className="category-btn">
                    <div className="radio-circle" />
                    {duration}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="filter-section">
            <h2 
              onClick={() => toggleSection('formation')} 
              className={`filter-header ${expandedSections.formation ? 'active' : ''}`}
            >
              <span className="title-with-icon">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                Formation
              </span>
            </h2>
            {expandedSections.formation && (
              <div className="categories-grid">
                {formations.map((formation) => (
                  <button key={formation} className="category-btn">
                    <div className="radio-circle" />
                    {formation}
                  </button>
                ))}
              </div>
            )}
          </div>
          
        </div>

        <div className="announcements-grid">
          {annoncements.map((annoncement) => {
            return (
              <div
                key={annoncement.id}
                className="announcement-card"
                onClick={() => navigate(`/annonce/${annoncement.id}`)}
              >
                <div className="like-badge">
                  <FontAwesomeIcon icon={faHeartRegular} />
                </div>
                
                <div className="card-header">
                  {annoncement.creatorPhotoURL && (
                    <img
                      src={annoncement.creatorPhotoURL}
                      alt="Profile"
                      className="profile-image"
                    />
                  )}
                  
                  <div className="title-section">
                    <h2>{annoncement.title}</h2>
                    <div className="creator-info">
                      <span className="username">{annoncement.creatorName || "Utilisateur"}</span>
                      <span className="separator">•</span>
                      <span className="date">
                        {annoncement.createdAt 
                          ? new Date(annoncement.createdAt).toLocaleDateString() 
                          : "Date inconnue"}
                      </span>
                    </div>
                    
                    <div className="tags">
                      {annoncement.categories &&
                        annoncement.categories.map((category, index) => (
                          <span key={index}>{category}</span>
                        ))}
                      {annoncement.niveau && <span>{annoncement.niveau}</span>}
                    </div>
                  </div>
                </div>

                {annoncement.categorie && (
                  <div className="categorie">{annoncement.categorie}</div>
                )}

                <div className="description">{annoncement.description}</div>
                
                <div className="contact-links">
                  <a href="#" title="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="#" title="WhatsApp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                  <a href="#" title="Discord">
                    <FontAwesomeIcon icon={faDiscord} />
                  </a>
                </div>

                <div className="card-footer">
                  <span>@{annoncement.creatorName?.toLowerCase().replace(/\s+/g, '-') || "user"}</span>
                  <div className="date">
                    {annoncement.createdAt 
                      ? new Date(annoncement.createdAt).toLocaleDateString() 
                      : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Annoncements;
