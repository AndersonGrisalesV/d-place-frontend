import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import styled from "@emotion/styled/macro";
import { Slide } from "@mui/material";

const StyleErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

const StyleAlert = styled(MuiAlert)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#da4453",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
      : "#da4453",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  "&:hover": {
    border:
      theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #da4453",
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    [`${StyleErrorIcon}`]: {
      color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    },
  },
}));

const StyleSnackBar = styled(Snackbar)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const SnackBarResultLogin = ({ error, onClear }) => {
  useEffect(() => {
    setErrorState(error ? true : false);
  }, [error]);

  const [errorState, setErrorState] = useState(error ? true : false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    error = false;
    setErrorState(error ? true : false);
    onClear();
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <StyleSnackBar
      open={errorState}
      // autoHideDuration={6000}
      onClose={handleClose}
    >
      <StyleAlert
        onClose={handleClose}
        icon={<StyleErrorIcon fontSize="inherit" />}
      >
        {error}
      </StyleAlert>
    </StyleSnackBar>
  );
};

export default SnackBarResultLogin;
