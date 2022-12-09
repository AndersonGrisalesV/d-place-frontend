import React from "react";
import styled from "@emotion/styled";
import MuiDrawer from "@mui/material/Drawer";
import DrawerHeaderComponent from "./DrawerHeaderComponent";
import ListComponent from "../ListComponent/ListComponent";
import NewButton from "../../../NewButton/NewButton";

const drawerWidth = 214;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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

const DrawerComponent = ({
  mode,
  setMode,
  menuOption,
  onClearSearchBar,
  clearSelectedItem,
  onCleanStateSelectedItem,
}) => {
  return (
    <Drawer variant="permanent" open={menuOption}>
      <DrawerHeaderComponent menuOption={menuOption} />
      <ListComponent
        mode={mode}
        setMode={setMode}
        onClearSearchBar={onClearSearchBar}
        clearSelectedItem={clearSelectedItem}
        onCleanStateSelectedItem={onCleanStateSelectedItem}
      />
      <NewButton menuOption={menuOption} />
    </Drawer>
  );
};

export default DrawerComponent;
