import React from "react";

import List from "@mui/material/List";
import ListItems from "./ListItems/ListItems";

// mode is a boolean state to help determine the app's theme on SideBar > App
// setMode is a boolean state to help change the state of  the app's theme on SideBar > App
//* onCloseResponsiveDrawer is boolean that indicates if a responsive drawer is open in order for this said open drawer to be close using the onToggleResponsive function on SideBarResponsive
//* onToggleResponsive is a pointer to a funciton that closes the responsive drawer on SideBarResponsive
// onClearSearchBar is a pointer to a function that clear the searchBar on SideBar > App
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
