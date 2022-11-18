import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled/macro";
import { IconButton, Slide } from "@mui/material";

const StyleErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

const StyleAlertError = styled(MuiAlert)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#da4453",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
      : "#da4453",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  border:
    theme.palette.mode === "dark"
      ? "1px solid transparent"
      : "1px solid #da4453",
  "&:hover": {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    border:
      theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #da4453",
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",

    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    [`${StyleErrorIcon}`]: {
      color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    },
  },
}));

const StyleSnackBarError = styled(Snackbar)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",

  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

const StyleAlertSuccess = styled(MuiAlert)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#da4453",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
      : "#da4453",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  border:
    theme.palette.mode === "dark"
      ? "1px solid transparent"
      : "1px solid #da4453",
  "&:hover": {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    border:
      theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #da4453",
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",

    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    [`${StyleErrorIcon}`]: {
      color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
    },
  },
}));

const StyleSnackBarSuccess = styled(Snackbar)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",

  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const SnackBarResultLogin = ({
  error,
  onClear,
  onSuccess,
  setChangeState,
  message,
  logUser,
}) => {
  useEffect(() => {
    setErrorState(error ? true : false);
    setSuccessState(onSuccess ? true : false);
  }, [error, onSuccess]);

  const [errorState, setErrorState] = useState(error ? true : false);
  const [successState, setSuccessState] = useState(onSuccess ? true : false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    error = false;
    setErrorState(error ? true : false);
    setSuccessState(onSuccess ? true : false);
    setChangeState(false);
    onClear();
    if (reason === "clickaway") {
      setChangeState(false);
      return;
    }
  };

  return (
    <React.Fragment>
      {error ? (
        <StyleSnackBarError
          open={errorState}
          // autoHideDuration={6000}
          onClose={handleClose}
        >
          <StyleAlertError
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon
                  sx={{
                    marginLeft: "-9px",
                    fontSize: {
                      sps: "14px",
                      ps: "16px",
                      ts: "18px",
                      sls: "18px",
                      sms: "20px",
                      sc: "20px",
                      nsc: "20px",
                      ns: "20px",
                      msc: "20px",
                      mns: "20px",
                      ms: "20px",
                      lgs: "20px",
                    },
                    padding: "0px",
                    paddingLeft: "8px",
                    paddingRight: "0px",
                  }}
                />
              </IconButton>
            }
            sx={{
              fontSize: {
                sps: "9px",
                ps: "10px",
                ts: "12px",
                sls: "12px",
                sms: "14px",
                sc: "14px",
                nsc: "14px",
                ns: "14px",
                msc: "14px",
                mns: "14px",
                ms: "14px",
                lgs: "14px",
              },
            }}
            icon={
              <StyleErrorIcon
                sx={{
                  fontSize: {
                    sps: "14px",
                    ps: "16px",
                    ts: "20px",
                    sls: "20px",
                    sms: "23px",
                    sc: "23px",
                    nsc: "23px",
                    ns: "23px",
                    msc: "23px",
                    mns: "23px",
                    ms: "23px",
                    lgs: "23px",
                  },
                }}
              />
            }
          >
            {error}
          </StyleAlertError>
        </StyleSnackBarError>
      ) : onSuccess ? (
        <StyleSnackBarSuccess
          open={successState}
          // autoHideDuration={6000}
          onClose={handleClose}
        >
          <StyleAlertSuccess
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon
                  sx={{
                    marginLeft: "-9px",
                    fontSize: {
                      sps: "14px",
                      ps: "16px",
                      ts: "18px",
                      sls: "18px",
                      sms: "20px",
                      sc: "20px",
                      nsc: "20px",
                      ns: "20px",
                      msc: "20px",
                      mns: "20px",
                      ms: "20px",
                      lgs: "20px",
                    },
                    padding: "0px",
                    paddingLeft: "8px",
                    paddingRight: "0px",
                  }}
                />
              </IconButton>
            }
            sx={{
              fontSize: {
                sps: "9px",
                ps: "10px",
                ts: "12px",
                sls: "12px",
                sms: "14px",
                sc: "14px",
                nsc: "14px",
                ns: "14px",
                msc: "14px",
                mns: "14px",
                ms: "14px",
                lgs: "14px",
              },
            }}
            icon={
              <StyleErrorIcon
                sx={{
                  fontSize: {
                    sps: "14px",
                    ps: "16px",
                    ts: "20px",
                    sls: "20px",
                    sms: "23px",
                    sc: "23px",
                    nsc: "23px",
                    ns: "23px",
                    msc: "23px",
                    mns: "23px",
                    ms: "23px",
                    lgs: "23px",
                  },
                }}
              />
            }
          >
            {message} {logUser.name}
          </StyleAlertSuccess>
        </StyleSnackBarSuccess>
      ) : null}
    </React.Fragment>
  );
};

export default SnackBarResultLogin;
