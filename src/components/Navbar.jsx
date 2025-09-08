import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LOGO from "../assets/LOGO-1.png";
import { Link } from "react-router-dom";
import HandleSearch from "./Search/HandleSearch";
import DrawerNavbarMobile from "./DrawerNavbarMobile";

const Navbar = ({ onSearch, onClearSearch }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "flex", md: "none" },
          background:
            "linear-gradient(155deg, rgba(255,255,255,1) 34%, rgba(255,218,93,1) 60%, rgba(255,0,8,1) 92%)",
          padding: "5px 20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Link to="/">
              <img
                src={LOGO}
                alt="Logo"
                style={{ width: "100px", height: "auto", cursor: "pointer" }}
              />
            </Link>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>
        </Toolbar>
        <Box sx={{ width: "100%", marginBottom: "10px", marginRight: "18px" }}>
          <HandleSearch onSearch={onSearch} onClearSearch={onClearSearch} />
        </Box>
      </AppBar>

      {/* Desktop Navbar */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "none", md: "flex" },
          background:
            "linear-gradient(155deg, rgba(255,255,255,1) 34%, rgba(255,218,93,1) 60%, rgba(255,0,8,1) 92%)",
          padding: "5px 20px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Asegura que los elementos se distribuyan entre sí
            width: "100%",
          }}
        >
          {/* Logo */}
          <Box>
            <Link to="/">
              <img
                src={LOGO}
                alt="Logo"
                style={{ width: "100px", height: "auto", cursor: "pointer" }}
              />
            </Link>
          </Box>

          {/* Carrito */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end", // Asegura que ambos elementos se alineen a la derecha
              marginRight: "20px",
              gap: "10px", // Espacio entre el carrito y la barra de búsqueda
            }}
          >
            {/* Carrito */}
            <Link to="/cart">
              <IconButton
                edge="end"
                color="#FFFFFF"
                aria-label="shopping cart"
                disableRipple
                sx={{
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </Link>

            {/* Buscador */}
            <Box sx={{ width: "100%", maxWidth: "700px" }}>
              <HandleSearch onSearch={onSearch} onClearSearch={onClearSearch} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <DrawerNavbarMobile drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navbar;
