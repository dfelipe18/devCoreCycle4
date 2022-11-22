import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserAuth } from "../../utilities/hooks/useGetUserAuth";
import { useState, useEffect } from "react";
import "../../utilities/styles/NavBarStyles.css";
import { Badge } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../utilities/hooks/DataContext";
import clientImage from "../../utilities/images/client-two.jpg";
import adminImage from "../../utilities/images/avatar.jpg";
export default function AppNavBar() {
  let pages = [
    { name: "Productos", url: "/auth/products", tooltip: "Ver productos" },
    {
      name: "Gestionar productos",
      url: "/auth/modified-products",
      tooltip: "Modificar productos",
    },
    { name: "Ventas", url: "/auth/sales", tooltip: "Ver ventas" },
  ];
  let urlAuth = "/auth/home";
  let messageAuth = "Inicia sessión para ver las opciones.";
  const { dataCart } = useContext(DataContext);

  let userCredentials = useGetUserAuth();
  if (userCredentials === null || userCredentials === undefined) {
    userCredentials = {};
  }
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(userCredentials);

  window.addEventListener("login-pass", () => {
    userCredentials = useGetUserAuth();
    setUserAuth(userCredentials);
  });

  if (userAuth.role !== undefined && userAuth.role === "clientes") {
    pages = [
      {
        name: "Ver productos",
        url: "/auth/products",
        tooltip: "Ver productos",
      },
    ];
  } else if (!userAuth || userAuth.role === undefined) {
    urlAuth = "/";
    pages = [
      {
        name: messageAuth,
        url: "/",
        tooltip: messageAuth,
      },
    ];
  }
  const settings = [
    { prop: "Cuenta", action: "null" },
    { prop: "Salir", action: "exit" },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deleteLocaleSotrage = (action) => {
    if (action === "exit") {
      localStorage.clear();
      setUserAuth({});
      return navigate("/", {
        replace: true,
        state: {
          dataAlert: {
            type: "success",
            message: "¡Gracias por visitarnos, vuelva pronto!",
          },
        },
      });
    }
  };

  return (
    <AppBar position="static" color="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className="nav-link" to={urlAuth}>
              DevCore
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link className="nav-link" to={page.url}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <StoreIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "white"}} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DevCore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link className="nav-link" to={page.url}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          {userAuth.role !== undefined && userAuth.role === "clientes" && (
            <Tooltip title="Ver carrito">
              <IconButton
                sx={{ mr: 2 }}
                color="inherit"
                component={Link}
                to="/auth/shopping-cart"
              >
                <Badge badgeContent={dataCart.length} color="blueBtn">
                  <ShoppingCartIcon
                    sx={{ display: { xs: "none", md: "flex", color: "white" } }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {userAuth.role !== undefined && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User image" src={userAuth.role === "clientes" ? clientImage : adminImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.prop}
                    onClick={() => deleteLocaleSotrage(setting.action)}
                  >
                    <Typography textAlign="center">{setting.prop}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
