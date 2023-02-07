import React from "react";

import DrawerHeaderComponent from "./DrawerHeaderComponent";
import ListComponent from "../ListComponent/ListComponent";

import NewButton from "../../../NewButton/NewButton";

import MuiDrawer from "@mui/material/Drawer";
import styled from "@emotion/styled";

const drawerWidth = 214;

//* Component configuration for openedMixin
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
//* Component configuration for closedMixin
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
//* Styled component for MuiDrawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerComponent = ({ mode, setMode, menuOption, onClearSearchBar }) => {
  return (
    <Drawer variant="permanent" open={menuOption}>
      <DrawerHeaderComponent />
      <ListComponent
        mode={mode}
        setMode={setMode}
        onClearSearchBar={onClearSearchBar}
      />
      <NewButton menuOption={menuOption} />
    </Drawer>
  );
};

export default DrawerComponent;
