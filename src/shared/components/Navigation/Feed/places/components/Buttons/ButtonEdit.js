import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import { Button, Zoom } from "@mui/material";
import styled from "@emotion/styled";

import { LoginContext } from "../../../../../../context/login-context";

const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
}));

const ButtonEdit = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);

  let isEdit = false;
  let placeId;

  if (login.isLoggedIn && loadedPlaces.creatorId._id === login.userId) {
    console.log(loadedPlaces);
    loadedPlaces.creatorId.places.map((samePlace) => {
      console.log(samePlace);
      if (samePlace === loadedPlaces._id) {
        placeId = loadedPlaces._id;
        return (isEdit = true);
      }
      placeId = "";
      return (isEdit = false);
    });
  }

  // /api/places/editplace/:placeId"
  return (
    <React.Fragment>
      {login.isLoggedIn && isEdit && (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <StyleNavLink to={`/api/places/editplace/${loadedPlaces._id}`}>
            <StyleButton
              sx={{
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
