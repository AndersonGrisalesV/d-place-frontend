import React, { useState } from "react";

import ListComponent from "./components/ListComponent/ListComponent";

import NewButton from "../NewButton/NewButton";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

// mode is a boolean state to help determine the app's theme on SideBarMenuResponsive > App
// setMode is a boolean state to help change the state of  the app's theme on SideBarMenuResponsive > App
// menuOption is a boolean that indicates what sideBar is the right one to show (responsive or not responsive) on SideBarMenuResponsive > App
// onClearSearchBar is a pointer to a function that clear the searchBar on SideBarMenuResponsive > App
export default function SideBarResponsive({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  onClearSearchBar,
}) {
  const [state, setState] = useState({
    left: false,
  });

  // toggleDrawer function to toggle the state of a drawer given an anchor and open/close status
  const toggleDrawer = (anchor, open) => (event) => {
    // Check if the event type is "keydown" and if the key pressed is "Tab" or "Shift"
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // Update the state with the new open/close status for the given anchor
    setState({ ...state, [anchor]: open });
  };

  // toggleResponsiveDrawer function to toggle the state of a responsive drawer given an anchor and open/close status
  const toggleResponsiveDrawer = (anchor, open) => {
    // Update the state with the new open/close status for the given anchor
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
