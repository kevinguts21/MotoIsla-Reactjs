import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CartContext } from "../Cart/CartContext";
import toast from "react-hot-toast";

const phoneSalesManager = "521234567890"; // Número de teléfono de ventas

const Purchase = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  const { getCartTotal, getTotalAmount } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{8,15}$/, "Introduce un teléfono válido")
      .required("El teléfono es obligatorio"),
    address: isDelivery
      ? Yup.string().required("La dirección es obligatoria")
      : Yup.string(),
  });

  // Aquí se maneja el envío del formulario
  const handleSubmit = async () => {
    try {
      // Validar los datos del cliente con Yup
      await validationSchema.validate({ name, phone, address }, { abortEarly: false });
      setErrors({}); // Limpiar errores

      // Obtener los productos del carrito desde el sessionStorage
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const productos = cart.map(item => 
        `• ${item.nombre || item.title}: ${item.quantity} x ${item.precio} = ${item.quantity * item.precio} CUP`
      ).join("\n");

      // Crear el mensaje que se enviará a Telegram
      const message = `
📦 *Nuevo pedido recibido*

👤 Cliente: ${name}
📞 Teléfono: ${phone}
🏠 Dirección: ${isDelivery ? address : "Recoge en tienda"}
🚚 Tipo entrega: ${isDelivery ? "Entrega a domicilio" : "Recoger en tienda"}

🛒 *Productos:*
${productos}

💰 Total: ${getTotalAmount()} CUP
      `;

      // Token del bot de Telegram y ID del chat donde enviarás el mensaje
      const botToken = "8106813744:AAHzcucB8vtwUQcyIBG-tWzzz8RofUFWv40";
      const chatId = "914493813"; // Tu chat ID de Telegram

      // URL de la API de Telegram
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      // Enviar el mensaje a Telegram
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      // Mostrar el mensaje de éxito
      toast.success("Pedido enviado al gestor de ventas vía Telegram");

      // Limpiar el carrito y redirigir al home
      sessionStorage.removeItem("cart");
      setTimeout(() => window.location.href = "/", 3000);
    } catch (validationError) {
      const errorObj = {};
      validationError.inner.forEach((err) => {
        errorObj[err.path] = err.message;
      });
      setErrors(errorObj);
    }
  };

  // Manejo del cambio de opciones de entrega
  const handleChange = (event) => {
    const checked = event.target.checked;
    setIsDelivery(checked);
    setErrors({}); // Limpiar errores si el modo cambia
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      {/* Opciones de entrega */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDelivery}
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Box display="flex" alignItems="center" flexWrap="nowrap">
              <Typography>Entrega a domicilio</Typography>
              <TwoWheelerIcon color="primary" sx={{ ml: 1 }} />
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!isDelivery}
              onChange={() => {
                setIsDelivery(false);
                setErrors({});
              }}
              color="primary"
            />
          }
          label={
            <Box display="flex" alignItems="center" flexWrap="nowrap">
              <Typography>Recoger en la tienda física</Typography>
              <LocationOnIcon color="error" sx={{ ml: 1 }} />
            </Box>
          }
        />
      </Paper>

      {/* Formulario */}
      <Typography variant="h6" gutterBottom>
        {isDelivery ? "Información de Entrega" : "¿Quién recogerá el pedido?"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
      >
        <InfoOutlinedIcon fontSize="small" />
        Información para contactarle
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre y Apellidos"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
        </Grid>
        {isDelivery && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección Exacta"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Grid>
        )}
      </Grid>

      {/* Mapa de la tienda siempre visible */}
      <Paper
        elevation={2}
        sx={{ marginTop: 4, padding: 2, backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="subtitle1" gutterBottom>
          <LocationOnIcon color="error" /> Dónde deberá recoger el pedido
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Calle 39A entre 47 y 49, Nueva Gerona.
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Dirección aproximada en mapa:
          </Typography>
          <Box sx={{ borderRadius: 2, overflow: "hidden", height: 250 }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.openstreetmap.org/export/embed.html?bbox=-82.811%2C21.891%2C-82.808%2C21.894&layer=mapnik&marker=21.8923739%2C-82.8098227"
              title="Ubicación tienda física"
            />
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ marginY: 4 }} />

      {/* Resumen */}
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Typography variant="subtitle1">Resumen del pedido</Typography>
        <hr />
        <Typography variant="body1" fontWeight="bold">
          {getCartTotal()} productos – {getTotalAmount().toLocaleString()} CUP
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}  // Aquí se llama a handleSubmit al hacer clic
          sx={{
            borderRadius: "111px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Confirmar Pedido
        </Button>
      </Box>
    </Box>
  );
};

export default Purchase;
