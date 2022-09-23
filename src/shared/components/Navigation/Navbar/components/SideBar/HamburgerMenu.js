import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const HamburgerMenu = (props) => {
  return (
    <Box
      sx={{
        display: {
          sps: "none",
          ps: "none",
          ts: "none",
          sls: "none",
          sms: "none",
          sc: "none",
          nsc: "none",
          ns: "flex",
          msc: "flex",
          mns: "flex",
          ms: "flex",
          lgs: "flex",
        },
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={props.onOption}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default HamburgerMenu;
