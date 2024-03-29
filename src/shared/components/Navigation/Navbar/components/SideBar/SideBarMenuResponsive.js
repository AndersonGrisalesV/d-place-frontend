import React from "react";

import SideBarResponsive from "../../../SideBar/SideBarResponsive";

import { Box, IconButton } from "@mui/material";

const SideBarMenuResponsive = (props) => {
  return (
    <Box
      sx={{
        //* display for different screen sizes
        display: {
          sps: "flex",
          ps: "flex",
          ts: "flex",
          sls: "flex",
          sms: "flex",
          sc: "flex",
          nsc: "flex",
          ns: "none",
          msc: "none",
          mns: "none",
          ms: "none",
          lgs: "none",
        },
      }}
    >
      <IconButton
        disableRipple={true}
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        style={{ backgroundColor: "transparent" }}
        sx={{ mr: 2 }}
      >
        <SideBarResponsive
          setMode={props.setMode}
          mode={props.mode}
          onCloseResponsiveDrawer={props.onCloseResponsiveDrawer}
          onClearSearchBar={props.onClearSearchBar}
        />
      </IconButton>
    </Box>
  );
};

export default SideBarMenuResponsive;
