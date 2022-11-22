import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../utilities/hooks/DataContext";
import { useNotify } from "../utilities/hooks/useNotify";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "../utilities/styles/ShoppingCart.css";
import { useEffect } from "react";
import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
  const [dialog, setDialog] = useState({
    titleModal: "",
    messageModal: "",
  });
  const { titleModal, messageModal } = dialog;
  const [open, setOpen] = useState(false);
  const [btnAction, setBtnAction] = useState("buyProducts");
  const [productToDelete, setProductToDelete] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  let newProductsSelected = [...selectedProducts];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    dataProducts,
    dataSales,
    setDataSales,
    dataCart,
    setDataCart,
  } = useContext(DataContext);
  const newDataSales = [...dataSales];
  const [numberIncrement, setNumberIncrement] = useState(
    parseFloat(newDataSales[newDataSales.length - 1].idVenta)
  );
  let userCredentials = useGetUserAuth();

  useEffect(() => {
    for (let i = 0, len = dataCart.length; i < len; i++) {
      getProductById(dataCart[i].id, dataCart[i].quantity);
    }
    setSelectedProducts(newProductsSelected);
  }, [dataCart]);

  const getProductById = (productId, quantitySelected) => {
    let stateCart = false;
    const productCart = newProductsSelected.map((product) => {
      if (product.id === productId) {
        return (stateCart = true);
      }
    });
    if (!stateCart) {
      const product = dataProducts.filter((product) => {
        return product["id"] === productId;
      });
      product[0]["quantitySelected"] = quantitySelected;
      newProductsSelected.push(product[0]);
    }
    getTotalValues();
  };

  const getTotalValues = () => {
    setTotalValue(0);
    let valueParsed = 0;
    newProductsSelected.map((product) => {
      valueParsed += parseFloat(product.price) * product.quantitySelected;
    });
    setTotalValue(parseFloat(valueParsed).toFixed(2));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRemoveQuantity = (e, productId) => {
    e.preventDefault();
    const productSelected = selectedProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantitySelected: Math.max(product.quantitySelected - 1, 1),
        };
      }
      return product;
    });

    const productCart = dataCart.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: Math.max(product.quantity - 1, 1),
        };
      }
      return product;
    });

    setSelectedProducts(productSelected);
    setDataCart(productCart);
  };

  const onAddQuantity = (e, productId) => {
    e.preventDefault();
    let proxQuantity = 0;
    let boolDataCart = false;
    const productSelected = selectedProducts.map((product) => {
      if (product.id === productId) {
        proxQuantity = product.quantitySelected + 1;
        if (proxQuantity <= product.quantity) {
          boolDataCart = true;
          return {
            ...product,
            quantitySelected: proxQuantity,
          };
        }
      }
      return product;
    });
    if (boolDataCart) {
      const productCart = dataCart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setDataCart(productCart);
    }
    setSelectedProducts(productSelected);
  };

  const onAcceptDialog = (e) => {
    e.preventDefault();
    let increment = 0;
    switch (btnAction) {
      case "deleteProduct":
        const newProducts = selectedProducts.filter(
          (p) => p.id !== productToDelete
        );
        const newProductsCart = dataCart.filter(
          (p) => p.id !== productToDelete
        );
        setSelectedProducts(newProducts);
        setDataCart(newProductsCart);
        onSetNotify({
          ...notify,
          open: true,
          type: "success",
          message: "Producto eliminado del carrito satisfactoriamente.",
        });
        break;
      case "cancelSale":
        increment = numberIncrement + 1;
        newDataSales.unshift({
          fecha: formatDate(new Date()),
          idCliente: userCredentials.identificacion,
          idVenta: increment,
          valor: parseFloat(totalValue),
          confirmado: false,
          detalleCompra: dataCart,
        });
        setNumberIncrement(increment);
        setDataSales(newDataSales);
        setDataCart([]);
        navigate("/auth/products", {
          replace: false,
          state: {
            dataAlert: {
              type: "success",
              message: "Compra cancelada satisfactoriamente, lo invitamos a que siga viendo nuestros diversos productos.",
            },
          },
        });
        break;
      case "buyProducts":
        increment = numberIncrement + 1;
        newDataSales.unshift({
          fecha: formatDate(new Date()),
          idCliente: userCredentials.identificacion,
          idVenta: increment,
          valor: parseFloat(totalValue),
          confirmado: true,
          detalleCompra: dataCart,
        });
        setNumberIncrement(increment);
        setDataSales(newDataSales);
        setDataCart([]);
        navigate("/auth/home", {
          replace: false,
          state: {
            dataAlert: {
              type: "success",
              message: "¡Gracias por su compra, esperamos que vuelva pronto!",
            },
          },
        });
        break;

      default:
        break;
    }
    setOpen(false);
  };

  const deleteProduct = (e, productId) => {
    e.preventDefault();
    setOpen(true);
    setDialog({
      titleModal: "¿Seguro que desea eliminar este producto del carrito?",
      messageModal: `Al eliminar el producto seleccionado, 
      desaparecerá del carrito, sin embargo, 
      seguirá disponible en la lista de productos.`,
    });
    setBtnAction("deleteProduct");
    setProductToDelete(productId);
  };

  const cancelSale = (e) => {
    e.preventDefault();
    setOpen(true);
    setDialog({
      titleModal: "¿Seguro que desea cancelar la compra?",
      messageModal: `Si cancela la compra, todos los productos agregados al carrito,
      se eliminarán automáticamente, sin embargo, 
      seguirán disponibles en la lista de productos.`,
    });
    setBtnAction("cancelSale");
  };

  const buyProducts = (e) => {
    e.preventDefault();
    setOpen(true);
    setDialog({
      titleModal: "¿Seguro que desea continuar con la compra?",
      messageModal: `Al continuar con la compra, no podrá añadir más productos al carrito,
       a menos que realice una nueva compra.`,
    });
    setBtnAction("buyProducts");
  };

  const valueSaleByProduct = (price, selectedQuantity) => {
    let valueParsed = parseFloat(price) * selectedQuantity;
    return parseFloat(valueParsed).toFixed(2);
  };

  const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="container-cart">
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{titleModal}</DialogTitle>
          <DialogContent>
            <DialogContentText>{messageModal}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={onAcceptDialog} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        <RenderNotify />
      </>
      <div className="container-info-products">
        <div className="container-title-cart">
          <h2>Carrito de compras</h2>
        </div>
        {selectedProducts.length === 0 && (
          <div className="container-content-products-empty">
            <h1 style={{ textAlign: "center" }}>
              ¡Agrega productos al carrito para poder visualizarlos!
            </h1>
          </div>
        )}
        {selectedProducts.length > 0 && (
          <div className="container-content-products">
            {selectedProducts.map((product) => (
              <div className="container-element-product" key={product.id}>
                <div className="container-image-product">
                  <img
                    className="image-product"
                    src={product.urlImagen}
                    alt="imagen producto"
                  />
                </div>
                <div className="container-data-product">
                  <div className="element-actions">
                    <div className="product-name">
                      <Typography
                        variant="h5"
                        sx={{
                          "font-weight": "800",
                          "text-transform": "capitalize",
                          "white-space": "nowrap",
                          overflow: "hidden",
                          "text-overflow": "ellipsis",
                          width: "100%",
                        }}
                        gutterBottom
                      >
                        {product.name}
                      </Typography>
                    </div>
                    <div className="product-btn">
                      <Tooltip title="Eliminar producto">
                        <IconButton
                          onClick={(e) => deleteProduct(e, product.id)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="element-desc">
                    <Typography
                      sx={{
                        height: "100%",
                        "margin-bottom": "0",
                        "line-height": "20px",
                      }}
                      variant="subtitle1"
                      gutterBottom
                    >
                      {product.description}
                    </Typography>
                  </div>
                  <div className="element-info">
                    <div className="product-price">
                      <Typography
                        variant="h6"
                        sx={{ "font-weight": "700" }}
                        gutterBottom
                      >
                        $
                        {valueSaleByProduct(
                          product.price,
                          product.quantitySelected
                        )}
                      </Typography>
                    </div>
                    <div className="product-quantity">
                      <div className="item-buttons">
                        <ButtonGroup>
                          <Button
                            sx={{
                              "border-right-color": "unset !important",
                              "border-top-right-radius": "4px !important",
                              "border-bottom-right-radius": "4px !important",
                            }}
                            aria-label="reduce"
                            variant="contained"
                            size="small"
                            onClick={(e) => onRemoveQuantity(e, product.id)}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Typography
                            sx={{
                              margin: "0 10px",
                              width: "45px",
                              "text-align": "center",
                              "font-weight": "700",
                            }}
                            variant="h6"
                            gutterBottom
                          >
                            {product.quantitySelected}
                          </Typography>
                          <Button
                            sx={{
                              "border-top-left-radius": "4px !important",
                              "border-bottom-left-radius": "4px !important",
                            }}
                            aria-label="increase"
                            variant="contained"
                            size="small"
                            onClick={(e) => onAddQuantity(e, product.id)}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className="item-text">
                        <Typography variant="body2" gutterBottom>
                          {product.quantity} unidades disponibles
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedProducts.length > 0 && (
          <div className="container-buttons-actions">
            <div className="container-actions-btn">
              <Button
                variant="contained"
                size="small"
                sx={{ "margin-right": "25px", height: "100%" }}
                onClick={cancelSale}
              >
                Cancelar compra
              </Button>
              <Button
                sx={{ "margin-right": "25px", height: "100%" }}
                variant="contained"
                size="small"
                onClick={buyProducts}
              >
                Continuar compra
              </Button>
            </div>
            <div className="container-total-text">
              <Typography
                variant="h6"
                sx={{ "font-weight": "700" }}
                gutterBottom
              >
                Valor total del carrito: ${totalValue}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
