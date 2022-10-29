import * as React from "react";
import { useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function Notification({ notify, handleClose }) {
  const { open, type, message } = notify;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
          top: "0px",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
