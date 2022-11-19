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
import usersJson from "../../utilities/json/clients.json";
import { useEffect } from "react";
import { Copyright } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotify } from "../../utilities/hooks/useNotify";
import { useLocalStorage } from "../../utilities/hooks/useLocalStorage";
import "../../utilities/styles/Login.css";

export default function Login(props) {
  const users = usersJson;
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useLocalStorage("user-auth", "");

  /** Fucniones del nmotify */
  const { notify, RenderNotify, onSetNotify } = useNotify({
    open: false,
    type: "",
    message: "",
  });

  const location = useLocation();
 
  useEffect(() => {
    if(location.state) {
      onSetNotify({
        ...notify,
        open: true,
        type: location.state.dataAlert.type,
        message: location.state.dataAlert.message,
      });
    }
  }, [location.state]);
  /** Fucniones del nmotify */

  /** Elementos para validar el usuario del JSON */
  const getUserByEmailOrPassword = (prop, val, object) => {
    return object.filter((e) => {
      return e[prop] === val;
    });
  };

  const validateData = (email, password) => {
    const keys = Object.keys(users);
    let stateUser = false;
    let passwordUser = [];
    for (let i = 0, len = keys.length; i < len; i++) {
      let objectUser = getUserByEmailOrPassword(
        "correo",
        email,
        users[keys[i]]
      );
      if (objectUser.length >= 1) {
        passwordUser = getUserByEmailOrPassword(
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
    return { stateUser: stateUser, userData: passwordUser };
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userInfo = validateData(data.get("email"), data.get("password"));
    if (userInfo.stateUser) {
      navigateAuthHome(userInfo.userData[0], {
        message: "Usuario logueado satisfactoriamente.",
        type: "success",
      });
    } else {
      onSetNotify({
        ...notify,
        open: true,
        type: "error",
        message: "Hubo un problema con el correo o contraseña.",
      });
    }
  }

  const navigateAuthHome = (userData, dataAlert) => {
    setUserAuth('user-auth', userData);
    navigate("/auth/home", {
      replace: true,
      state: {
        dataAlert: dataAlert,
      },
    });
  };

  /** Fin de elementos para validar el usuario del JSON */

  return (
      <Grid container component="main" className="container-login">
        <CssBaseline />

        <RenderNotify />

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
        <Grid className="container-inputs" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                color="secondary"
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
  );
}
