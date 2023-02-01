import React, { useState } from "react";

import ListComponent from "./components/ListComponent/ListComponent";

import NewButton from "../NewButton/NewButton";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemButton } from "@mui/material";
import styled from "@emotion/styled";

const StyleListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    borderRadius: "222px",
    backgroundColor: theme.palette.mode === "dark" ? "" : "",
  },
}));

export default function SideBarResponsive({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  menuOption,
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
      {/* <StyleListItemButton
        size="medium"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, backgroundColor: "transparent" }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon sx={{ backgroundColor: "transparent" }} />
      </StyleListItemButton> */}
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
