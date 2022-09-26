import { Box, TextField } from "@mui/material";
import React from "react";
import CardWrapper from "../shared/components/Navigation/Feed/places/components/CardWrapper";

const LoginRegister = () => {
  return (
    <Box flex={8} p={8} m={1}>
      <Box
        sx={{
          marginLeft: "10px",
          marginTop: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardWrapper>
          <TextField
            id="outlined-name-input"
            label="Name"
            type="text"
            autoComplete="current-name"
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default LoginRegister;
