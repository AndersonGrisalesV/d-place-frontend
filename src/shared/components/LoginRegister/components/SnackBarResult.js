import React, { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { IconButton } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import styled from "@emotion/styled/macro";

//* Styled component for the ErrorIcon
const StyleErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#da4453c7" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

//* Styled component for the MuiAlert
//* It uses styled/macro to be able to control other MUI elements on hover in this case)
//TODO Note: They(MUI elements) have to be previously defined for them to work
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
      color: theme.palette.mode === "dark" ? "#da4453c7" : "#da4453",
    },
  },
}));

//* Styled component for the Snackbar
const StyleSnackBarError = styled(Snackbar)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

//* Styled component for the CheckCircleIcon
const StyleSuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#429E45" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

//* Styled component for the MuiAlert
//* It uses styled/macro to be able to control other MUI elements on hover in this case)
//TODO Note: They(MUI elements) have to be previously defined for them to work
const StyleAlertSuccess = styled(MuiAlert)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#429E45",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
      : "#da4453",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  border:
    theme.palette.mode === "dark"
      ? "1px solid transparent"
      : "1px solid #429E45",
  "&:hover": {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    border:
      theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #429E45",
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
    color: theme.palette.mode === "dark" ? "#fff" : "#429E45",
    [`${StyleSuccessIcon}`]: {
      color: theme.palette.mode === "dark" ? "#429E45" : "#429E45",
    },
  },
}));

//* Styled component for the Snackbar
const StyleSnackBarSuccess = styled(Snackbar)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#fff",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453",
  },
}));

// error is a boolean indicating if there's an error
// onClear is a pointer to a function to clear the error/success
// onSuccess is a boolean indicating if there's succcess
// message text prop indicating the message to display
// onDuration numeric prop indicating the duation the message will have
const SnackBarResult = ({ error, onClear, onSuccess, message, onDuration }) => {
  const [errorState, setErrorState] = useState(error ? true : false);
  const [successState, setSuccessState] = useState(onSuccess ? true : false);

  //* The useEffect hook updates the state variables errorState and successState
  //* whenever the values of the props error, onSuccess change.
  useEffect(() => {
    setErrorState(error ? true : false);
    setSuccessState(onSuccess ? true : false);
  }, [error, onSuccess]);

  const handleClose = (event, reason) => {
    setErrorState(error ? true : false);
    setSuccessState(onSuccess ? false : true);

    //* Triggers onClear to clean error/success messages
    if (!onSuccess) {
      onClear();
    }
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <React.Fragment>
      {error ? (
        <StyleSnackBarError
          open={errorState}
          autoHideDuration={onDuration}
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
                    //* fontSize for different screen sizes
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
              //* fontSize for different screen sizes
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
                  //* fontSize for different screen sizes
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
          autoHideDuration={onDuration}
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
                    //* fontSize for different screen sizes
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
              //* fontSize for different screen sizes
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
              <StyleSuccessIcon
                sx={{
                  //* fontSize for different screen sizes
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
            {message}
          </StyleAlertSuccess>
        </StyleSnackBarSuccess>
      ) : null}
    </React.Fragment>
  );
};

export default SnackBarResult;
