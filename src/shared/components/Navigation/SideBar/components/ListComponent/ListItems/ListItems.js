import React, { useContext, useEffect, useRef, useState } from "react";
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../../context/login-context";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import styled from "@emotion/styled/macro";

const StyleHomeIcon = styled(HomeOutlined)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleFavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleAccountCircleIcon = styled(AccountCircleOutlined)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleSettingsIcon = styled(SettingsOutlined)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

const StyleLogoutIcon = styled(Logout)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const StyleMyplacesIcon = styled(CollectionsOutlinedIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0.6,
  color: theme.palette.mode === "dark" ? "" : "#00000091",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const StyleListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "" : "#000000de",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const StyleListItemsHomepage = styled(ListItem)(({ theme }) => ({
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
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleHomeIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const StyleListItemsFavorites = styled(ListItem)(({ theme }) => ({
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
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleFavoriteIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const StyleListItemsMyPlaces = styled(ListItem)(({ theme }) => ({
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
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const StyleListItemsProfile = styled(ListItem)(({ theme }) => ({
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
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleAccountCircleIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const StyleListItemsSettings = styled(ListItem)(({ theme }) => ({
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
    [`${StyleMyplacesIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${StyleSettingsIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${StyleListItemText}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
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
    [`${StyleMyplacesIcon}`]: {
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
  onToggleResponsive = null,
  onClearSearchBar,
}) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  const { pathname } = useLocation();
  const str = pathname;
  const parts = str.split("/");
  const id = parts[3];

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const [settingsSelectedItem, setSettingsSelecteditem] = useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setSettingsSelecteditem(5);
  };

  const handleMenuClose = () => {
    setSettingsSelecteditem(0);
    setAnchorEl(null);
    if (onToggleResponsive) {
      onToggleResponsive("left", false);
    }
  };

  const handleLogout = () => {
    navigate("/api/homepage");

    setAnchorEl(null);
    login.logout();
    window.location.reload();
    onClearSearchBar();
    if (onToggleResponsive) {
      onToggleResponsive("left", false);
    }
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
      <MenuItem style={{ backgroundColor: "transparent" }} disableRipple={true}>
        <ListItemButton
          disableRipple={true}
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
    setAnchorEl(null);
    if (onToggleResponsive) {
      onToggleResponsive("left", false);
    }
    handleClear();
  };

  const handleClear = () => {
    onClearSearchBar();
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clearListItem, setClearListItem] = useState(false);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/api/homepage":
        setSelectedIndex(0);
        break;
      case `/api/users/favorites/${login.userId}`: //here we use pidCleanListItems instead oflogin.userId because there is a conflict between favorites and profile
        setSelectedIndex(1);
        break;
      case `/api/users/myplaces/${login.userId}`:
        setSelectedIndex(2);
        break;
      case `/api/users/profile/${login.userId}`:
        setSelectedIndex(3);
        break;
      case `/api/places/editplace/${login.pidCleanListItems}`:
        alert(window.location.pathname);
        // login.listItemsNotListed(login.pidCleanListItems);
        setSelectedIndex(4);
        setClearListItem(false);
        break;
      case `/api/places/${login.userId}`:
        // login.listItemsNotListed(login.pidCleanListItems);
        setSelectedIndex(4);
        setClearListItem(false);
        break;
      case "/api/places/newplace":
        setSelectedIndex(4);
        setClearListItem(false);
        break;
      case `/api/users/loginregister`:
        setSelectedIndex(6);
        break;
      // case `/api/places/places/${login.pidCleanListItems}`:
      //   setClearListItem(true);
      //   break;
      default:
        setSelectedIndex(4);
        setClearListItem(false);
        setSettingsSelecteditem(0);
        break;
    }
  }, [
    login.userId,
    login.pidCleanListItems,
    login.clearListItems,
    login.homepageListItems,
    login,
  ]);

  const activeStateHandler = (e, index) => {
    setClearListItem(false);
    login.listItemsCleanListed();

    if (index === undefined) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index);
    }
  };
  const homepageButton = useRef(null);

  return (
    <>
      <Grow
        in={true}
        style={{ transitionDelay: true ? "100ms" : "0ms" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <StyleListItemsHomepage
          ref={homepageButton}
          disablePadding
          component={StyleNavLink}
          to="/api/homepage"
          selected={selectedIndex === 0 && !clearListItem ? true : null}
          onClick={(e) => activeStateHandler(e, 0)}
        >
          <ListItemButton
            disableRipple={true}
            component="ul"
            href="api//homepage"
            onClick={onCloseResponsiveDrawer ? handleDrawerClose : handleClear}
          >
            <ListItemIcon>
              <StyleHomeIcon />
            </ListItemIcon>
            <StyleListItemText primary="Homepage" />
          </ListItemButton>
        </StyleListItemsHomepage>
      </Grow>

      {!login.isLoggedIn ? (
        <Grow
          in={true}
          style={{ transitionDelay: true ? "100ms" : "0ms" }}
          {...(true ? { timeout: 500 } : {})}
        >
          <StyleListItemsSettings
            disablePadding
            selected={selectedIndex === 5 ? true : null}
          >
            <ListItemButton
              component="div"
              onClick={handleProfileMenuOpen}
              disableRipple={true}
            >
              <ListItemIcon>
                <StyleSettingsIcon />
              </ListItemIcon>
              <StyleListItemText primary="Settings" />
            </ListItemButton>
          </StyleListItemsSettings>
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
            <StyleListItemsFavorites
              disablePadding
              component={StyleNavLink}
              to={`/api/users/favorites/${login.userId}`}
              selected={selectedIndex === 1 ? true : null}
              onClick={(e) => activeStateHandler(e, 1)}
            >
              <ListItemButton
                disableRipple={true}
                component="li"
                href={`/api/users/favorites/${login.userId}`}
                onClick={
                  onCloseResponsiveDrawer ? handleDrawerClose : handleClear
                }
              >
                <ListItemIcon>
                  <StyleFavoriteIcon />
                </ListItemIcon>

                <StyleListItemText primary="Favorites" />
              </ListItemButton>
            </StyleListItemsFavorites>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItemsMyPlaces
              disablePadding
              component={StyleNavLink}
              to={`/api/users/myplaces/${login.userId}`}
              selected={selectedIndex === 2 && !clearListItem ? true : null}
              onClick={(e) => activeStateHandler(e, 2)}
            >
              <ListItemButton
                disableRipple={true}
                component="li"
                href={`/api/users/myplaces/${login.userId}`}
                onClick={
                  onCloseResponsiveDrawer ? handleDrawerClose : handleClear
                }
              >
                <ListItemIcon>
                  <StyleMyplacesIcon />
                </ListItemIcon>
                <StyleListItemText primary="My places" />
              </ListItemButton>
            </StyleListItemsMyPlaces>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItemsProfile
              disablePadding
              component={StyleNavLink}
              to={`/api/users/profile/${login.userId}`}
              selected={selectedIndex === 3 ? true : null}
              onClick={(e) => activeStateHandler(e, 3)}
            >
              <ListItemButton
                disableRipple={true}
                component="li"
                href={`/api/users/profile/${login.userId}`}
                onClick={
                  onCloseResponsiveDrawer ? handleDrawerClose : handleClear
                }
              >
                <ListItemIcon>
                  <StyleAccountCircleIcon />
                </ListItemIcon>
                <StyleListItemText primary="Profile" />
              </ListItemButton>
            </StyleListItemsProfile>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItemsSettings
              disablePadding
              selected={settingsSelectedItem === 5 ? true : null}
            >
              <ListItemButton
                component="ul"
                onClick={handleProfileMenuOpen}
                disableRipple={true}
              >
                <ListItemIcon>
                  <StyleSettingsIcon />
                </ListItemIcon>
                <StyleListItemText primary="Settings" />
              </ListItemButton>
            </StyleListItemsSettings>
          </Grow>

          <Grow
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}
            {...(true ? { timeout: 500 } : {})}
          >
            <StyleListItems disablePadding>
              <ListItemButton
                disableRipple={true}
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
