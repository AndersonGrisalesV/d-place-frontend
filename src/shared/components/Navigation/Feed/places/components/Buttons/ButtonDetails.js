import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import { Button, Stack } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

//* Styled component for NavLink
const StyleNavLink = styled(NavLink)(() => ({
  textDecoration: "none",
}));

// onPlaceId is the id of the place the user went to on ButtonsWrapper
const ButtonDetails = ({ onPlaceId }) => {
  const login = useContext(LoginContext);

  // login.listItemsNotListed cleans the leftSideBar selected menu Item to none
  const cleanListItemsHandler = () => {
    login.listItemsNotListed(onPlaceId);
  };

  return (
    <Stack
      direction="row"
      sx={{
        //* marginTop for different screen sizes
        marginTop: {
          sps: "-4px",
          ps: "-39px",
          ts: "-39px",
          sls: "-37px",
          sms: "-46px",
          sc: "-46px",
          nsc: "-46px",
          ns: "-46px",
          msc: "-46px",
          mns: "-46px",
          ms: "-46px",
          lgs: "-46px",
        },
        //* paddingLeft for different screen sizes
        paddingLeft: {
          sps: "70px",
          ps: "199px",
          ts: "266px",
          sls: "310px",
          sms: "524px",
          sc: "524px",
          nsc: "524px",
          ns: "524px",
          msc: "524px",
          mns: "524px",
          ms: "524px",
          lgs: "524px",
        },
      }}
    >
      <StyleNavLink to={`/api/places/${onPlaceId}`}>
        <StyleButton
          disableRipple={true}
          onClick={cleanListItemsHandler}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            //* fontSize for different screen sizes
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
          See details
        </StyleButton>
      </StyleNavLink>
    </Stack>
  );
};

export default ButtonDetails;
