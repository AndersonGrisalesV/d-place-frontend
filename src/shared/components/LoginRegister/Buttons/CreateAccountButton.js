import React from "react";

import { Button } from "@mui/material";
import styled from "@emotion/styled";

const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const CreateAccountButton = ({ switchModeHandler, isLoginMode }) => {
  return (
    <StyleButton
      onClick={switchModeHandler}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 500,
        textTransform: "none",
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
  );
};

export default CreateAccountButton;
