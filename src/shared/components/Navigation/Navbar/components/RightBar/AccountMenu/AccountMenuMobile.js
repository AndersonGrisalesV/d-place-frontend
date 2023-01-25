import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import LoginButton from "../LoginButtons/LoginButton";
import NotificationsButton from "../NotificationsButton/NotificationsButton";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import AvatarComponent from "./Avatar/AvatarComponent";
import { LoginContext } from "../../../../../../context/login-context";
import { useHttpClient } from "../../../../../../hooks/http-hook";

const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${FavoriteBorderOutlined}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
    [`${AccountCircleOutlined}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const AccountMenuMobile = ({
  onClearSearchBar,
  setUpdateNotification,
  updateNotification,
}) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(`/api/users/profile/${login.userId}`);
    login.listItemsNotListed();
  };

  const handleFavoritesMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(`/api/users/favorites/${login.userId}`);
  };

  const handleMenuCloseAndLogout = () => {
    setAnchorEl(null);
    login.logout();
    onClearSearchBar();
    handleMobileMenuClose();
    navigate("/homepage");
    window.location.reload();
  };

  const [userInfo, setUserInfo] = useState();

  const handleMobileMenuOpen = async (event) => {
    setMobileMoreAnchorEl(event.currentTarget);

    try {
      const responseData = await sendRequest(
        `http://localhost:4000/api/users/profile/${login.userId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );
      setUserInfo(responseData.user);
    } catch (err) {
      console.log(err);
    }
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NotificationsButton
        onUser={userInfo}
        onResponsive={true}
        onCloseMenuResponsive={handleMobileMenuClose}
        setUpdateNotification={setUpdateNotification}
        updateNotification={updateNotification}
      />

      <StyleMenuItem onClick={handleFavoritesMenuClose} disableRipple={true}>
        <IconButton
          disableRipple={true}
          style={{ backgroundColor: "transparent" }}
          size="large"
          aria-label="show favorites link"
          color="inherit"
        >
          <FavoriteBorderOutlined />
        </IconButton>
        <p>Favorites</p>
      </StyleMenuItem>
      {login.isLoggedIn ? (
        <StyleMenuItem onClick={handleProfileMenuOpen} disableRipple={true}>
          <IconButton
            disableRipple={true}
            style={{ backgroundColor: "transparent" }}
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleOutlined />
          </IconButton>
          <p>Profile</p>
        </StyleMenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
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
      <StyleMenuItem onClick={handleProfileMenuClose} disableRipple={true}>
        Edit
      </StyleMenuItem>
      <StyleMenuItem onClick={handleMenuCloseAndLogout} disableRipple={true}>
        Logout
      </StyleMenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      {login.isLoggedIn ? (
        <Box
          sx={{
            display: {
              sps: "flex",
              ps: "flex",
              ts: "flex",
              sls: "flex",
              sms: "flex",
              sc: "flex",
              nsc: "flex",
              ns: "none",
              msc: "none",
              mns: "none",
              ms: "none",
              lgs: "none",
            },
          }}
        >
          <IconButton
            disableRipple={true}
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            title="Account"
          >
            <AvatarComponent />
          </IconButton>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      ) : (
        <Box
          sx={{
            display: {
              sps: "flex",
              ps: "flex",
              ts: "flex",
              sls: "flex",
              sms: "flex",
              sc: "flex",
              nsc: "flex",
              ns: "none",
              msc: "none",
              mns: "none",
              ms: "none",
              lgs: "none",
            },
          }}
        >
          <LoginButton />
        </Box>
      )}
    </React.Fragment>
  );
};

export default AccountMenuMobile;
