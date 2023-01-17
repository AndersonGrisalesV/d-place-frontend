import React, { useContext } from "react";
import { Box, Fab, Grow, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LoginContext } from "../../../context/login-context";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const StyleFabButton = styled(Fab)(({ theme }) => ({
  background: "#da4453",
  color: theme.palette.mode === "dark" ? "" : "#fff",
  "&:hover": {
    background: "#da4453c7",
    color: theme.palette.mode === "dark" ? "" : "#fff",
  },
}));

const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
}));

const NewButton = ({
  menuOption,
  onResponsive = false,
  onCloseResponsiveDrawer = false,
  onToggleResponsive,
}) => {
  const login = useContext(LoginContext);
  let Button;

  const handleDrawerClose = () => {
    onToggleResponsive("left", false);
    login.listItemsNotListed("newplace");
  };

  const cleanListItemsHandler = () => {
    login.listItemsNotListed("newplace");
    // console.log(onClearListItems);
  };

  if (login.isLoggedIn && menuOption && !onResponsive) {
    Button = (
      <Zoom
        in={menuOption}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
      >
        <StyleNavLink to="/api/places/newplace">
          <StyleFabButton
            disableRipple={true}
            onClick={cleanListItemsHandler}
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
        </StyleNavLink>
      </Zoom>
    );
  } else if (login.isLoggedIn && !menuOption && !onResponsive) {
    Button = (
      <Grow
        in={true}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <NavLink to="/api/places/newplace">
          <StyleFabButton
            disableRipple={true}
            onClick={cleanListItemsHandler}
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
        </NavLink>
      </Grow>
    );
  } else if (login.isLoggedIn && !menuOption && onResponsive) {
    Button = (
      <Grow
        in={true}
        style={{ transitionDelay: menuOption ? "200ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <NavLink to="/api/places/newplace">
          <StyleFabButton
            disableRipple={true}
            onClick={onCloseResponsiveDrawer ? handleDrawerClose : null}
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
        </NavLink>
      </Grow>
    );
  }

  return <Box>{Button}</Box>;
};

export default NewButton;
