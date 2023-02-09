import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../context/login-context";

import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grow, Zoom } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for Fab
const StyleFabButton = styled(Fab)(({ theme }) => ({
  background: "#da4453",
  color: theme.palette.mode === "dark" ? "" : "#fff",
  "&:hover": {
    background: "#da4453c7",
    color: theme.palette.mode === "dark" ? "" : "#fff",
  },
}));
//* Styled component for NavLink
const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
}));

//* menuOption is a boolean that indicates what sideBar is the right one to show (responsive or not responsive) on App
//* onResponsive is a boolean that indicates if a small screen sized is accesing in order to display correctly the SideBarResponsive features on SideBarResponsive
//* onCloseResponsiveDrawer is boolean that indicates if a responsive drawer is open in order for this said open drawer to be close using the onToggleResponsive function on NavigationBar
//* onToggleResponsive is a pointer to a funciton that closes the responsive drawer on SideBarResponsive
const NewButton = ({
  menuOption,
  onResponsive = false,
  onCloseResponsiveDrawer = false,
  onToggleResponsive,
}) => {
  const login = useContext(LoginContext);
  let Button;

  // handleDrawerClose function to toggle the resposiveMenue and login.listItemsNotListed cleans the leftSideBar selected menu Item to none
  const handleDrawerClose = () => {
    onToggleResponsive("left", false);
    login.listItemsNotListed("newplace");
  };

  // cleanListItemsHandler functio to cleans the leftSideBar selected menu Item to none using login.listItemsNotListed
  const cleanListItemsHandler = () => {
    login.listItemsNotListed("newplace");
  };

  // Chooses the right button to display depending on the menu and responsive props

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
