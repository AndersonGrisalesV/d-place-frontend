import React from "react";

import styled from "@emotion/styled";

//* Styled component for DrawerHeader
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeaderComponent = () => {
  return <DrawerHeader />;
};

export default DrawerHeaderComponent;
