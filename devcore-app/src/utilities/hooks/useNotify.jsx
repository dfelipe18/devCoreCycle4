import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const useNotify = (notifyParams = {}) => {
  const [notify, setNotify] = useState(notifyParams);
  const { open = false, type = "success", message = "" } = notify;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      open: false,
    });
  };

  const onSetNotify = ({ open, type, message }) => {
    setNotify({
      ...notify,
      open,
      type,
      message,
    });
  };

  const RenderNotify = () => {
    return (
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
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
            top: "0px",
          }}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  };

  return {
    ...notify,
    notify,
    onSetNotify,
    RenderNotify,
  };
};
