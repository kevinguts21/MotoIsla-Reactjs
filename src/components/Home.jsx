import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography, Button } from "@mui/material";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import { useMediaQuery } from "@mui/material";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import ProductCard from "./Home/ProductCard";
import PaginationControls from "./Home/PaginationControls";
import LoadingOverlay from "./Home/LoadingOverlay";
import SortAndFilterControls from "./Home/SortandFilterControls";
import ScrollToTopButton from "./Home/ScrolltoTop";
import noResultsImage from "../assets/not.png";
import AxiosInstance from "./Axios";

const Home = () => {
  const [columns, setColumns] = useState(4);
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "USD"
  );
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [showBlurLoading, setShowBlurLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const productsPerPage = isMobile ? 10 : 9;
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await AxiosInstance.get("/productos/");
        setProducts(response.data);
        setDisplayedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollToTop(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subcategoria = queryParams.get("subcategoria");
    const categoria = queryParams.get("categoria");

    if (subcategoria || categoria) {
      setIsLoading(true);
      const fetchFilteredProducts = async () => {
        try {
          let response;
          if (subcategoria) {
            response = await AxiosInstance.get(
              `/productos/?subcategoria=${subcategoria}`
            );
          } else if (categoria) {
            response = await AxiosInstance.get(
              `/productos/?categoria=${categoria}`
            );
          } else {
            response = await AxiosInstance.get("/productos/");
          }
          setDisplayedProducts(response.data);
        } catch (error) {
          console.error("Error fetching filtered products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFilteredProducts();
    } else {
      setDisplayedProducts(products);
    }
  }, [location.search, products]);

  const sortProducts = () => {
    if (sortOption === "low-to-high") {
      return [...displayedProducts].sort((a, b) => a.precio - b.precio);
    }
    if (sortOption === "high-to-low") {
      return [...displayedProducts].sort((a, b) => b.precio - a.precio);
    }
    if (sortOption === "newest") {
      return [...displayedProducts].sort(
        (a, b) => new Date(b.tiempo_creado) - new Date(a.tiempo_creado)
      );
    }
    return displayedProducts;
  };

  const sortedProducts = sortProducts();

  const handleCurrencyChange = (newCurrency) => {
    setShowBlurLoading(true);
    setLoadingCurrency(true);
    setTimeout(() => {
      setCurrency(newCurrency);
      localStorage.setItem("currency", newCurrency);
      setLoadingCurrency(false);
      setShowBlurLoading(false);
    }, 1500);
  };

  const convertPrice = (price) => {
    const exchangeRate = currency === "CUP" ? 320 : 1;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price * exchangeRate);
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const debouncedSort = debounce((option) => setSortOption(option), 300);

  const resetFilters = () => {
    setDisplayedProducts(products);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <LoadingOverlay />}

      <Box sx={{ marginBottom: 2.5 }}>
        <SortAndFilterControls
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          sortOption={sortOption}
          debouncedSort={debouncedSort}
          columns={columns}
          setColumns={setColumns}
          paginatedProducts={paginatedProducts || []}
          displayedProducts={displayedProducts || []}
        />

        {displayedProducts.length !== products.length && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={resetFilters}
              startIcon={<CleaningServicesOutlinedIcon />}
              sx={{ textTransform: "none", fontSize: "0.9rem" }}
            >
              Limpiar filtros
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        {paginatedProducts.length > 0 ? (
          <Grid
            container
            spacing={3}
            sx={{ maxWidth: "1200px", marginX: "auto" }}
          >
            {paginatedProducts.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={columns === 3 ? 4 : 3}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  currency={currency}
                  convertPrice={convertPrice}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={noResultsImage}
              alt="Sin resultados"
              sx={{ width: "200px", height: "auto", marginBottom: 2 }}
            />
            <Typography color="gray">
              No hay resultados que coincidan con la búsqueda.
            </Typography>
          </Box>
        )}
      </Box>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {showScrollToTop && <ScrollToTopButton onClick={scrollToTop} />}
    </Box>
  );
};

export default Home;
