import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Button, Stack } from "@mui/material";

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

const ButtonDetails = ({ onPlaceId }) => {
  const login = useContext(LoginContext);

  const cleanListItemsHandler = () => {
    login.listItemsNotListed(onPlaceId);
    // console.log(onClearListItems);
  };

  return (
    <Stack
      direction="row"
      sx={{
        paddingLeft: {
          sps: "139px",
          ps: "78px",
          ts: "136px",
          sls: "174px",
          sms: "371px",
          sc: "371px",
          nsc: "371px",
          ns: "371px",
          msc: "371px",
          mns: "371px",
          ms: "371px",
          lgs: "371px",
        },
      }}
    >
      <StyleNavLink to={`/api/places/${onPlaceId}`}>
        <StyleButton
          onClick={cleanListItemsHandler}
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
          }}
        >
          See details
        </StyleButton>
      </StyleNavLink>
    </Stack>
  );
};

export default ButtonDetails;
