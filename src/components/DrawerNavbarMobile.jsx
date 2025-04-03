import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import proof from "../assets/proof.jpg";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";


const DrawerNavbarMobile = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <Box
        sx={{
          width: 200,
          backgroundImage: `url(${proof})`,
          backgroundSize: "cover",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundPosition: "center",
        }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <Paper
          sx={{
            backgroundColor: "#ffffffcc",
            padding: "8px",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "'Qaranta', sans-serif", color: "#333" }}
            >
              Moto Isla
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon sx={{ color: "#333" }} />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "gray", fontFamily: "'Qaranta', sans-serif" }}
          >
            Hola, bienvenido
          </Typography>
        </Paper>

        {/* Menú de navegación */}
        <List>
          <ListItem button component={Link} to="/" sx={{ padding: "16px 0" }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
              <HomeIcon sx={{ fontSize: "1.8rem" }} />
            </ListItemIcon>
            <ListItemText primary={<b style={{ color: "black" }}>Inicio</b>} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/cart"
            sx={{ padding: "16px 0" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
              <ShoppingCartIcon sx={{ fontSize: "1.8rem" }} />
            </ListItemIcon>
            <ListItemText primary={<b style={{ color: "black" }}>Carrito</b>} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/about"
            sx={{ padding: "16px 0" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
              <InfoIcon sx={{ fontSize: "1.8rem" }} />
            </ListItemIcon>
            <ListItemText primary={<b style={{ color: "black" }}>Sobre Nosotros</b>}/>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/f&qpage"
            sx={{ padding: "16px 0" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
              <HelpOutlineIcon sx={{ fontSize: "1.8rem" }} />
            </ListItemIcon>
            <ListItemText primary={<b style={{ color: "black" }}>Preguntas Frecuentes</b>}/>
          </ListItem>
          

          <ListItem
            button
            component="a"
            href="https://wa.me/5359874553"
            target="_blank"
            sx={{ padding: "16px 0" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
              <WhatsAppIcon sx={{ fontSize: "1.8rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={<b style={{ color: "black" }}>Contáctenos</b>}
            />
          </ListItem>
        </List>

        {/* Redes Sociales */}
        <Box
          sx={{
            marginTop: "auto",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#ffffffcc",
            boxShadow: "0px -2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              color: "#333",
            }}
          >
            <a
              href="https://www.facebook.com/profile.php?id=100089351164595"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </a>
            <a
              href="https://www.instagram.com/moto_isla.surl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerNavbarMobile;
