import React from "react";

import { Button, Zoom } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for the Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

//* switchModeHandler resets values when changin login/signup and changes isLoingMode
// isLoginMode is a boolean indicating the mode we are in (login/signup)
// showSuccess is a boolean indicating success creating the account which allows us to disable the button
const CreateAccountButton = ({
  switchModeHandler,
  isLoginMode,
  showSuccess,
}) => {
  return (
    <React.Fragment>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <StyleButton
          disableRipple={true}
          onClick={switchModeHandler}
          disabled={showSuccess ? true : false}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 500,
            textTransform: "none",
            //* fontSize for different screen sizes
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
          {isLoginMode ? "Create an Account" : "Go back"}
        </StyleButton>
      </Zoom>
    </React.Fragment>
  );
};

export default CreateAccountButton;
