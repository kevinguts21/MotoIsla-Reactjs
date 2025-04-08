import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const faqs = [
  {
    id: "faq1",
    question: "¿Cómo realizo una compra?",
    answer:
      "Para realizar una compra, selecciona un producto y agrégalo al carrito, posteriormente sigue los pasos indicados.",
    icon: <LocalMallIcon color="primary" sx={{ mr: 1 }} />,
  },
  {
    id: "faq2",
    question: "¿Cuáles son los métodos de pago?",
    answer:
      "El pago se realiza de forma presencial, al llegar el domicilio o en la tienda física.",
    icon: <CreditCardIcon color="secondary" sx={{ mr: 1 }} />,
  },
  {
    id: "faq3",
    question: "¿Cómo contacto con el soporte técnico?",
    answer:
      "Puedes enviarnos un correo a motoisla@gmail.com o llamar al +5355541164.",
    icon: <SupportAgentIcon color="success" sx={{ mr: 1 }} />,
  },
  {
    id: "faq4",
    question: "¿Están presentes en la Habana?",
    answer:
      "Actualmente solo estamos ofertando unidades de combustión en la Habana, pronto tendremos más artículos.",
    icon: <LocationOnIcon color="error" sx={{ mr: 1 }} />,
  },
];

const FAQPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Box sx={{ width: "90%", maxWidth: "1000px", mx: "auto", mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
          fontFamily: "Qaranta",
          color: "#333",
        }}
      >
        Preguntas Frecuentes
      </Typography>

      <Grid container spacing={3}>
        {faqs.map((faq) => (
          <Grid item xs={12} sm={6} key={faq.id}>
            <Accordion
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              disableGutters
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                },
                "&.Mui-expanded": {
                  borderLeft: "6px solid #1976d2",
                  transform: "scale(1.02)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon sx={{ transition: "0.3s" }} />}
                sx={{
                  bgcolor: "#f5f5f5",
                  transition: "background-color 0.3s",
                  "&.Mui-expanded": {
                    bgcolor: "#e3f2fd",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {faq.icon}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FAQPage;
