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
import { Link } from "react-router-dom";

export default function ProductsList() {
  const { dataProducts, setDataCart } = useContext(DataContext);
  let userCredentials = useGetUserAuth();
  if (userCredentials === null || userCredentials === undefined) {
    userCredentials = {};
  }
  const [userAuth, setUserAuth] = useState(userCredentials);

  return (
    <div className="container-general">
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
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.urlImagen}
                />
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
                  <CardActions sx={{ "justify-content": "space-between" }}>
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
