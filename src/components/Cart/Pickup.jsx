import { jsPDF } from "jspdf";
import logo from "../Cart/LOGO-1.png"

export const generatePickupPDF = ({ cart, customerName, customerPhone, totalAmount }) => {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Logo
  const imgProps = pdf.getImageProperties(logo);
  const logoWidth = 100;
  const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
  pdf.addImage(logo, "PNG", margin, margin, logoWidth, logoHeight);

  let cursorY = margin + logoHeight + 20;
  pdf.setFontSize(16);
  pdf.text("Factura de Recogida en Tienda", pageWidth / 2, cursorY, { align: "center" });

  const date = new Date();
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  cursorY += 30;
  pdf.setFontSize(12);
  pdf.text(`Fecha: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, margin, cursorY);
  cursorY += 18;
  pdf.text(`ID de Pedido: ${orderId}`, margin, cursorY);
  cursorY += 18;
  pdf.text(`Cliente: ${customerName}`, margin, cursorY);
  cursorY += 18;
  pdf.text(`Teléfono: ${customerPhone}`, margin, cursorY);
  cursorY += 18;
  pdf.text(`Tipo de entrega: Recoger en tienda`, margin, cursorY);

  cursorY += 30;
  pdf.setFontSize(14);
  pdf.text("Productos:", margin, cursorY);
  pdf.setFontSize(12);
  cursorY += 18;

  cart.forEach((item) => {
    const line = `- ${item.nombre || item.title || "Sin nombre"} (x${item.quantity})  ${item.quantity * item.precio} CUP`;
    pdf.text(line, margin + 10, cursorY);
    cursorY += 16;
    if (cursorY > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      cursorY = margin;
    }
  });

  cursorY += 20;
  pdf.setFontSize(14);
  pdf.text(`Total: ${totalAmount.toLocaleString()} CUP`, margin, cursorY);
  cursorY += 30;

  pdf.setFontSize(10);
  pdf.text("Recoger en: Calle 39A entre 47 y 49, Nueva Gerona.", margin, cursorY);

  pdf.save(`factura_${orderId}.pdf`);
};
