import React, { useState } from "react";

import ListComponent from "./components/ListComponent/ListComponent";

import NewButton from "../NewButton/NewButton";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

export default function SideBarResponsive({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  onClearSearchBar,
}) {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const toggleResponsiveDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{ width: 214 }}
      role="presentation"
      onKeyDown={toggleDrawer("left", false)}
    >
      <ListComponent
        mode={mode}
        setMode={setMode}
        onCloseResponsiveDrawer={onCloseResponsiveDrawer}
        onToggleResponsive={toggleResponsiveDrawer}
        onClearSearchBar={onClearSearchBar}
      />
      <NewButton
        onResponsive={true}
        onCloseResponsiveDrawer={onCloseResponsiveDrawer}
        onToggleResponsive={toggleResponsiveDrawer}
      />
    </Box>
  );

  return (
    <React.Fragment key={"left"}>
      <MenuIcon
        sx={{ backgroundColor: "transparent" }}
        onClick={toggleDrawer("left", true)}
      />

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
