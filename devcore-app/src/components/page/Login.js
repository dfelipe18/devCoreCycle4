import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import usersJson from "../../json/clients.json";
import { useState } from "react";
import { Copyright } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  /** Variables globales */
  const theme = createTheme();
  const users = usersJson;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState({
    message: "Hubo un problema con el correo o contraseña.",
    type: "error",
  });


  /** Elementos para las alertas */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  /** Fin de elementos para las alertas */

  /** Elementos para validar el usuario del JSON */
  const getUserByEmailOrPassword = (prop, val, object) => {
    return object.filter((e) => {
      return e[prop] === val;
    });
  };

  const validateData = (email, password) => {
    const keys = Object.keys(users);
    let stateUser = false;
    for (let i = 0, len = keys.length; i < len; i++) {
      let objectUser = getUserByEmailOrPassword(
        "correo",
        email,
        users[keys[i]]
      );
      if (objectUser.length >= 1) {
        let passwordUser = getUserByEmailOrPassword(
          "identificacion",
          password,
          objectUser
        );
        if (passwordUser.length >= 1) {
          passwordUser[0].role = keys[i];
          stateUser = true;
          break;
        }
      }
    }

    return stateUser;
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    let stateUser = validateData(data.get("email"), data.get("password"));
    if (stateUser) {
      setAlertMessage({
        message: "Usuario logueado satisfactoriamente.",
        type: "success",
      });
    }
    setOpen(true);
    if(stateUser) {
        navigateAuthHome();
    }
  }

  const navigateAuthHome = () => {
    navigate("/auth/home", {replace: true});
  }
  /** Fin de elementos para validar el usuario del JSON */

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            position: "absolute",
            display: "flex",
            "justify-content": "center",
            "margin-top": "30px",
          }}
        >
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
              top: "0px"
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertMessage.type}
              sx={{ width: "100%" }}
            >
              {alertMessage.message}
            </Alert>
          </Snackbar>
        </Stack>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
