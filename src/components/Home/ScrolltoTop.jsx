import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    const checkCartItems = () => {
      const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
      setShowCartIcon(cartItems.length > 0);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkCartItems);
    checkCartItems();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkCartItems);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showCartIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: "fixed",
              bottom: { xs: "110px", sm: "130px" },
              right: { xs: "25px", sm: "35px" },
              zIndex: 11,
              backgroundColor: "#f5f5f5", // Un gris claro para diferenciarse del fondo blanco
              padding: "6px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate("/Cart")}
          >
            <IconButton sx={{ color: "#DF0209" }}>
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
          </Box>
        </motion.div>
      )}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: "fixed",
              bottom: { xs: "50px", sm: "70px" },
              right: { xs: "20px", sm: "30px" },
              zIndex: 10,
              backgroundColor: "#DF0209",
              padding: "8px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={scrollToTop}
          >
            <IconButton sx={{ color: "white" }}>
              <KeyboardArrowUpIcon />
            </IconButton>
          </Box>
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTopButton;
