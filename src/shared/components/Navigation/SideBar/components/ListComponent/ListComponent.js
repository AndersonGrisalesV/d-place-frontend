import React from "react";
import List from "@mui/material/List";
import ListItems from "./ListItems/ListItems";

const ListComponent = ({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  onToggleResponsive,
}) => {
  return (
    <List sx={{ padding: "0px", paddingTop: "12px" }}>
      <ListItems
        mode={mode}
        setMode={setMode}
        onCloseResponsiveDrawer={onCloseResponsiveDrawer}
        onToggleResponsive={onToggleResponsive}
      />
    </List>
  );
};

export default ListComponent;
