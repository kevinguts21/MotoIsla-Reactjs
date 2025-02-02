import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LOGO from "../assets/LOGO-1.png";
import { Link } from "react-router-dom";
import HandleSearch from "./Search/HandleSearch";
import DrawerNavbarMobile from "./DrawerNavbarMobile";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, onClearSearch }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const toggleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`); // ✅ Envía la búsqueda a `Home.js`
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <AppBar position="sticky" sx={{ display: { xs: "flex", md: "none" }, background: "linear-gradient(155deg, rgba(255,255,255,1) 34%, rgba(255,218,93,1) 60%, rgba(255,0,8,1) 92%)", padding: "5px 20px", flexDirection: "column", alignItems: "center" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <Box>
            <Link to="/">
              <img src={LOGO} alt="Logo" style={{ width: "100px", height: "auto", cursor: "pointer" }} />
            </Link>
          </Box>

          {/* Menu Icon */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>
        </Toolbar>

        {/* Search Bar */}
        <Box sx={{ width: "100%", marginBottom: "10px" }}>
          <HandleSearch onSearch={toggleSearch} onClearSearch={onClearSearch} />
        </Box>
      </AppBar>

      {/* ✅ Drawer en un componente separado */}
      <DrawerNavbarMobile drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navbar;
