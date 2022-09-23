import { Box } from "@mui/material";
import React from "react";
import styles from "./FavoritesButton.module.css";

const FavoritesButton = () => {
  return (
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
      <button className={styles["glow-on-hover"]}>Favorites</button>
    </Box>
  );
};

export default FavoritesButton;
