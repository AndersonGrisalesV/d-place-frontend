import React, { useContext, useState } from "react";
import ListItem from "@mui/material/ListItem";
import {
  Grow,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  Logout,
  ModeNight,
  SettingsOutlined,
} from "@mui/icons-material";
import ModeSwitch from "../../ModeSwitch/ModeSwitch";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../../context/login-context";
import classes from "./ListItems.module.css";
import styled from "@emotion/styled/macro";

const StyleHomeIcon = styled(HomeOutlined)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleFavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleAccountCircleIcon = styled(AccountCircleOutlined)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleSettingsIcon = styled(SettingsOutlined)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleLogoutIcon = styled(Logout)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const StyleListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#000000",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const StyleListItems = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleHomeIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleFavoriteIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleAccountCircleIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleSettingsIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleLogoutIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.mode === "dark" ? "#fff" : "#000000",
  "&.active": {
    backgroundColor: "#00000",
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "black",
    },
  },
}));

const ListItems = ({
  mode,
  setMode,
  onCloseResponsiveDrawer = false,
  onToggleResponsive,
}) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    onToggleResponsive("left", false);
  };

  const handleLogout = () => {
    login.logout();
    onToggleResponsive("left", false);
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ backgroundColor: "transparent" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{ backgroundColor: "transparent" }}>
        <ListItemButton
          component="ul"
          href="#simple-list"
          style={{ backgroundColor: "transparent" }}
        >
          <ListItemIcon style={{ backgroundColor: "transparent" }}>
            <ModeNight />
          </ListItemIcon>
          <ModeSwitch mode={mode} setMode={setMode} />
        </ListItemButton>
      </MenuItem>
    </Menu>
  );

  const handleDrawerClose = () => {
    onToggleResponsive("left", false);
  };

  return (
    <>
      <Grow
        in={true}
        style={{ transitionDelay: true ? "100ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <StyleListItems disablePadding component={StyleNavLink} to="/homepage">
          <ListItemButton
            component="ul"
            href="/homepage"
            onClick={onCloseResponsiveDrawer ? handleDrawerClose : null}
          >
            <ListItemIcon>
              <StyleHomeIcon />
            </ListItemIcon>
            <StyleListItemText primary="Homepage" />
          </ListItemButton>
        </StyleListItems>
      </Grow>

      {!login.isLoggedIn ? (
        <Grow
          in={true}
          style={{ transitionDelay: true ? "100ms" : "0ms" }}
          {...(true ? { timeout: 500 } : {})}
        >
          <StyleListItems disablePadding>
            <ListItemButton component="div" onClick={handleProfileMenuOpen}>
              <ListItemIcon>
                <StyleSettingsIcon />
              </ListItemIcon>
              <StyleListItemText primary="Settings" />
            </ListItemButton>
          </StyleListItems>
        </Grow>
      ) : (
        ""
      )}

      {login.isLoggedIn ? (
        <React.Fragment>
          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItems
              disablePadding
              component={StyleNavLink}
              to="/api/users/favorites"
              // className={(navData) => (navData.isActive ? classes.active : "")}
            >
              <ListItemButton
                component="li"
                href="/api/users/favorites"
                onClick={onCloseResponsiveDrawer ? handleDrawerClose : null}
              >
                <ListItemIcon>
                  <StyleFavoriteIcon />
                </ListItemIcon>

                <StyleListItemText primary="Favorites" />
              </ListItemButton>
            </StyleListItems>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItems
              disablePadding
              component={StyleNavLink}
              to="/api/users/profile"
            >
              <ListItemButton
                component="li"
                href="/api/users/profile"
                onClick={onCloseResponsiveDrawer ? handleDrawerClose : null}
              >
                <ListItemIcon>
                  <StyleAccountCircleIcon />
                </ListItemIcon>
                <StyleListItemText primary="Profile" />
              </ListItemButton>
            </StyleListItems>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItems disablePadding>
              <ListItemButton component="ul" onClick={handleProfileMenuOpen}>
                <ListItemIcon>
                  <StyleSettingsIcon />
                </ListItemIcon>
                <StyleListItemText primary="Settings" />
              </ListItemButton>
            </StyleListItems>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItems disablePadding>
              <ListItemButton
                component="ul"
                href="/logout"
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <StyleLogoutIcon />
                </ListItemIcon>
                <StyleListItemText primary="Logout" />
              </ListItemButton>
            </StyleListItems>
          </Grow>
        </React.Fragment>
      ) : (
        ""
      )}
      {renderMenu}
    </>
  );
};

export default ListItems;
