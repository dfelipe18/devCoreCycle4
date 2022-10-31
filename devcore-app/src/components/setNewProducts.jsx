import * as React from "react";
import { useState } from "react";
import AppNavBar from "./page/AppNavBar";
import productsJson from "../json/products.json";

export default function SetNewProducts() {
  /** Configuraciones para los notify */
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      open: false,
    });
  };
  /** End Configuraciones para los notify */
  const [products, setProducts] = useState(productsJson);
  console.log(products);

  return (
    <div className="App">
      <header id="header" className="header">
        <AppNavBar  />
      </header>
      <main id="main" className="main">
        
      </main>
      <footer id="footer" className="footer">
        <p>Footer works in react!</p>
      </footer>
    </div>
  );
}
