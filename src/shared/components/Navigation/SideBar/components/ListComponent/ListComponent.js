import React from "react";
import List from "@mui/material/List";
import ListItems from "./ListItems/ListItems";

const ListComponent = ({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  onToggleResponsive,
  onClearSearchBar,
}) => {
  return (
    <List sx={{ padding: "0px", paddingTop: "12px" }}>
      <ListItems
        mode={mode}
        setMode={setMode}
        onCloseResponsiveDrawer={onCloseResponsiveDrawer}
        onToggleResponsive={onToggleResponsive}
        onClearSearchBar={onClearSearchBar}
      />
    </List>
  );
};

export default ListComponent;
