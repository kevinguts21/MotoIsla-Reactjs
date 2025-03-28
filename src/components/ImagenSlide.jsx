import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import desktop from "../assets/Portada/Dekstop.png"; // 1920x510
import motorcycle from "../assets/Portada/moto.jpg"; // 1920x1080
import service from "../assets/Portada/Services.png";
import portada from "../assets/Portada/PortadaDesk.png";
import repair from "../assets/Portada/repair.png";
import remotorizacion from "../assets/Portada/Remotorizacion.png";

// Custom Left Arrow
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

// Custom Right Arrow
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
  // Detect if the view is mobile
  const isMobile = useMediaQuery("(max-width:960px)");

  // Images for desktop and mobile views
  const desktopImages = [
    { src: desktop, alt: "Desktop Image 1" },
    { src: portada, alt: "Desktop Image 2" },
    { src: remotorizacion, alt: "Desktop Image 3" },
  ];

  const mobileImages = [
    { src: service, alt: "Mobile Image 1" },
    { src: motorcycle, alt: "Mobile Image 2" },
    { src: repair, alt: "Mobile Image 3" },
  ];

  // Select images based on the view
  const imageList = isMobile ? mobileImages : desktopImages;

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 4500, // Time between slides (3.5 seconds)
    nextArrow: <CustomNextArrow />, // Custom Right Arrow
    prevArrow: <CustomPrevArrow />, // Custom Left Arrow
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Adjust this value to move dots higher or lower
          width: "100%",
        }}
      >
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
    pauseOnHover: false, // Pause the autoplay when hovering
  };

  // Estado de apertura de la tienda
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentDay = new Date().getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const currentTime = new Date().getHours();

    if (currentDay !== 0 && currentTime >= 8 && currentTime < 16) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      {/* Cartel de apertura */}
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "rgba(241, 241, 241, 0.66)",
          padding: "5px",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          zIndex: 3, // Asegúrate de que esté por encima de otros elementos
        }}
      >
        {isOpen ? (
          <Box
            sx={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              backgroundColor: "green",
              marginRight: "10px",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              backgroundColor: "red",
              marginRight: "10px",
            }}
          />
        )}
        {isOpen ? <b>Abierto</b> : <b>Cerrado</b>}
      </Box>

      <Slider {...settings}>
        {imageList.map((image, index) => (
          <Box key={index}>
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
