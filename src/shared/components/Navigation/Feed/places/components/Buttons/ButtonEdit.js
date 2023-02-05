import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import { Button, Zoom } from "@mui/material";
import styled from "@emotion/styled";

// Styled component for Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// Styled component for NavLink
const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
}));

// loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
// Button edit is on ButtonsWrapper
const ButtonEdit = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);

  // login.listItemsNotListed cleans the leftSideBar selected menu Item to none
  const cleanListItemsHandler = () => {
    login.listItemsNotListed(loadedPlaces._id);
  };

  return (
    <React.Fragment>
      {login.isLoggedIn && (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <StyleNavLink to={`/api/places/editplace/${loadedPlaces._id}`}>
            <StyleButton
              disableRipple={true}
              onClick={cleanListItemsHandler}
              sx={{
                // marginTop correction for size sps
                marginTop: {
                  sps: "10px",
                },
                fontWeight: 500,
                textTransform: "none",
                // fontSize for different screen sizes
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
                // marginRight for different screen sizes
                marginRight: {
                  sps: "-2px",
                  ps: "-1px",
                  ts: "-2px",
                  sls: "-3px",
                  sms: "-2px",
                  sc: "-2px",
                  nsc: "-2px",
                  ns: "-2px",
                  msc: "-2px",
                  mns: "-2px",
                  ms: "-2px",
                  lgs: "-2px",
                },
              }}
            >
              Edit
            </StyleButton>
          </StyleNavLink>
        </Zoom>
      )}
    </React.Fragment>
  );
};

export default ButtonEdit;
