import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCard = ({ product, currency, convertPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const parsedCantidad = parseInt(product.cantidad_disponible, 10);

    setStock(
      !isNaN(parsedCantidad) && parsedCantidad >= 0 ? parsedCantidad : 0
    );
  }, [product]);

  const handleAddToCart = () => {
    if (stock === 0) {
      toast.error("Actualmente no tenemos en existencia este producto.");
      return;
    }

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);
    const existingQty = productInCart ? productInCart.quantity : 0;

    if (existingQty + quantity > stock) {
      toast.error("Ha alcanzado la cantidad máxima disponible.");
      return;
    }

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        quantity,
        imagen: product.imagen,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Producto agregado al carrito");
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Ha alcanzado la cantidad máxima disponible.");
    }
  };

  const handleDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const isNewProduct = () => {
    const createdDate = new Date(product.tiempo_creado);
    const currentDate = new Date();
    const daysDifference = (currentDate - createdDate) / (1000 * 3600 * 24);
    return daysDifference <= 7;
  };

  const ProductContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: 9,
    textAlign: "center",
    padding: 2,
    backgroundColor: "#fff",
    color: "#000",
    transition: "transform 0.3s, box-shadow 0.3s",
    height: "100%",
  }));

  const ProductImage = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "120px",
      aspectRatio: "4 / 3",
      minWidth: "80px",
    },
  }));

  const CartButton = styled(IconButton)(({ theme }) => ({
    color: "grey",
    background: "#e2e2e2",
    "&:hover": {
      color: "red",
    },
  }));

  const Ribbon = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 10,
    left: -10,
    width: "80px",
    height: "25px",
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    zIndex: 1,
    fontSize: "14px",
    fontWeight: "bold",
  }));

  const DesktopView = () => (
    <ProductContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {isNewProduct() && <Ribbon>Nuevo</Ribbon>}

      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <ProductImage src={product.imagen} alt={product.nombre} />
      </Link>

      <Box
        sx={{
          paddingLeft: "10px",
          textAlign: "center",
          marginBottom: "auto",
        }}
      >
        <Typography variant="h6">{product.nombre}</Typography>
        <Typography variant="subtitle1">
          {convertPrice(product.precio)} CUP
        </Typography>
        {product.subcategoria && (
          <Typography variant="subtitle2" color="textSecondary">
            {product.subcategoria.nombre}
          </Typography>
        )}
      </Box>

      <Divider sx={{ marginY: 1 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleDecrease} disabled={stock === 0}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease} disabled={quantity >= stock}>
            <AddIcon />
          </IconButton>
        </Box>

        <Divider orientation="vertical" sx={{ marginLeft: "80px" }} />

        <Tooltip title="Agregar al carrito" arrow>
          <CartButton
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={stock === 0}
          >
            <AddShoppingCartIcon />
          </CartButton>
        </Tooltip>
      </Box>
    </ProductContainer>
  );

  const MobileView = () => (
    <ProductContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        padding: "5px",
        height: "auto",
        marginRight: "15px",
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          height: "100%",
          maxWidth: "150px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <ProductImage
            src={product.imagen}
            alt={product.nombre}
            sx={{
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Link>

        {isNewProduct() && (
          <Ribbon
            sx={{
              marginTop: "5px",
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "0.1px 2px",
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            Nuevo
          </Ribbon>
        )}
      </Box>

      <Box
        sx={{
          flex: "2 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 15px",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}
          >
            {product.nombre}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "14px", marginBottom: "5px" }}
          >
            {convertPrice(product.precio)} CUP
          </Typography>
          {product.subcategoria && (
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: "12px" }}
            >
              {product.subcategoria.nombre}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleDecrease}
              disabled={stock === 0}
              sx={{ padding: "8px" }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 1, fontSize: "14px" }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={handleIncrease}
              disabled={quantity >= stock}
              sx={{ padding: "8px" }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Tooltip title="Agregar al carrito" arrow>
            <CartButton
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              disabled={stock === 0}
              sx={{ padding: "10px", marginLeft: "10px" }}
            >
              <AddShoppingCartIcon />
            </CartButton>
          </Tooltip>
        </Box>
      </Box>
    </ProductContainer>
  );

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default ProductCard;
