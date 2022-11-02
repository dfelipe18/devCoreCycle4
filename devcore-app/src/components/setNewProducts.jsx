import * as React from "react";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import "../utilities/styles/CreateProduct.css";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

export default function SetNewProducts() {
  /** Configuraciones para los notify */

  /** End Configuraciones para los notify */
  const onSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const res = validateDataForm(
      dataForm.get("name"),
      dataForm.get("description"),
      dataForm.get("price"),
      dataForm.get("quantity"),
      dataForm.get("urlImage")
    );
    debugger;
  };

  const validateDataForm = (name, desc, price, quant, url) => {
    if (
      name !== "" &&
      desc !== "" &&
      price !== "" &&
      quant !== "" &&
      url !== ""
    ) {
      return {
        name: name,
        description: desc,
        price: parseFloat(price),
        quantity: parseFloat(quant),
        urlImage: url,
      };
    }
  };

  return (
    <div className="App">
      <main id="main" className="main">
        <div className="container-table mt-5 align-center">
          <Grid
            container
            component="main"
            sx={{ height: "100vh" }}
            class="container-form"
          >
            {/* <RenderNotify /> */}
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Añadir nuevo producto
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={onSubmitForm}
                sx={{ mt: 1 }}
              >
                <Grid sx={{ width: "100%" }}>
                  <TextField
                    margin="normal"
                    sx={{ width: "48%", "margin-right": "9px" }}
                    name="name"
                    label="Nombre del producto"
                    id="name"
                    className="name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    sx={{ width: "48%", "margin-left": "9px" }}
                    name="description"
                    label="Descripción"
                    id="description"
                    className="description"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid sx={{ width: "100%" }}>
                  <TextField
                    margin="normal"
                    sx={{ width: "48%", "margin-right": "9px" }}
                    name="price"
                    label="Precio"
                    id="price"
                    className="price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    sx={{ width: "48%", "margin-left": "9px" }}
                    name="quantity"
                    label="Cantidad en stock"
                    id="quantity"
                    className="quant"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InventoryIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <TextField
                    margin="normal"
                    sx={{ width: "100%" }}
                    id="urlImage"
                    label="URL de imagen"
                    name="urlImage"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  sx={{
                    width: "100%",
                    display: "flex",
                    "justify-content": "end",
                  }}
                >
                  <Button type="submit" variant="contained" color="secondary">
                    Crear producto
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </div>
      </main>
    </div>
  );
}
