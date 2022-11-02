import React from "react";
import "./App.css";
import RoutesApp from "./RoutesApp";
import { DataProvider } from "./utilities/hooks/DataContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d50000",
    },
    secondary: {
      main: "#ef5350",
    },
  },
});

function App() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <RoutesApp />
      </ThemeProvider>
    </DataProvider>
  );
}
/** Creditos para recurso por fuera del MinTic: Emanuel Diaz Villa. */
export default App;
