import * as React from "react";
import { useContext } from "react";
import { DataContext } from "../utilities/hooks/DataContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import "../utilities/styles/ProductsList.css";
import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNotify } from "../utilities/hooks/useNotify";

export default function ProductsList() {
  const { dataProducts } = useContext(DataContext);
  const location = useLocation();
  let userCredentials = useGetUserAuth();
  if (userCredentials === null || userCredentials === undefined) {
    userCredentials = {};
  }
  const [userAuth, setUserAuth] = useState(userCredentials);
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
    <div className="container-general">
      <RenderNotify />
      <div className="container-title">
        <h2>Lista de productos</h2>
      </div>
      <div className="container-list-products">
        <Grid container spacing={2}>
          {dataProducts.map((product) => (
            <Grid
              key={product.id}
              item
              xs={6}
              md={4}
              lg={3}
              className="grid-container-card"
            >
              <Card className="card-item-product" sx={{ maxWidth: 345 }}>
                <div
                  className="card-image"
                  style={{ backgroundImage: `url("${product.urlImagen}")` }}
                ></div>
                <CardContent className="container-content-card">
                  <Typography
                    className="element-card-name"
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    className="element-card-desc"
                    variant="body2"
                    color="text.secondary"
                  >
                    {product.description}
                  </Typography>
                </CardContent>
                {userAuth.role !== undefined && userAuth.role === "clientes" && (
                  <CardActions sx={{ "justify-content": "space-around" }}>
                    <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
                      $ {product.price}{" "}
                    </Box>
                    <Link
                      className="nav-link"
                      to={`/auth/info-product/${product.id}`}
                    >
                      <Button
                        sx={{ "line-height": "26px" }}
                        variant="contained"
                        size="small"
                      >
                        Ver producto
                      </Button>
                    </Link>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
