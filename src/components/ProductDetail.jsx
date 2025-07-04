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

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  const convertPrice = (priceInCUP) => {
    const exchangeRate = 385; // 1 USD = 375 CUP
    return currency === "USD"
      ? (priceInCUP / exchangeRate).toFixed(2)
      : priceInCUP.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
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
        precio: convertPrice(product.precio), // Asegura que el precio se guarda en la moneda actual
        cantidad: quantity,
        imagen: product.imagen,
        moneda: currency, // Guarda la moneda seleccionada
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.nombre} añadido al carrito en ${currency}.`);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h5"
        color="error"
        style={{ textAlign: "center", marginTop: "20px" }}
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
