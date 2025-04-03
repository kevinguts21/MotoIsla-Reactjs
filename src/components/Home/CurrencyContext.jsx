import React, { createContext, useState, useContext, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    try {
      return savedCurrency ? JSON.parse(savedCurrency) : { type: "USD", rate: 1 };
    } catch (error) {
      return { type: "USD", rate: 1 }; // Fallback if localStorage has invalid data
    }
  });

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const changeCurrency = (type) => {
    const conversionRate = type === "USD" ? 1 : 340; // Fixed exchange rate
    setCurrency({ type, rate: conversionRate });
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
