import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { LoginContext } from "../../../../../../context/login-context";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const buttonColor = red["A400"];

const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "transparent" : "transparent",
  color: "#fff",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.mode === "dark" ? "#9b9b9bc7" : "#bb63a1",
  },
}));

const LoginButton = () => {
  const handleLogin = () => {};

  const login = useContext(LoginContext);
  return (
    <Box>
      <NavLink to="/loginregister" style={{ textDecoration: "none" }}>
        <StyleButton
          sx={{
            textTransform: "none",
            bgcolor: `${buttonColor}`,
          }}
        >
          Log in
        </StyleButton>
      </NavLink>
    </Box>
  );
};

export default LoginButton;
