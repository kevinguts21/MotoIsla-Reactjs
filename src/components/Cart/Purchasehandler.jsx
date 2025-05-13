import React, { useContext } from "react";
import { Button } from "@mui/material";
import { CartContext } from "../Cart/CartContext";
import toast from "react-hot-toast";
import { generatePickupPDF } from "../Cart/Pickup"; // 🆕 Importamos aquí

const handlePurchase = () => {
  console.log("🟡 handlePurchase ejecutado");

  const deliveryType = isDelivery
    ? "Entrega a domicilio"
    : "Recoger en tienda física";
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

  // 🧾 Solo si es recogida, genera el PDF
  if (!isDelivery) {
    console.log("🧾 Intentando generar PDF para recogida...");
    try {
      generatePickupPDF({
        cart,
        customerName: name,
        customerPhone: phone,
        totalAmount,
      });
      console.log("✅ PDF generado correctamente para recogida en tienda.");
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
    }
  }

  toast.success(
    isDelivery
      ? "Gracias por su compra. En un plazo de 5 horas recibirá su pedido en la dirección indicada."
      : "Gracias por su compra. Puede recoger su pedido en la tienda dentro del horario de atención: Lunes a Viernes de 8:00am a 4:00pm.",
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

  clearCart();

  setTimeout(() => {
    window.location.href = "/";
  }, 8500);
};
export default PurchaseHandler;
