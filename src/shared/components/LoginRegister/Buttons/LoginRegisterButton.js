import React from "react";

import { Button, Zoom } from "@mui/material";
import styled from "@emotion/styled";

// Styled component for the login/signup button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// formIsValid is a boolean indicating whether the form is valid to enable the button and login/signup
// isLoginMode is a boolean indicating the mode we are in (login/signup)
const LoginRegisterButton = ({ formIsValid, isLoginMode }) => {
  return (
    <React.Fragment>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <StyleButton
          disableRipple={true}
          type="submit"
          disabled={formIsValid ? false : true}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 500,
            textTransform: "none",
            // fontSize for different screen sizes
            fontSize: {
              sps: "10px",
              ps: "12px",
              ts: "12px",
              sls: "13px",
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
        >
          {isLoginMode ? "LOGIN" : "REGISTER"}
        </StyleButton>
      </Zoom>
    </React.Fragment>
  );
};

export default LoginRegisterButton;
