import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../utilities/styles/SalesStyles.css";
import { DataContext } from "../utilities/hooks/DataContext";

export default function SalesComponent() {

  const {dataSales} = useContext(DataContext);
  
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

  const valueSales = (initial, item) => {
    return initial + item.valor;
  };

  return (
      <div className="container-sales">
        <div className="title-sales">
          <h2>Listado de ventas</h2>
        </div>
        <div className="container-table mt-5 align-center">
          <div className="row">
            <TableContainer component={Paper} sx={{ "max-height": "66vh"}}>
              <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">ID Cliente</StyledTableCell>
                    <StyledTableCell align="center">
                      Fecha de Venta
                    </StyledTableCell>
                    <StyledTableCell align="center">ID Venta</StyledTableCell>
                    <StyledTableCell align="center">
                      Venta confirmada
                    </StyledTableCell>
                    <StyledTableCell align="center">Valor</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSales.map((item) => (
                    <StyledTableRow key={item.idVenta}>
                      <StyledTableCell align="center">
                        {item.idCliente}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.fecha}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idVenta}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.confirmado ? "Si" : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        $ {item.valor}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="row">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Total de Ventas
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow key="total-value">
                    <StyledTableCell align="center">
                      $ {dataSales.reduce(valueSales, 0)}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
  );
}
