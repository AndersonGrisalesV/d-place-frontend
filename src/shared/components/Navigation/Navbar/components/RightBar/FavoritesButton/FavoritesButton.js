import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import { Box, Zoom } from "@mui/material";
import styles from "./FavoritesButton.module.css";

const FavoritesButton = () => {
  const login = useContext(LoginContext);

  const cleanListItemsHandler = () => {
    login.listItemsNotListed(login.userId);
    // console.log(onClearListItems);
  };

  return (
    <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
      <Box
        sx={{
          marginTop: "-5.8px",
          paddingTop: "4px",
          display: {
            sps: "none",
            ps: "none",
            ts: "none",
            sls: "none",
            sms: "none",
            sc: "none",
            nsc: "none",
            ns: "flex",
            ms: "flex",
            lgs: "flex",
          },
        }}
      >
        <NavLink
          to={`/api/users/favorites/${login.userId}`}
          onClick={cleanListItemsHandler}
        >
          <button className={styles["glow-on-hover"]}>Favorites</button>
        </NavLink>
      </Box>
    </Zoom>
  );
};

export default FavoritesButton;
