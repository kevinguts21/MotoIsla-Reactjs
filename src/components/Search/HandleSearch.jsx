import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HandleSearch = ({ onSearch, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // ✅ Enviar el texto de búsqueda a `Navbar.js`
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClearSearch(); // ✅ Limpiar la búsqueda en `Navbar.js`
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "25px",
        padding: "5px 10px",
        width: "100%",
        maxWidth: "400px",
        transition: "background-color 0.3s",
        border: "1px solid black",
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <InputBase
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
          color: "#333",
          fontSize: "16px",
          paddingLeft: "8px",
        }}
      />

      <IconButton
        onClick={handleSearch}
        sx={{
          color: "#666",
          transition: "color 0.3s",
          "&:hover": {
            color: "#000",
          },
        }}
      >
        <SearchIcon />
      </IconButton>

      {searchQuery.trim() && (
        <IconButton
          onClick={handleClear}
          sx={{
            color: "#666",
            transition: "color 0.3s",
            "&:hover": {
              color: "#000",
            },
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HandleSearch;
