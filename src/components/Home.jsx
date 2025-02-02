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
import { Navigate } from "react-router-dom";


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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subcategoria = queryParams.get("subcategoria");
    const categoria = queryParams.get("categoria");

    setIsLoading(true);

    setTimeout(() => {
      let filtered = products;

      if (subcategoria) {
        filtered = products.filter(
          (product) => product.subcategoria?.id.toString() === subcategoria
        );
      } else if (categoria) {
        filtered = products.filter(
          (product) => product.categoria?.id.toString() === categoria
        );
      }

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, [location.search, products]);

  useEffect(() => {
    if (location.state?.productosFiltrados) {
      setFilteredProducts(location.state.productosFiltrados);
      setCurrentPage(1);
    }
  }, [location.state]);

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


  const handleFilterUpdate = (filters) => {
    const filtered = applyFilters(filters);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };


  // Actualizar displayedProducts combinando búsqueda, filtros y ordenación
  useEffect(() => {
    let productsToShow = searchResults.length > 0 ? searchResults : filteredProducts;
  
    if (sortOption === "low-to-high") {
      productsToShow = [...productsToShow].sort((a, b) => a.precio - b.precio);
    } else if (sortOption === "high-to-low") {
      productsToShow = [...productsToShow].sort((a, b) => b.precio - a.precio);
    } else if (sortOption === "newest") {
      productsToShow = [...productsToShow].sort(
        (a, b) => new Date(b.tiempo_creado) - new Date(a.tiempo_creado)
      );
    }
  
    setDisplayedProducts(productsToShow);
  }, [filteredProducts, searchResults, sortOption]);
  

  const convertPrice = (price) => {
    const exchangeRate = currency === "CUP" ? 320 : 1;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price * exchangeRate);
  };

  const resetFilters = () => {
    setFilteredProducts(products);
    setSearchResults([]);
    setSortOption("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <LoadingOverlay />}

      <Box sx={{ marginBottom: 2.5, marginRight: 2.6 }}>
        <SortAndFilterControls
          currency={currency}
          handleCurrencyChange={setCurrency}
          sortOption={sortOption}
          debouncedSort={debounce(setSortOption, 300)}
          columns={columns}
          setColumns={setColumns}
          paginatedProducts={paginatedProducts}
          displayedProducts={displayedProducts}
          onApplyFilters={handleFilterUpdate}
          onSearch={handleSearch}
        />

        {/* ✅ Botón centrado y con separación */}
        {(filteredProducts.length !== products.length ||
          searchResults.length > 0 ||
          sortOption) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
              marginLeft: 5,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={resetFilters}
              startIcon={<CleaningServicesOutlinedIcon />}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
                padding: "8px 16px",
              }}
            >
              Limpiar filtros
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        {isLoading ? (
          <CircularProgress />
        ) : displayedProducts.length > 0 ? (
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
              justifyContent: "center",
              height: "50vh",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={noResultsImage}
              alt="Sin resultados"
              sx={{
                width: "200px",
                height: "auto",
                marginBottom: 2,
                filter: "blur(0.5px)",
                opacity: 0.7,
              }}
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
        handleFirstPage={() => setCurrentPage(1)}
        handleLastPage={() => setCurrentPage(totalPages)}
        handleNextPage={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        handlePreviousPage={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
      />

      {showScrollToTop && <ScrollToTopButton onClick={scrollToTop} />}
    </Box>
  );
};

export default Home;
