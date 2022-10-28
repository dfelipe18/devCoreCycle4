import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sales from "../json/sales.json";
import "../ventas.css";
import "../App.css";
import AppNavBar from "./page/AppNavBar";

export default function SalesComponent(props) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="App">
      <header id="header" className="header">
        <AppNavBar />
      </header>
      <main id="main" className="main">
        <div className="container mt-5 align-center">
          <h1>Lista de ventas</h1>
          <div className="row">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID Venta</StyledTableCell>
                    <StyledTableCell>ID Cliente</StyledTableCell>
                    <StyledTableCell>Fecha de Venta</StyledTableCell>
                    <StyledTableCell>Valor</StyledTableCell>
                    <StyledTableCell>Venta confirmada</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.ventas.map((item) => (
                    <StyledTableRow key={item.idVenta}>
                      <StyledTableCell>{item.idVenta}</StyledTableCell>
                      <StyledTableCell>{item.idCliente}</StyledTableCell>
                      <StyledTableCell>{item.fecha}</StyledTableCell>
                      <StyledTableCell>{item.valor}</StyledTableCell>
                      <StyledTableCell>
                        {item.confirmado ? "Si" : "No"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
