import React from "react";
import Box from "@mui/material/Box";
import DrawerComponent from "./components/Drawer/DrawerComponent";

const SideBar = ({
  mode,
  setMode,
  menuOption = true,
  onClearSearchBar,
  clearSelectedItem,
  onCleanStateSelectedItem,
}) => {
  return (
    <Box
      flex={1}
      sx={{
        padding: "5px",
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
          clearSelectedItem={clearSelectedItem}
          onCleanStateSelectedItem={onCleanStateSelectedItem}
        ></DrawerComponent>
      </Box>
    </Box>
  );
};

export default SideBar;
