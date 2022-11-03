import React, { createContext, useState } from "react";
import salesJson from "../json/sales.json";
import productsJson from "../json/products.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataSales, setDataSales] = useState(salesJson.ventas);
  const [dataProducts, setDataProducts] = useState(productsJson.productos);
  return (
    <DataContext.Provider
      value={{
        dataSales,
        setDataSales,
        dataProducts,
        setDataProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
