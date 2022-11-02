
import React from "react";
import './App.css';
import RoutesApp from "./RoutesApp";
import { DataProvider } from "./utilities/hooks/DataContext";


function App() {
  return (
    <DataProvider>
      <RoutesApp/>
    </DataProvider>
  );
}
/** Creditos para recurso por fuera del MinTic: Emanuel Diaz Villa. */
export default App;
