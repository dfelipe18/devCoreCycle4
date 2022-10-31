import React from "react";
import "../../App.css";
import { useLocation } from "react-router-dom";
import AppNavBar from "./AppNavBar";
import { useState, useEffect } from "react";
import { useNotify } from "../../hooks/useNotify";
import { useGetUserAuth } from "../../hooks/useGetUserAuth";

const Home = () => {
  const location = useLocation();
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    onSetNotify({
      ...notify,
      open: true,
      type: location.state.dataAlert.type,
      message: location.state.dataAlert.message,
    });
  }, [location.state]);

  return (
    <div className="App">
      <RenderNotify />
      <main id="main" className="main">
        <section className="hero">
          <div className="content">
            <h2>DevCore</h2>
            <p>Conectando lo que más te importa.</p>
          </div>
          <div className="waves"></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
