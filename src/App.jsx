import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SecondaryNavbar from "./components/SecondaryNavbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/Cart/CartContext";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import ImagenSlide from "./components/ImagenSlide";
import AxiosInstance from "./components/Axios";
import FAQPage from "./components/F&Qpage";
import Purchase from "./components/Cart/Purchase";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await AxiosInstance.get("/productos/");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setLoading(true);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const normalizedQuery = normalizeText(searchQuery);
      const filtered = products.filter((product) =>
        normalizeText(product.nombre).includes(normalizedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setLoading(false);
  }, [searchQuery, products]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <CartProvider>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Toaster position="top-center" />

        <Navbar
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          mobileView={isMobile}
        />
        <SecondaryNavbar
          sx={{ backgroundColor: "#232F3F", minHeight: "40px" }}
        />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ImagenSlide />
                  <Home
                    filteredProducts={filteredProducts}
                    loading={loading}
                    isMobile={isMobile}
                  />
                </>
              }
            />
            <Route path="/about" element={<About isMobile={isMobile} />} />
            <Route
              path="/product/:id"
              element={
                <ProductDetail products={products} isMobile={isMobile} />
              }
            />
            <Route path="/cart" element={<Cart isMobile={isMobile} />} />
            <Route path="/F&Qpage" element={<FAQPage />} />

            <Route path="/purchase" element={<Purchase />} />
          </Routes>
        </div>

        <Footer mobileView={isMobile} desktopView={!isMobile} />
      </div>
    </CartProvider>
  );
}

export default App;
