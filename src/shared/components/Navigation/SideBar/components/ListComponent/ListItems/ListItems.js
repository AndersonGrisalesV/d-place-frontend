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
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleListItemIcon = styled(ListItem)(({ theme }) => ({
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
          component="a"
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
      <StyleListItemIcon disablePadding>
        <ListItemButton component="a" href="#home">
          <ListItemIcon>
            <StyleHomeIcon />
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItemButton>
      </StyleListItemIcon>

      {!isLoggedIn ? (
        <StyleListItemIcon disablePadding>
          <ListItemButton
            component="a"
            href="#settings"
            onClick={handleProfileMenuOpen}
          >
            <ListItemIcon>
              <StyleSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </StyleListItemIcon>
      ) : (
        ""
      )}

      {isLoggedIn ? (
        <React.Fragment>
          <StyleListItemIcon disablePadding>
            <ListItemButton component="a" href="#favorites">
              <ListItemIcon>
                <StyleFavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItemButton>
          </StyleListItemIcon>

          <StyleListItemIcon disablePadding>
            <ListItemButton component="a" href="#profile">
              <ListItemIcon>
                <StyleAccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </StyleListItemIcon>

          <StyleListItemIcon disablePadding>
            <ListItemButton
              component="a"
              href="#settings"
              onClick={handleProfileMenuOpen}
            >
              <ListItemIcon>
                <StyleSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </StyleListItemIcon>

          <StyleListItemIcon disablePadding>
            <ListItemButton component="a" href="#logout">
              <ListItemIcon>
                <StyleLogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </StyleListItemIcon>
        </React.Fragment>
      ) : (
        ""
      )}
      {renderMenu}
    </>
  );
};

export default ListItems;
