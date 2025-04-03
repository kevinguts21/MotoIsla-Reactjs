import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMediaQuery from "@mui/material/useMediaQuery";

const faqs = [
  {
    question: "¿Cómo realizo una compra?",
    answer:
      "Para realizar una compra, selecciona un producto y agrégalo al carrito, posteriormente sigue los pasos indicados.",
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer:
      "El pago se realiza de forma presencial, al llegar el domicilio o en la tienda física.",
  },
  {
    question: "¿Cómo contacto con el soporte técnico?",
    answer:
      "Puedes enviarnos un correo a motoisla@gmail.com o llamar al +5355541164.",
  },
  {
    question: "¿Están presentes en la Habana?",
    answer:
      "Actualmente solo estamos ofertando unidades de combustión allá, pronto tendremos más artículos.",
  },
];

const FAQPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          fontFamily: "Qaranta",
        }}
      >
        Preguntas Frecuentes
      </Typography>

      <Grid container spacing={2}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Accordion
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Leve sombra
                border: "1px solid #ddd",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                sx={{ backgroundColor: "#d6d6d6" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
