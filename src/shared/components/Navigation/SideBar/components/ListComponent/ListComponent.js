import React from "react";
import List from "@mui/material/List";
import ListItems from "./ListItems/ListItems";

const ListComponent = ({
  mode,
  setMode,
  onCloseResponsiveDrawer,
  onToggleResponsive,
  onClearSearchBar,
  clearSelectedItem,
  onCleanStateSelectedItem,
}) => {
  return (
    <List sx={{ padding: "0px", paddingTop: "12px" }}>
      <ListItems
        mode={mode}
        setMode={setMode}
        onCloseResponsiveDrawer={onCloseResponsiveDrawer}
        onToggleResponsive={onToggleResponsive}
        onClearSearchBar={onClearSearchBar}
        clearSelectedItem={clearSelectedItem}
        onCleanStateSelectedItem={onCleanStateSelectedItem}
      />
    </List>
  );
};

export default ListComponent;
