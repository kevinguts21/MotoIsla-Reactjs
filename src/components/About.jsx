import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import "../About.css";
import motoislalogo from "../assets/motoislalogo.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import repair from "../assets/repair.jpg";
import tools from "../assets/Tools.jpg";

const About = () => {
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const logo = document.querySelector(".about-image");
      const slogan = document.querySelector(".qaranta-title");

      if (logo) {
        const opacity = Math.max(0, 1 - scrollY / 400);
        logo.style.opacity = opacity;
      }

      if (slogan) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = scrollY / maxScroll;

        // Responsivo: escalado diferente para móvil y escritorio
        const isMobile = window.innerWidth <= 768;
        const baseScale = isMobile ? 1 : 1.2;
        const maxScale = isMobile ? 1.4 : 2.5;
        const scale = Math.min(
          maxScale,
          baseScale + progress * (maxScale - baseScale)
        );

        slogan.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      <div className="main-section fade-in">
        <div className="image-container">
          <img
            src={motoislalogo}
            alt="Moto Isla Surl"
            className="about-image"
          />
        </div>
        <div className="main-content">
          <div className="content-row">
            <div className="text-section">
              <h1>¿Qué hacemos?</h1>
              <p className="description">
                Somos una empresa comercializadora de piezas automotores.
                Nuestro compromiso es brindar soluciones rápidas y eficientes
                para tus necesidades.
              </p>
              <p className="description">
                Nos especializamos en reparación, reconstrucción y mantenimiento
                de vehículos que incluye la chapistería, pintura y electricidad
                a chasis, carrocería, motores de combustión interna. Además de
                la comercialización de partes y piezas de motos.
              </p>
            </div>
            <div className="text-section">
              <h2>Contamos con:</h2>
              <p className="description">
                Personal altamente capacitado, partes y piezas de calidad,
                rapidez en la ejecución, garantía por escrito, servicios tanto a
                personas Jurídicas como a personas Naturales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section fade-in">
        <h2>¿Dónde radicamos?</h2>
        <p className="location">
          <PlaceIcon />
          Nos encontramos en Calle 39A entre 47 y 49, Nueva Gerona.
        </p>
      </div>

      <div className="section fade-in">
        <h2>¿Cómo contactarnos?</h2>
        <p className="location">
          <CallIcon />
          Teléfono:
          <a href="tel:53036894" className="contact-link">
            +5353036894
          </a>
        </p>
        <p className="location">
          <EmailIcon />
          Email:
          <a href="mailto:contacto@motoislasurl.com" className="contact-link">
            motoislasurl@gmail.com
          </a>
        </p>
      </div>

      <div className="fade-in">
        <h2>Servicios que prestamos</h2>
        <div className="services-container">
          {/* Servicio 1 */}
          <div className="service">
            <img src={tools} alt="Servicio 1" />
            <h2>Venta de respuestos y accesorios</h2>
            <p>
              Ofrecemos una amplia variedad de repuestos, piezas y accesorios
              para vehículos automotores.
            </p>
            <p className={showMore1 ? "show-more" : "hide"}>
              Garantizando calidad, durabilidad y compatibilidad con las
              principales marcas del mercado. Nuestro objetivo es brindar
              soluciones confiables para el mantenimiento, personalización y
              reparación de tu vehículo, asegurando siempre un servicios ágil y
              profesional.
            </p>
            <a
              onClick={() => setShowMore1(!showMore1)}
              style={{ cursor: "pointer" }}
            >
              {showMore1 ? "Leer menos" : "Leer más"}
            </a>
          </div>

          {/* Servicio 2 */}
          <div className="service">
            <img src={repair} alt="Servicio 2" />
            <h2>Reparación, reconstrucción y mantenimiento</h2>
            <p>
              Nos especializamos en ofrecer servicios integrales para garantizar
              el óptimo funcionamiento de su vehículo.
            </p>
            <p className={showMore2 ? "show-more" : "hide"}>
              Desde reparaciones mecánicas y eléctricas hasta reconstrucción de
              componentes y mantenimiento preventivo, adaptadas a las
              necesidades de cada cliente.
            </p>
            <a
              onClick={() => setShowMore2(!showMore2)}
              style={{ cursor: "pointer" }}
            >
              {showMore2 ? "Leer menos" : "Leer más"}
            </a>
          </div>
        </div>
      </div>
      
      

      <div className="slogan fade-in">
        <h2 className="qaranta-title">"Su moto merece lo mejor"</h2>
      </div>
    </div>
  );
};

export default About;
