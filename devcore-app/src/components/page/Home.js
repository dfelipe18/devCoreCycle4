import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import AppNavBar from "./AppNavBar";

const Home = () => {
  return (
    <div className="App">
      <header id="header" className="header">
        <AppNavBar />
      </header>
      <main id="main" className="main">
        <h1>Bienvenidos a DevCore</h1>
      </main>
      <footer id="footer" className="footer">
        <p>Footer works in react!</p>
      </footer>
    </div>
  );
};

export default Home;
