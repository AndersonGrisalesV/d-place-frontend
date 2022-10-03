import { Divider, Typography } from "@mui/material";
import React from "react";

const Title = ({ isLoginMode }) => {
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        fontWeight={400}
        mt={2}
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoginMode ? "Login" : "Register"}
      </Typography>
      <Divider variant="middle" />
      <br />
      <br />
    </React.Fragment>
  );
};

export default Title;
