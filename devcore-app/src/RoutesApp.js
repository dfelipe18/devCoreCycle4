import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppNavBar from "./components/app/AppNavBar";
import AppHome from "./components/app/AppHome";
import AppLogin from "./components/app/AppLogin";
import SalesComponent from "./components/SalesComponent";
import SetNewProducts from "./components/setNewProducts";
import ProductsList from "./components/ProductsList";
import ShoppingCart from "./components/ShoppingCart";
import ShowInfoProduct from "./components/ShowInfoProduct";
import AppFooter from "./components/app/AppFooter";

const RoutesApp = () => {
  return (
    <>
      <header id="header" className="header">
        <AppNavBar loguedd="no-auth" />
      </header>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<AppLogin />} />
          <Route path="/auth/home" element={<AppHome />} />
          <Route path="/auth/sales" element={<SalesComponent />} />
          <Route path="/auth/modified-products" element={<SetNewProducts />} />
          <Route path="/auth/products" element={<ProductsList />} />
          <Route path="/auth/shopping-cart" element={<ShoppingCart />} />
          <Route
            path="/auth/info-product/:productId"
            element={<ShowInfoProduct />}
          />
        </Routes>
      </div>
      <footer id="footer" className="footer">
        <AppFooter/>
      </footer>
    </>
  );
};

export default RoutesApp;
