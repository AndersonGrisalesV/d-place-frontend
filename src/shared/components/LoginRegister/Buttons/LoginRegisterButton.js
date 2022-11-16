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

const LoginRegisterButton = ({ formIsValid, isLoginMode }) => {
  // const showMessage = (
  //   <Snackbar
  //     open={true}
  //     autoHideDuration={5000}
  //     sx={{ display: "flex", justifyContent: "end" }}
  //   >
  //     <Alert variant="filled" severity="success" fontSize={17} fontWeight={400}>
  //       {isLoginMode ? "Login sucessful" : "Account created successfully"}
  //     </Alert>
  //   </Snackbar>
  // );

  // const hadleSubmissionMessage = () => {
  //   setSuccessMessage(true);
  // };

  return (
    <StyleButton
      type="submit"
      // onClick={hadleSubmissionMessage}
      disabled={formIsValid ? false : true}
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
      {isLoginMode ? "LOGIN" : "REGISTER"}
    </StyleButton>
  );
};

export default LoginRegisterButton;
