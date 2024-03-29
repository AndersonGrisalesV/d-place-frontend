import React from "react";

import DrawerComponent from "./components/Drawer/DrawerComponent";

import Box from "@mui/material/Box";

// mode is a boolean state to help determine the app's theme on  App
// setMode is a boolean state to help change the state of  the app's theme on App
// menuOption is a boolean that indicates what sideBar is the right one to show (responsive or not responsive) on App
// onClearSearchBar is a pointer to a function that clear the searchBar on App
const SideBar = ({ mode, setMode, menuOption = true, onClearSearchBar }) => {
  return (
    <Box
      flex={1}
      sx={{
        padding: "5px",
        //* display for different screen sizes
        display: {
          sps: "none",
          ps: "none",
          ts: "none",
          sls: "none",
          sms: "none",
          sc: "none",
          nsc: "none",
          ns: "block",
          msc: "block",
          mns: "block",
          ms: "block",
          lgs: "block",
        },
        bgcolor: "background.main",
      }}
    >
      <Box position="fixed">
        <DrawerComponent
          mode={mode}
          setMode={setMode}
          menuOption={menuOption}
          onClearSearchBar={onClearSearchBar}
        />
      </Box>
    </Box>
  );
};

export default SideBar;
