import React, { useContext } from "react";
import { Button } from "@mui/material";
import { CartContext } from "../Cart/CartContext";
import toast from "react-hot-toast";

const PurchaseHandler = ({
  isDelivery,
  customerInfo,
  cartTotal,
  totalAmount,
  phoneSalesManager,
}) => {
  const { clearCart, cart } = useContext(CartContext);

  const handlePurchase = async () => {
    const deliveryType = isDelivery ? "Entrega a domicilio" : "Recoger en tienda física";
    const { name, phone, address } = customerInfo;

    const message = {
      tipoEntrega: deliveryType,
      totalProductos: cartTotal,
      montoTotal: totalAmount,
      cliente: {
        nombre: name,
        telefono: phone,
        direccion: isDelivery ? address : "Recoge en tienda",
      },
      carrito: cart.map((item) => ({
        producto: item.nombre || item.title || "Sin nombre",
        cantidad: item.quantity,
        precioUnidad: item.precio,
        total: item.precio * item.quantity,
      })),
    };

    console.log("📦 Enviando pedido al gestor de ventas:", message);

    // Mostrar notificación de éxito
    toast.success(
      isDelivery
        ? "Gracias por su compra. En un plazo de 5 horas recibirá su pedido en la dirección indicada."
        : "Gracias por su compra. Puede recoger su pedido en la tienda dentro del horario de atención: Lunes a Viernes de 9:00 a 18:00.",
      {
        duration: 8000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: isDelivery ? "#333" : "#1976d2",
          color: "#fff",
          fontWeight: "bold",
        },
      }
    );

    // Limpiar el carrito y redirigir al home
    clearCart();
    setTimeout(() => {
      window.location.href = "/";
    }, 8500);
  };

  return (
    <Button
      onClick={handlePurchase}
      variant="contained"
      color="error"
      sx={{
        borderRadius: "111px",
        padding: "10px 20px",
        fontWeight: "bold",
        "&:focus": { outline: "none" },
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      Confirmar compra
    </Button>
  );
};

export default PurchaseHandler;
