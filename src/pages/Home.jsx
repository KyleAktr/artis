import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import NavUser from "../components/NavUser";
import Nav from "../components/Nav";
import "../styles/pages/_home.scss";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="home-page">
      {currentUser ? <NavUser /> : <Nav />}

      <div className="hero-section">
        <div className="logo">
          <h1>artis</h1>
        </div>
        <p className="tagline">La plateforme pour les artistes</p>

        <div className="scroll-indicator">
          <p>Swipe</p>
          <div
            className="double-arrow"
            onClick={() => {
              const target = document.getElementById("home-description");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="arrow">&#8964;</span>
            <span className="arrow">&#8964;</span>
          </div>
        </div>
      </div>
      <div className="home-description" id="home-description">
        <div className="home-description-text">
          <p>
            <strong> ARTIS </strong> est un site internet qui permet aux
            artistes de différents domaines (musique, graphisme, danse, cinéma,
            mode, etc.) de collaborer ensemble. <br />
          </p>
          <p>
            Le principe est simple : un artiste publie une annonce pour son
            projet en indiquant le type de profil qu’il recherche. Par exemple,
            un rappeur qui cherche un vidéaste pour réaliser un clip. Les
            artistes intéressés par l’annonce peuvent répondre et proposer leur
            aide. Une fois mis en contact, ils peuvent travailler ensemble pour
            concrétiser le projet.
          </p>
          <br />
          <p>
            <strong> ARTIS </strong> facilite ainsi les rencontres créatives et
            les collaborations entre artistes.
          </p>

          <Link className="colorbtn">Collaborer</Link>
        </div>
      </div>
      <div className="categories-carrousel">
        <div className="categories-carrousel-text">
          <h2>Les catégories</h2>
          <p>
            ARTIS est un site internet qui permet aux artistes de différents
            domaines (musique, graphisme, danse, cinéma, mode, etc.) de
            collaborer ensemble.
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/0/100.png"
                alt="musique"
              />
              <p>Musique</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/0/100.png"
                alt="graphisme"
              />
              <p>Graphisme</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/0/100.png"
                alt="danse"
              />
              <p>Danse</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/0/100.png"
                alt="cinéma"
              />
              <p>Cinéma</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <ThemeToggle />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
