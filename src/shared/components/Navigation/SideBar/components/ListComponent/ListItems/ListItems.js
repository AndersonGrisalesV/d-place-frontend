import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import {
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
import styled from "@emotion/styled/macro";
import { NavLink } from "react-router-dom";
import classes from "./ListItems.module.css";

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

const ListItems = ({ mode, setMode }) => {
  let isLoggedIn = true;

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <>
      <StyleListItems disablePadding component={StyleNavLink} to="/">
        <ListItemButton component="ul" href="/">
          <ListItemIcon>
            <StyleHomeIcon />
          </ListItemIcon>
          <StyleListItemText primary="Homepage" />
        </ListItemButton>
      </StyleListItems>

      {!isLoggedIn ? (
        <StyleListItems disablePadding>
          <ListItemButton component="li" onClick={handleProfileMenuOpen}>
            <ListItemIcon>
              <StyleSettingsIcon />
            </ListItemIcon>
            <StyleListItemText primary="Settings" />
          </ListItemButton>
        </StyleListItems>
      ) : (
        ""
      )}

      {isLoggedIn ? (
        <React.Fragment>
          <StyleListItems
            disablePadding
            component={StyleNavLink}
            to="/favorites"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <ListItemButton component="li" href="/favorites">
              <ListItemIcon>
                <StyleFavoriteIcon />
              </ListItemIcon>

              <StyleListItemText primary="Favorites" />
            </ListItemButton>
          </StyleListItems>

          <StyleListItems disablePadding component={StyleNavLink} to="/profile">
            <ListItemButton component="li" href="/profile">
              <ListItemIcon>
                <StyleAccountCircleIcon />
              </ListItemIcon>
              <StyleListItemText primary="Profile" />
            </ListItemButton>
          </StyleListItems>

          <StyleListItems disablePadding>
            <ListItemButton component="ul" onClick={handleProfileMenuOpen}>
              <ListItemIcon>
                <StyleSettingsIcon />
              </ListItemIcon>
              <StyleListItemText primary="Settings" />
            </ListItemButton>
          </StyleListItems>

          <StyleListItems disablePadding>
            <ListItemButton component="ul" href="#logout">
              <ListItemIcon>
                <StyleLogoutIcon />
              </ListItemIcon>
              <StyleListItemText primary="Logout" />
            </ListItemButton>
          </StyleListItems>
        </React.Fragment>
      ) : (
        ""
      )}
      {renderMenu}
    </>
  );
};

export default ListItems;
