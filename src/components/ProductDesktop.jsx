import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import toast, { Toaster } from "react-hot-toast";

const exchangeRate = 420; // ✅ Valor de cambio

const ProductDetailDesktop = ({ product, handleSubcategoryClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currency, setCurrency] = useState("CUP");

  const {
    id,
    nombre,
    descripcion,
    precio,
    cantidad_disponible,
    imagen,
    subcategoria,
    tiempo_creado,
    color,
    caracteristicas,
    componentes,
  } = product;

  const convertPrice = (price, currency) => {
    return currency === "USD" ? (price / exchangeRate).toFixed(2) : price;
  };

  const disponibilidad =
    cantidad_disponible > 0 ? "Disponible" : "No disponible";
  const categoriaNombre =
    subcategoria?.categoria?.nombre || "Categoría desconocida";
  const subcategoriaNombre = subcategoria?.nombre || "Subcategoría desconocida";

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, []);

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: precio, // ✅ Siempre en CUP
        currency: "CUP", // ✅ Forzado a CUP
        quantity,
        imagen: product.imagen,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);

    // ✅ Mensaje sin mencionar la moneda
    toast.success(`${nombre} añadido al carrito.`);
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleZoomOpen = () => setIsZoomOpen(true);
  const handleZoomClose = () => setIsZoomOpen(false);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${id}`;
    try {
      await navigator.share({
        title: nombre,
        text: "Mira este producto:",
        url,
      });
    } catch (error) {
      navigator.clipboard.writeText(url);
      toast("Enlace copiado al portapapeles");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 2,
        marginTop: "20px",
      }}
    >
      <Toaster position="top-center" />
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={2} alignItems="stretch">
          {/* Imagen */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fafafa",
                position: "relative",
              }}
            >
              <img
                src={imagen}
                alt={nombre}
                style={{
                  maxWidth: "100%",
                  maxHeight: "450px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
              <IconButton
                onClick={handleZoomOpen}
                sx={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <ZoomInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Detalles */}
          <Grid item xs={12} md={6}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: 1.5,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {nombre}
              </Typography>
              <Typography
                variant="body1"
                color="success.main"
                fontWeight="bold"
              >
                Estado: {disponibilidad}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {convertPrice(precio, currency)} {currency}
                </Typography>
                <Select
                  value={currency}
                  onChange={handleCurrencyChange}
                  sx={{
                    height: 32,
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value="CUP">CUP</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Fecha de ingreso: {new Date(tiempo_creado).toLocaleDateString()}
              </Typography>

              <Divider />

              <Typography variant="body2" color="text.secondary">
                Subcategoría:{" "}
                <Link
                  to={`/?subcategoria=${subcategoria?.id}`}
                  style={{ textDecoration: "none", color: "#1976d2" }}
                  onClick={() => handleSubcategoryClick(subcategoria?.id)}
                >
                  {subcategoriaNombre}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categoría: {categoriaNombre}
              </Typography>
              {color && <Typography variant="body2">Color: {color}</Typography>}
              {caracteristicas && (
                <Typography variant="body2">
                  Características: {caracteristicas}
                </Typography>
              )}
              {componentes && (
                <Typography variant="body2">
                  Componentes: {componentes}
                </Typography>
              )}

              {/* Controles */}
              <Box
                sx={{
                  marginTop: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <IconButton
                  onClick={handleDecreaseQuantity}
                  color="primary"
                  sx={{ border: "1px solid #ddd" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6">{quantity}</Typography>
                <IconButton
                  onClick={handleIncreaseQuantity}
                  color="primary"
                  disabled={quantity >= cantidad_disponible}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <AddIcon />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleAddToCart}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
                >
                  Añadir al carrito
                </Button>
                <IconButton color="primary" onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Descripción */}
      <Card sx={{ marginTop: 2, borderRadius: "16px" }}>
        <CardContent>
          <Typography variant="body1">{descripcion}</Typography>
        </CardContent>
      </Card>

      {/* Modal Zoom */}
      <Modal open={isZoomOpen} onClose={handleZoomClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            overflow: "auto",
          }}
        >
          <img
            src={imagen}
            alt={nombre}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductDetailDesktop;
