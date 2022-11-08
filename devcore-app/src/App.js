import React from "react";
import "./App.css";
import RoutesApp from "./RoutesApp";
import { DataProvider } from "./utilities/hooks/DataContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff1744",
    },
    secondary: {
      main: "#ec407a",
    },
    blueBtn: {
      main: "#2196f3",
    }
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
