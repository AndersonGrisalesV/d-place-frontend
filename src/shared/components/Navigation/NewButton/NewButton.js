import React, { useContext } from "react";
import { Box, Fab, Grow, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { LoginContext } from "../../../context/login-context";

const StyleFabButton = styled(Fab)(({ theme }) => ({
  background: "#da4453",
  color: theme.palette.mode === "dark" ? "" : "#fff",
  "&:hover": {
    background: "#da4453c7",
    color: theme.palette.mode === "dark" ? "" : "#fff",
  },
}));

const NewButton = ({ menuOption, onResponsive = false }) => {
  const login = useContext(LoginContext);
  let Button;

  if (login.isLoggedIn && menuOption && !onResponsive) {
    Button = (
      <Zoom
        in={menuOption}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
      >
        <StyleFabButton
          sx={{
            color: "#fff",
            background: "#da4453",
            marginLeft: "141px",
            marginTop: "136px",
          }}
          size="medium"
          aria-label="add"
        >
          <AddIcon />
        </StyleFabButton>
      </Zoom>
    );
  } else if (login.isLoggedIn && !menuOption && !onResponsive) {
    Button = (
      <Grow
        in={true}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <StyleFabButton
          sx={{
            color: "#fff",
            background: "#da4453",
            marginLeft: "4.3px",
            marginTop: "136px",
          }}
          size="medium"
          aria-label="add"
        >
          <AddIcon />
        </StyleFabButton>
      </Grow>
    );
  } else if (login.isLoggedIn && !menuOption && onResponsive) {
    Button = (
      <Grow
        in={true}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <StyleFabButton
          sx={{
            color: "#fff",
            background: "#da4453",
            marginLeft: "74.7px",
            marginTop: "8px",
          }}
          size="medium"
          aria-label="add"
        >
          <AddIcon />
        </StyleFabButton>
      </Grow>
    );
  }

  return <Box>{Button}</Box>;
};

export default NewButton;
