import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { useNavigate, useParams } from "react-router-dom";
import "../utilities/styles/ShowInfoProduct.css";
import { useState, useContext } from "react";
import { DataContext } from "../utilities/hooks/DataContext";
import { useEffect } from "react";
import { useNotify } from "../utilities/hooks/useNotify";
import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";

export default function ShowInfoProduct() {
  let { productId } = useParams();
  let userCredentials = useGetUserAuth();
  const [quantity, setQuantity] = useState(0);
  const [dialog, setDialog] = useState({
    titleModal: "",
    messageModal: "",
  });
  const { titleModal, messageModal } = dialog;
  const [btnAction, setBtnAction] = useState("buyProduct");
  let val = 0;
  const {
    dataProducts,
    dataSales,
    setDataSales,
    dataCart,
    setDataCart,
  } = useContext(DataContext);
  const navigate = useNavigate();
  let newDataSales = dataSales;
  let newDataCart = dataCart;
  const [numberIncrement, setNumberIncrement] = useState(
    parseFloat(newDataSales[newDataSales.length - 1].idVenta)
  );

  useEffect(() => {
    getProductById(productId);
  });

  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const [productInfo, setProductInfo] = useState({
    id: "",
    urlImagen: "",
    name: "",
    description: "",
    price: "",
    quantity: 0,
  });

  const getProductById = (productId) => {
    const product = dataProducts.filter((product) => {
      return product["id"] === productId;
    });
    setProductInfo(product[0]);
  };

  const returnListProducts = (event) => {
    event.preventDefault();
    navigate("/auth/products");
  };

  const unityStock = `${productInfo.quantity} unidades disponibles`;

  const selectedQuantity = (e) => {
    val = parseFloat(e.target.value);
    setQuantity(val);
  };

  const buyProduct = (e) => {
    e.preventDefault();
    setOpen(true);
    setDialog({
      titleModal: "¿Seguro que desea comprar el producto?",
      messageModal: `Una vez aceptada la compra, no podrá agregar otro producto al carrito, 
      para eso deberá realziar una nueva compra.`,
    });

    setBtnAction("buyProduct");
  };

  const addProductToCart = (e) => {
    e.preventDefault();
    setOpen(true);
    setDialog({
      titleModal: "¿Desea agregar la cantidad digitada de productos?",
      messageModal: `Puede modificar la cantidad de productos a añadir, si así lo requiere.`,
    });
    setBtnAction("addProductToCart");
  };

  const successProduct = (e) => {
    e.preventDefault();
    if (quantity > productInfo.quantity) {
      onSetNotify({
        ...notify,
        open: true,
        type: "error",
        message: "No hay suficientes productos en inventario.",
      });
    } else if (quantity <= productInfo.quantity && btnAction === "buyProduct" && quantity > 0) {
      onBuyProduct();
    } else if (
      quantity <= productInfo.quantity &&
      btnAction === "addProductToCart" && quantity > 0
    ) {
      onAddToCart();
    } else if(quantity === 0) {
      onSetNotify({
        ...notify,
        open: true,
        type: "error",
        message: "Para comprar este producto, debe digitar al menos 1 o más cantidades.",
      });
    }
    setOpen(false);
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

  const valueSale = () => {
    let valueParsed = parseFloat(productInfo.price) * quantity;
    return parseFloat(parseFloat(valueParsed).toFixed(2));
  };

  const onBuyProduct = () => {
    let increment = numberIncrement + 1;
    newDataSales.unshift({
      fecha: formatDate(new Date()),
      idCliente: userCredentials.identificacion,
      idVenta: increment,
      valor: valueSale(),
      confirmado: true,
      detalleCompra: [
        {
          idProducto: productId,
          cantidad: quantity,
        },
      ],
    });
    setNumberIncrement(increment);
    setDataSales(newDataSales);
    navigateAuthHome({
      message: "Producto comprado satisfactoriamente.",
      type: "success",
    });
  };

  const onAddToCart = () => {
    let responseCart = validateCartProduct();
    if (!responseCart) {
      newDataCart.unshift({
        id: productId,
        quantity: quantity,
      });

      setDataCart(newDataCart);

      navigateAuthHome({
        message: "Producto añadido al carrito satisfactoriamente.",
        type: "success",
      });
    } else {
      onSetNotify({
        ...notify,
        open: true,
        type: "error",
        message: "Este producto ya fue agregado al carrito.",
      });
    }
  };

  const navigateAuthHome = (dataAlert) => {
    navigate("/auth/products", {
      replace: true,
      state: {
        dataAlert: dataAlert,
      },
    });
  };

  const validateCartProduct = () => {
    let boolId = false;
    /** Buscamos si existe el mimso producto en el carrito */
    let objFound = newDataCart.filter((e) => {
      return e["id"] === productId;
    });
    if (objFound.length > 0) {
      boolId = true;
    }
    return boolId;
  };

  return (
    <div className="container-general-product">
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
            <Button onClick={(e) => successProduct(e)} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        <RenderNotify />
      </>
      <div className="container-info-product">
        <div className="container-button">
          <Button
            sx={{ width: "220px" }}
            variant="contained"
            onClick={(event) => returnListProducts(event)}
          >
            Volver
          </Button>
        </div>
        <div className="container-info">
          <div
            className="container-image"
            style={{ backgroundImage: `url("${productInfo.urlImagen}")` }}
          ></div>
          <div className="container-product">
            <div className="container-elements">
              <div className="product-name">
                <TextField
                  sx={{ width: "100%" }}
                  variant="filled"
                  id="input-name"
                  label="Nombre"
                  value={productInfo.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="product-description">
                <TextField
                  sx={{ width: "100%", "text-align": "justify" }}
                  variant="filled"
                  id="input-desc"
                  label="Descripción"
                  multiline
                  rows={4}
                  value={productInfo.description}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="container-backfill">
                <div className="item-container-backfill">
                  <p className="backfill-title">
                    <LocalShippingIcon
                      sx={{ margin: "0 3px 0 0" }}
                    ></LocalShippingIcon>{" "}
                    Llega gratis el sábado
                  </p>
                  <p className="backfill-text">
                    Contáctese con soporte en caso de algún problema.
                  </p>
                </div>
                <div className="item-container-backfill">
                  <p className="backfill-title">
                    <AssignmentReturnIcon
                      sx={{ margin: "0 3px 0 0" }}
                    ></AssignmentReturnIcon>
                    Devolución gratis
                  </p>
                  <p className="backfill-text">
                    Tienes 30 días desde que lo recibes.
                  </p>
                </div>
              </div>
              <div className="product-props">
                <TextField
                  sx={{ margin: "0 4px" }}
                  variant="filled"
                  id="input-price"
                  label="Precio"
                  value={productInfo.price}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ margin: "0 4px" }}
                  id="input-stock"
                  label="Cantidad"
                  placeholder={unityStock}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InventoryIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => selectedQuantity(e)}
                />
              </div>

              <div className="product-actions">
                <Button
                  sx={{ width: "150px" }}
                  variant="contained"
                  onClick={(e) => buyProduct(e)}
                >
                  Comprar
                </Button>
                <Button
                  sx={{
                    width: "150px",
                    "line-height": "inherit",
                  }}
                  variant="contained"
                  onClick={(e) => addProductToCart(e)}
                >
                  Añadir al carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
