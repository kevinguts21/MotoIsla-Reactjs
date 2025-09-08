import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = sessionStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from sessionStorage:", error);
      return []; // 🔥 Siempre devolver un array
    }
  });

  const location = useLocation();

  useEffect(() => {
    try {
      // Guardar el carrito en la sesión cada vez que cambie
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to sessionStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    // Refrescar la página cuando se accede desde un path diferente
    const previousPath = sessionStorage.getItem("previousPath");
    if (previousPath !== location.pathname) {
      sessionStorage.setItem("previousPath", location.pathname);
      window.location.reload();
    }
  }, [location]);

  // Añadir un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // No permitir cantidades menores que 1
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Eliminar un producto del carrito
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    sessionStorage.removeItem("cart");
    setCart([]); // 🔥 Siempre mantener `cart` como un array
  };
  

  // Obtener el total de productos en el carrito
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Obtener el importe total
  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
