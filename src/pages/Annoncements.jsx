import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import NavUser from "../components/NavUser";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_annoncements.scss";

const Annoncements = () => {
  const [annoncements, setAnnoncements] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const navigate = useNavigate();

  const categories = ["Musique", "Graphisme", "AudioVisuel", "Art / Scène", "Photographie", "Mode"];
  const numbers = [1, 2, 3, 4, "5+"];
  const levels = ["Débutant", "Intermédiaire", "Avancé"];
  const purposes = ["Lucratif", "Non-Lucratif"];
  const locations = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse"];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const annoncesRef = collection(db, "annonces");
        const snapshot = await getDocs(annoncesRef);
        const annoncesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnoncements(annoncesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="annoncements-page">
      <NavUser />
      
      <div className="content">
        <div className="filters-panel">
          <div className="filter-section">
            <h2>Catégories</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategories.includes(category) ? 'active' : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`radio-circle ${selectedCategories.includes(category) ? 'active' : ''}`} />
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h2>Lieux</h2>
            <div className="select-container">
              <select>
                <option value="">▼</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-section">
            <h2>Nombre de personnes</h2>
            <div className="numbers-grid">
              {numbers.map((number) => (
                <button
                  key={number}
                  className={selectedNumber === number ? 'active' : ''}
                  onClick={() => setSelectedNumber(selectedNumber === number ? null : number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h2>Niveaux</h2>
            <div className="categories-grid">
              {levels.map((level) => (
                <button
                  key={level}
                  className={`category-btn ${selectedLevel === level ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                >
                  <div className={`radio-circle ${selectedLevel === level ? 'active' : ''}`} />
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h2>But</h2>
            <div className="categories-grid">
              {purposes.map((purpose) => (
                <button
                  key={purpose}
                  className={`category-btn ${selectedPurpose === purpose ? 'active' : ''}`}
                  onClick={() => setSelectedPurpose(selectedPurpose === purpose ? null : purpose)}
                >
                  <div className={`radio-circle ${selectedPurpose === purpose ? 'active' : ''}`} />
                  {purpose}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="announcements-grid">
          {annoncements.map((annoncement) => (
            <div 
              key={annoncement.id} 
              className="announcement-card"
              onClick={() => navigate(`/annonce/${annoncement.id}`)}
            >
              <div className="card-header">
                <div className="title-section">
                  <h2>{annoncement.title}</h2>
                  <div className="tags">
                    {annoncement.categories && annoncement.categories.map((category, index) => (
                      <span key={index}>{category}</span>
                    ))}
                    {annoncement.niveau && <span>{annoncement.niveau}</span>}
                  </div>
                </div>
                {annoncement.creatorPhotoURL && (
                  <img 
                    src={annoncement.creatorPhotoURL} 
                    alt="Profile" 
                    className="profile-image"
                  />
                )}
              </div>

              <div className="description">
                {annoncement.description}
              </div>

              <div className="card-footer">
                <div className="username">
                  <span>{annoncement.creatorName}</span>
                  <span>•</span>
                  <span>{new Date(annoncement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Annoncements;
