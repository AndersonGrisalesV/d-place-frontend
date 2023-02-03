import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
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
  const login = useContext(LoginContext);

  const cleanListItemsHandler = () => {
    login.listItemsNotListed();
  };

  const location = useLocation();

  const buttonLeaveAComment = OnComment ? (
    <Box onClick={cleanListItemsHandler}>
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
          disableRipple={true}
          sx={{
            textTransform: "none",
            bgcolor: `${buttonColor}`,
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
          Log in
        </StyleButtonOnComment>
      </NavLink>
    </Box>
  ) : (
    <Box onClick={cleanListItemsHandler}>
      <NavLink to="/api/users/loginregister" style={{ textDecoration: "none" }}>
        <StyleButton
          disableRipple={true}
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

  return <React.Fragment>{buttonLeaveAComment}</React.Fragment>;
};

export default LoginButton;
