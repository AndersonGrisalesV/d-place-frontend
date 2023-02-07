import React, { useContext, useState } from "react";

import { LoginContext } from "../../../context/login-context";

import SearchBar from "./components/SearchBar/SearchBar";
import AppName from "./components/SideBar/AppName";
import HamburgerMenu from "./components/SideBar/HamburgerMenu";
import SideBarMenuResponsive from "./components/SideBar/SideBarMenuResponsive";
import AccountMenu from "./components/RightBar/AccountMenu/AccountMenu";
import AccountMenuMobile from "./components/RightBar/AccountMenu/AccountMenuMobile";

import FavoritesButton from "./components/RightBar/FavoritesButton/FavoritesButton";
import LoginButton from "./components/RightBar/LoginButtons/LoginButton";
import NotificationsButton from "./components/RightBar/NotificationsButton/NotificationsButton";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Grow } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./NavigationBar.module.css";

//* Styled component for Toolbar
const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export default function NavigationBar(props) {
  const login = useContext(LoginContext);

  const [updateNotification, setUpdateNotification] = useState(false);

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
              <NotificationsButton
                onResponsive={false}
                setUpdateNotification={setUpdateNotification}
                updateNotification={updateNotification}
              />
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
                  //* display for different screen sizes
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

          <AccountMenuMobile
            onClearSearchBar={props.onClearSearchBar}
            setUpdateNotification={setUpdateNotification}
            updateNotification={updateNotification}
          />
        </StyleToolbar>
      </AppBar>
    </Grow>
  );
}
