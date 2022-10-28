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
      <section class="hero">
  <div class="content">
    <h2>Devcore</h2>
    <p>Busca lo que necesitas y haste con el</p>
    </div>
  <div class="waves"></div>
</section>
      </main>
      <footer id="footer" className="footer">
        <p>Footer works in react!</p>
      </footer>
    </div>
  );
};

export default Home;
