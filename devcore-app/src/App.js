import React, { useState } from "react";
import "./App.css";
import RoutesApp from "./RoutesApp";
import { DataProvider } from "./utilities/hooks/DataContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#836564",
    },
    secondary: {
      main: "#5f4849",
    },
    blueBtn: {
      main: "#2196f3",
    },
    nav: {
      main: "#35282b",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <RoutesApp />
      </DataProvider>
    </ThemeProvider>
  );
}
/** Creditos para recurso por fuera del MinTic: Emanuel Diaz Villa. */
export default App;
