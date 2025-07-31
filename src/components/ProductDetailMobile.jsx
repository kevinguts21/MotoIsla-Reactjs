import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import toast, { Toaster } from "react-hot-toast";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const exchangeRate = 390; // 1 USD = 340 CUP

const ProductDetailMobile = ({ product, handleSubcategoryClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState("CUP");

  const {
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
    id,
  } = product;

  const disponibilidad =
    cantidad_disponible > 0 ? "Disponible" : "No disponible";
  const categoriaNombre =
    subcategoria?.categoria?.nombre || "Categoría desconocida";
  const subcategoriaNombre = subcategoria?.nombre || "Subcategoría desconocida";

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const convertPrice = (price, currency) => {
    return currency === "USD" ? (price / exchangeRate).toFixed(2) : price;
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: convertPrice(product.precio, currency),
        currency,
        quantity,
        imagen: product.imagen,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${nombre} añadido al carrito en ${currency}.`);
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
    <Box sx={{ padding: 1.5, marginTop: "15px" }}>
      <Toaster position="top-center" />
      <Paper
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            component="img"
            src={imagen}
            alt={nombre}
            sx={{
              width: "100%",
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 2,
            }}
          />
          <Typography variant="h6" color="textSecondary">
            {nombre}
          </Typography>

          {/* Precio y selector de moneda */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#007bff" }}
            >
              {convertPrice(precio, currency)} {currency}
            </Typography>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              sx={{ height: "40px", fontSize: "1rem" }}
            >
              <MenuItem value="CUP">CUP</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </Box>

          <Typography variant="body1">
            Estado:{" "}
            <span
              style={{
                color: cantidad_disponible > 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {disponibilidad}
            </span>
          </Typography>

          <Typography variant="body2">
            Subcategoría:{" "}
            <Link
              to={`/?subcategoria=${subcategoria?.id}`}
              style={{
                textDecoration: "none",
                fontWeight: "normal",
                color: "#007bff",
              }}
              onClick={() => handleSubcategoryClick(subcategoria?.id)}
            >
              {subcategoriaNombre}
            </Link>
          </Typography>
          <Typography variant="body2">Categoría: {categoriaNombre}</Typography>
          {color && <Typography variant="body2">Color: {color}</Typography>}
          {caracteristicas && (
            <Typography variant="body2">
              Características: {caracteristicas}
            </Typography>
          )}
          {componentes && (
            <Typography variant="body2">Componentes: {componentes}</Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            Fecha de Ingreso: {new Date(tiempo_creado).toLocaleDateString()}
          </Typography>

          {/* Controles de cantidad y botones */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <IconButton color="primary" onClick={handleDecreaseQuantity}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{quantity}</Typography>
              <IconButton
                color="primary"
                onClick={handleIncreaseQuantity}
                disabled={quantity >= cantidad_disponible}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Añadir al carrito
                <ShoppingCartOutlinedIcon />
              </Button>
              <IconButton color="primary" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Descripción del producto */}
      <Paper
        sx={{
          border: "1px solid #ddd",
          borderRadius: "9px",
          marginTop: 1.5,
          padding: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body1">
          <strong>Detalles</strong>
          <hr />
          {descripcion}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProductDetailMobile;
