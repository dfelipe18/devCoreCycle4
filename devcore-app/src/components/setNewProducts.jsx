import * as React from "react";
import { useState, useContext } from "react";
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
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNotify } from "../utilities/hooks/useNotify";
import { DataContext } from "../utilities/hooks/DataContext";

export default function SetNewProducts() {
  /** Configuraciones para los notify */
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
  const prefixId = "GGOEAFKA0";
  const [numberIncrement, setNumberIncrement] = useState(87599);
  /** End Configuraciones para los notify */
  const { dataProducts, setDataProducts } = useContext(DataContext);
  let newDataProducts = dataProducts;
  const [productData, setProductData] = useState({
    id: "",
    urlImagen: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [actionsProducts, setActionsProducts] = useState({
    title: "Actualizar producto",
    titleButton: "Actualizar",
    msgBadNotification:
      "No se pudo actualizar el producto, asegurese de diligenciar bien el formulario.",
    msgFullNotification: "Producto actualizado correctamente.",
    label: "Editar productos",
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setActionsProducts({
        title: "Actualizar producto",
        titleButton: "Actualizar",
        msgBadNotification:
          "No se pudo actualizar el producto, asegurese de diligenciar bien el formulario.",
        msgFullNotification: "Producto actualizado correctamente.",
        label: "Editar productos",
      });
    } else {
      setActionsProducts({
        title: "Agregar nuevo producto",
        titleButton: "Crear",
        msgBadNotification:
          "No se pudo crear el producto, asegurese de diligenciar bien el formulario.",
        msgFullNotification: "Producto creado correctamente.",
        label: "Crear productos",
      });
    }
    setProductData({
      id: "",
      urlImagen: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);

    validateDataForm(
      dataForm.get("id"),
      dataForm.get("name"),
      dataForm.get("description"),
      dataForm.get("price"),
      dataForm.get("quantity"),
      dataForm.get("urlImagen")
    );
  };

  const validateDataForm = (id, name, desc, price, quant, url) => {
    let typeNoty = "error",
      msgNoty = actionsProducts.msgBadNotification,
      data = {};
    if (
      name !== "" &&
      desc !== "" &&
      price !== "" &&
      quant !== "" &&
      url !== ""
    ) {
      if (!checked && id !== "") {
        const obj = newDataProducts.find((p) => p.id === id);
        obj.name = name;
        obj.description = desc;
        obj.price = price;
        obj.quantity = parseFloat(quant);
        obj.urlImagen = url;
        typeNoty = "success";
        msgNoty = actionsProducts.msgFullNotification;
      } else if (checked && id === "") {
        let increment = numberIncrement + 1;
        data = {
          id: prefixId + increment.toString(),
          name: name,
          description: desc,
          price: price,
          quantity: parseFloat(quant),
          urlImagen: url,
        };
        setNumberIncrement(increment);
        newDataProducts.push(data);
        typeNoty = "success";
        msgNoty = actionsProducts.msgFullNotification;
      }
      setDataProducts(newDataProducts);
    }

    onSetNotify({
      ...notify,
      open: true,
      type: typeNoty,
      message: msgNoty,
    });
    setProductData({
      id: "",
      urlImagen: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  const getItemSelected = (event, product) => {
    setProductData(product);
  };

  const onChangeDataForm = (event) => {
    let id = productData.id,
      name = productData.name,
      description = productData.description,
      price = productData.price,
      quantity = productData.quantity,
      urlImagen = productData.urlImagen;

    switch (event.currentTarget.name) {
      case "name":
        name = event.currentTarget.value;
        break;
      case "description":
        description = event.currentTarget.value;
        break;
      case "price":
        price = event.currentTarget.value;
        break;
      case "quantity":
        quantity = event.currentTarget.value;
        break;
      case "urlImagen":
        urlImagen = event.currentTarget.value;
        break;
    }

    setProductData({
      id: id,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      urlImagen: urlImagen,
    });
  };

  return (
    <div className="container-modified-products">
      <RenderNotify />
      {!checked && (
        <div className="container-list mt-5 list-items">
          <List
          className="list-products"
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#fafafa",
              height: "100%",
              "padding-top": "0px",
              "padding-bottom": "0px",
            }}
          >
            {dataProducts.map((product) => (
              <div key={product.id}>
                <ListItemButton
                  alignItems="flex-start"
                  onClick={(event) => getItemSelected(event, product)}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={product.urlImagen} />
                  </ListItemAvatar>
                  <Tooltip
                    title={
                      <>
                        <Typography color="inherit">{product.name}</Typography>
                        <em>{product.description}</em>
                      </>
                    }
                    placement="right"
                  >
                    <ListItemText
                      className="text-product-item"
                      primary={product.name}
                      secondary={product.description}
                    />
                  </Tooltip>
                </ListItemButton>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </div>
      )}
      <div className="table-items">
        <div className="container-title-page">
          <h2>Gestionar productos</h2>
        </div>
        <Grid container component="main" className="container-form">
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {actionsProducts.title}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitForm}
              sx={{ mt: 1 }}
            >
              <Grid sx={{ width: "100%" }}>
                <TextField
                  id="id"
                  name="id"
                  sx={{ display: "none" }}
                  value={productData.id}
                />
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
                  onChange={onChangeDataForm}
                  value={productData.name}
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
                  onChange={onChangeDataForm}
                  value={productData.description}
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
                  onChange={onChangeDataForm}
                  value={productData.price}
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
                  onChange={onChangeDataForm}
                  value={productData.quantity}
                />
              </Grid>
              <Grid sx={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  sx={{ width: "100%" }}
                  id="urlImagen"
                  label="URL de imagen"
                  name="urlImagen"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChangeDataForm}
                  value={productData.urlImagen}
                />
              </Grid>
              <Grid
                sx={{
                  width: "100%",
                  display: "flex",
                  "justify-content": "space-between;",
                }}
              >
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label={actionsProducts.label}
                />
                <Button type="submit" variant="contained" color="secondary">
                  {actionsProducts.titleButton}
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
