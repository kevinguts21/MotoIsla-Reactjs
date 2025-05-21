import React, { useState } from "react";
import Slider from "react-slick";
import { Box, IconButton, useMediaQuery, Divider } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import remotorizacion from "../assets/Portada/Remotorizacion.png";
import Remoto from "../assets/Portada/Remoto.png";
import Buy from "../assets/Portada/Buy.png";
import bici from "../assets/Portada/bici.jpg";
import cleta from "../assets/Portada/Cleta.png";
import biciniño from "../assets/Biciniñoroja.png";
import montana from "../assets/montañabici.jpg";
import paseo from "../assets/grisbici.jpg";
import OfferM from "../assets/Portada/OfferMobile.png";
import Offer from "../assets/Portada/Offer.png";

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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const desktopImages = [
    { src: Offer, alt: "Desktop Image 1", onClick: () => setShowModal(true) },
    {
      src: remotorizacion,
      alt: "Desktop Image 2",
      onClick: () => navigate({ pathname: "/", search: "?subcategoria=6" }),
    },
  ];

  const mobileImages = [
    {
      src: OfferM,
      alt: "Bicis",
      onClick: () => setShowModal(true),
    },
    {
      src: Remoto,
      alt: "Remoto",
      onClick: () => navigate({ pathname: "/", search: "?subcategoria=6" }),
    },
    {
      src: Buy,
      alt: "Buy",
      onClick: () => navigate({ pathname: "/", search: "?subcategoria=24" }),
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
        overflow: "hidden",
      }}
    >
      {showModal && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(6px)",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 0,
            overflow: "hidden",
          }}
          onClick={() => setShowModal(false)}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "nowrap",
              maxWidth: "600px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { label: "Bici de paseo", subcategoria: 18, img: paseo },
              { label: "Bici de montaña", subcategoria: 19, img: montana },
              { label: "Bicis para niños", subcategoria: 23, img: biciniño },
            ].map((item, idx) => (
              <Box
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({
                    pathname: "/",
                    search: `?subcategoria=${item.subcategoria}`,
                  });
                  setShowModal(false); // ⬅️ Ocultar el modal al hacer clic en una opción
                }}
                sx={{
                  width: 140,
                  height: 190,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  border: "2px solid #d32f2f",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <Box sx={{ height: "50%", overflow: "hidden" }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    fontFamily: "Qaranta, sans-serif",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    padding: "8px 5px",
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

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
