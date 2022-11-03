import React, { createContext, useState } from "react";
import salesJson from "../json/sales.json";
import productsJson from "../json/products.json";

export const DataContext = createContext();

const dataInit = { salesJson: salesJson.ventas, productsJson: productsJson.productos };

export const DataProvider = ({ children }) => {
  const [dataSales, setDataSales] = useState(dataInit);
  return (
    <DataContext.Provider
      value={{
        dataSales,
        setDataSales,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
