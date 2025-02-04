import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HandleSearch = ({ onSearch, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClearSearch();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "111px",
        padding: "10px 20px",
        width: { xs: "90%", sm: "400px", lg: "600px" }, // Adaptable a pantalla
        maxWidth: "100%",
        border: "1px solid black",
        gap: "10px", // Espaciado uniforme
      }}
    >
      <InputBase
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1, // Ocupa el espacio restante
          color: "rgba(0, 0, 0, 0.9)",
          fontSize: "18px",
          paddingLeft: "10px",
        }}
      />

      <IconButton
        onClick={handleSearch}
        disableRipple
        sx={{
          color: "black",
          padding: 0,
          "&:hover": {
            color: "red",
          },
        }}
      >
        <SearchIcon sx={{ color: "inherit", fontSize: "1.5rem" }} />
      </IconButton>

      {searchQuery.trim() && (
        <IconButton
          disableRipple
          onClick={handleClear}
          sx={{
            color: "black",
            padding: 0,
            "&:hover": {
              color: "red",
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
