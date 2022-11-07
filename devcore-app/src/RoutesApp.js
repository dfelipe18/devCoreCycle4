import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavBar from "./components/page/AppNavBar";
import Home from "./components/page/Home";
import Login from "./components/page/Login";
import SalesComponent from "./components/SalesComponent";
import SetNewProducts from "./components/setNewProducts";
import ShoppingCart from "./components/ShoppingCart";
import Carrito from "./components/Carrito";

const RoutesApp = () => {
  return (
    <>
      <header id="header" className="header">
        <AppNavBar loguedd="no-auth" />
      </header>
      <div className="App">
        <main id="main" className="main">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/auth/home" element={<Home />} />
            <Route path="/auth/sales" element={<SalesComponent />} />
            <Route
              path="/auth/modified-products"
              element={<SetNewProducts />}
            />
            <Route path="/auth/products" element={<ShoppingCart />} />
            <Route path="/auth/carrito" element={<Carrito />} />
          </Routes>
        </main>
      </div>
      <footer id="footer" className="footer">
        <p className="footer1">Footer DevCore</p>
      </footer>
    </>
  );
};

export default RoutesApp;
