import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppName from "./components/SideBar/AppName";
import HamburgerMenu from "./components/SideBar/HamburgerMenu";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchBarResponsive from "./components/SearchBar/SearchBarResponsive";
import AccountMenu from "./components/RightBar/AccountMenu/AccountMenu";
import AccountMenuMobile from "./components/RightBar/AccountMenu/AccountMenuMobile";
import SideBarMenuResponsive from "./components/SideBar/SideBarMenuResponsive";
import FavoritesButton from "./components/RightBar/FavoritesButton/FavoritesButton";
import LoginButton from "./components/RightBar/LoginButtons/LoginButton";
import NotificationsButton from "./components/RightBar/NotificationsButton/NotificationsButton";
import { Box } from "@mui/material";
import styles from "./NavigationBar.module.css";

const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export default function NavigationBar(props) {
  let isLoggedIn = true;

  return (
    <AppBar
      position="sticky"
      className={props.mode === "light" ? styles.coloredAppBar : ""}
    >
      <StyleToolbar>
        <HamburgerMenu onOption={props.onOption} />

        <AppName />

        <SearchBar />

        {isLoggedIn ? (
          <React.Fragment>
            <FavoritesButton />
            <NotificationsButton onResponsive={false} />
            <AccountMenu />
          </React.Fragment>
        ) : (
          <Box
            sx={{
              display: {
                sps: "none",
                ps: "none",
                ts: "none",
                sls: "none",
                sms: "none",
                sc: "none",
                nsc: "none",
                ns: "flex",
                msc: "flex",
                mns: "flex",
                ms: "flex",
                lgs: "flex",
              },
            }}
          >
            <LoginButton />
          </Box>
        )}

        <SideBarMenuResponsive setMode={props.setMode} mode={props.mode} />

        <SearchBarResponsive />

        <AccountMenuMobile />
      </StyleToolbar>
    </AppBar>
  );
}
