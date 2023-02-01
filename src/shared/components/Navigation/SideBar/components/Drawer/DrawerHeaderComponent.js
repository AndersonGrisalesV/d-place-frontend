import React from "react";

import { IconButton } from "@mui/material";
import styled from "@emotion/styled";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeaderComponent = ({ menuOption }) => {
  const handleDrawerClose = () => {
    menuOption = false;
  };
  return (
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose} />
    </DrawerHeader>
  );
};

export default DrawerHeaderComponent;
