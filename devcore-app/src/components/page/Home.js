import React from "react";
import "../../App.css";
import { useLocation } from "react-router-dom";
import AppNavBar from "./AppNavBar";

const Home = () => {
  const location = useLocation();
  /* console.log(location.state); */

  return (
    <div className="App">
      <header id="header" className="header">
        <AppNavBar userData={location.state.userData} />
      </header>
      
      <main id="main" className="main">
        <section className="hero">
          <div className="content">
            <h2>Devcore</h2>
            <p>Busca lo que necesitas y haste con el</p>
          </div>
          <div className="waves"></div>
        </section>
      </main>
      <footer id="footer" className="footer">
        <p>Footer works in react!</p>
      </footer>
    </div>
  );
};

export default Home;
