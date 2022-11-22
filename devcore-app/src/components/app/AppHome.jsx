import React from "react";
import "../../App.css";
import { useLocation } from "react-router-dom";
import AppNavBar from "./AppNavBar";
import { useState, useEffect } from "react";
import { useNotify } from "../../utilities/hooks/useNotify";
import { useGetUserAuth } from "../../utilities/hooks/useGetUserAuth";

const Home = () => {
  const location = useLocation();
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    if (location.state) {
      onSetNotify({
        ...notify,
        open: true,
        type: location.state.dataAlert.type,
        message: location.state.dataAlert.message,
      });
    }
  }, [location.state]);

  return (
    <>
      <RenderNotify />
        <div className="content">
          <h2>DevCore</h2>
          <p>Conectando lo que más te importa.</p>
        </div>
    </>
  );
};

export default Home;
