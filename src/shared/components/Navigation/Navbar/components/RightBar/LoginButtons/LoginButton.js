import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

// import { LoginContext } from "../../../../../../context/login-context";

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

const StyleButtonOnComment = styled(Button)(({ theme }) => ({
  minWidth: "51px",
  padding: "0px",
  margin: "0px",
  backgroundColor:
    theme.palette.mode === "dark" ? "transparent" : "transparent",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const LoginButton = ({ OnComment = false }) => {
  // const handleLogin = () => {};

  const location = useLocation();
  // console.log(location);

  const buttonLeaveAComment = OnComment ? (
    <Box>
      <NavLink
        to={{
          pathname: "/api/users/loginregister",
          state: {
            from: `${location}`,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <StyleButtonOnComment
          sx={{
            textTransform: "none",
            bgcolor: `${buttonColor}`,
          }}
        >
          Log in
        </StyleButtonOnComment>
      </NavLink>
    </Box>
  ) : (
    <Box>
      <NavLink to="/api/users/loginregister" style={{ textDecoration: "none" }}>
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

  // const login = useContext(LoginContext);
  return <React.Fragment>{buttonLeaveAComment}</React.Fragment>;
};

export default LoginButton;
