import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductDetailDesktop from "./ProductDesktop";
import ProductDetailMobile from "./ProductDetailMobile";
import { CircularProgress, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import Moneda from "./Home/Moneda.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState("CUP"); // Estado para la moneda
  const isMobile = useMediaQuery("(max-width: 600px)");

  // Cargar producto
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/productos/${id}/`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Producto no encontrado.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  // Cambio de moneda
  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  // Conversión de precio solo para mostrar
  const convertPrice = (priceInCUP) => {
    const exchangeRate = 420; // 1 USD = 410 CUP
    if (currency === "USD") {
      return (priceInCUP / exchangeRate).toFixed(2);
    }
    return priceInCUP.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Añadir al carrito SIEMPRE en CUP
  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.cantidad += quantity;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio, // siempre en CUP
        cantidad: quantity,
        imagen: product.imagen,
        moneda: "CUP", // forzamos CUP
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.nombre} añadido al carrito (precio en CUP).`);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h5"
        color="error"
        style={{ textAlign: "center", marginTop: 20 }}
      >
        {error}
      </Typography>
    );
  }

  if (!product) return null;

  return (
    <div>
      {/* Selector de moneda */}
      <Moneda onCurrencyChange={handleCurrencyChange} />

      {isMobile ? (
        <ProductDetailMobile
          product={product}
          convertPrice={convertPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
        />
      ) : (
        <ProductDetailDesktop
          product={product}
          convertPrice={convertPrice}
          handleSubcategoryClick={(id) =>
            console.log("Navigating to subcategory", id)
          }
        />
      )}
    </div>
  );
};

export default ProductDetail;
