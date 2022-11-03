import * as React from "react";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import "../utilities/styles/CreateProduct.css";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useNotify } from "../utilities/hooks/useNotify";

export default function SetNewProducts() {
  /** Configuraciones para los notify */
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
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
  };

  const validateDataForm = (name, desc, price, quant, url) => {
    if (
      name !== "" &&
      desc !== "" &&
      price !== "" &&
      quant !== "" &&
      url !== ""
    ) {
      onSetNotify({
        ...notify,
        open: true,
        type: "success",
        message: "Producto agregado correctamente.",
      });
      return {
        name: name,
        description: desc,
        price: parseFloat(price),
        quantity: parseFloat(quant),
        urlImage: url,
      };
    } else {
      onSetNotify({
        ...notify,
        open: true,
        type: "error",
        message: "No se pudo agregar el producto, valide los campos.",
      });
    }
  };

  return (
    <div className="App">
      <RenderNotify />
      <main id="main" className="main">
        <div className="container-list mt-5 list-items">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              height: "100%",
              "padding-top": "0px",
              "padding-bottom": "0px",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </div>
        <div className="container-table mt-5 align-center table-items">
          <Grid
            container
            component="main"
            sx={{ height: "100vh" }}
            class="container-form"
          >
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
