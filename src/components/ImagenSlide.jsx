import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import desktop from "../assets/Portada/Dekstop.png";
import motorcycle from "../assets/Portada/moto.jpg";
import portada from "../assets/Portada/PortadaDesk.png";
import remotorizacion from "../assets/Portada/Remotorizacion.png";
import Remoto from "../assets/Portada/Remoto.png";

const CustomPrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "black",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.7)" },
    }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>
);

const CustomNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "black",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.7)" },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const ImagenSlide = () => {
  const isMobile = useMediaQuery("(max-width:960px)");
  const navigate = useNavigate(); // <-- Añadido useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeUntilOpen, setTimeUntilOpen] = useState("");

  const openingHour = 8;
  const closingHour = 16;

  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    setIsOpen(
      currentDay !== 0 &&
        currentHour >= openingHour &&
        currentHour < closingHour
    );
  }, []);

  const getNextOpeningTime = () => {
    const now = new Date();
    const nextOpening = new Date(now);
    if (now.getDay() === 0 || now.getHours() >= closingHour) {
      nextOpening.setDate(now.getDate() + 1);
      nextOpening.setHours(openingHour, 0, 0, 0);
    } else if (now.getHours() < openingHour) {
      nextOpening.setHours(openingHour, 0, 0, 0);
    }
    return nextOpening;
  };

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = getNextOpeningTime() - now;
        const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
        const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
        const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        setTimeUntilOpen(`${h}:${m}:${s}`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!isMobile) setShowInfo(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowInfo(false);
  };

  const handleClick = () => {
    if (isMobile) setShowInfo((prev) => !prev);
  };

  const formatTime12 = (hour) => {
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? "am" : "pm";
    return `${h}:00 ${ampm}`;
  };

  const desktopImages = [
    { src: desktop, alt: "Desktop Image 1" },
    { src: portada, alt: "Desktop Image 2" },
    { src: remotorizacion, alt: "Desktop Image 3" },
  ];

  const mobileImages = [
    { src: motorcycle, alt: "Mobile Image 2" },
    { 
      src: Remoto, 
      alt: "Mobile Image 4", 
      onClick: () => navigate({ pathname: "/", search: "?subcategoria=14" }) // <-- Aquí actualizamos la query string
    },
  ];

  const imageList = isMobile ? mobileImages : desktopImages;

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
    pauseOnHover: false,
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      {/*  <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "rgba(241, 241, 241, 0.66)",
          padding: "5px 10px",
          borderRadius: "7px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 3,
          transition: "all 0.3s ease",
          cursor: isMobile ? "pointer" : "default",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              backgroundColor: isOpen ? "green" : "red",
              marginRight: "10px",
            }}
          />
          <b>{isOpen ? "Abierto" : "Cerrado"}</b>
        </Box>
        {showInfo && (
          <Box sx={{ marginTop: "5px", fontSize: "0.85rem" }}>
            {isOpen ? (
              <span>{`Horario: ${formatTime12(openingHour)} - ${formatTime12(closingHour)}`}</span>
            ) : (
              <span>{`Abrimos en ${timeUntilOpen}`}</span>
            )}
          </Box>
        )}
      </Box>*/}

      <Slider {...settings}>
        {imageList.map((image, index) => (
          <Box
            key={index}
            onClick={image.onClick ? image.onClick : undefined}
            sx={{ cursor: image.onClick ? "pointer" : "default" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImagenSlide;
