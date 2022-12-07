import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppName from "./components/SideBar/AppName";
import HamburgerMenu from "./components/SideBar/HamburgerMenu";
import SearchBar from "./components/SearchBar/SearchBar";

import AccountMenu from "./components/RightBar/AccountMenu/AccountMenu";
import AccountMenuMobile from "./components/RightBar/AccountMenu/AccountMenuMobile";
import SideBarMenuResponsive from "./components/SideBar/SideBarMenuResponsive";
import FavoritesButton from "./components/RightBar/FavoritesButton/FavoritesButton";
import LoginButton from "./components/RightBar/LoginButtons/LoginButton";
import NotificationsButton from "./components/RightBar/NotificationsButton/NotificationsButton";
import { Box, Grow } from "@mui/material";
import { LoginContext } from "../../../context/login-context";
import styles from "./NavigationBar.module.css";

const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export default function NavigationBar(props) {
  const login = useContext(LoginContext);

  return (
    <Grow
      in={true}
      style={{ transitionDelay: true ? "100ms" : "0ms" }}
      {...(true ? { timeout: 500 } : {})}
    >
      <AppBar
        position="sticky"
        className={props.mode === "light" ? styles.coloredAppBar : ""}
      >
        <StyleToolbar>
          <HamburgerMenu onOption={props.onOption} />

          <AppName />

          <SideBarMenuResponsive
            setMode={props.setMode}
            mode={props.mode}
            onCloseResponsiveDrawer={true}
            onClearSearchBar={props.onClearSearchBar}
          />

          {login.isLoggedIn ? (
            <React.Fragment>
              <SearchBar
                onSearch={props.onSearch}
                onClear={props.onClear}
                onShowCloseButton={props.onShowCloseButton}
              />

              <FavoritesButton />
              <NotificationsButton onResponsive={false} />
              <AccountMenu onClearSearchBar={props.onClearSearchBar} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SearchBar
                onSearch={props.onSearch}
                onClear={props.onClear}
                onShowCloseButton={props.onShowCloseButton}
              />

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
            </React.Fragment>
          )}

          <AccountMenuMobile onClearSearchBar={props.onClearSearchBar} />
        </StyleToolbar>
      </AppBar>
    </Grow>
  );
}
