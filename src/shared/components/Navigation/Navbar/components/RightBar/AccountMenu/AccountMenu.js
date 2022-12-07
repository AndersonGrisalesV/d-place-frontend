import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import { IconButton, Menu, MenuItem, Zoom } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import AvatarComponent from "./Avatar/AvatarComponent";
import { LoginContext } from "../../../../../../context/login-context";

const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${AccountCircleOutlined}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const AccountMenu = ({ onClearSearchBar }) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {};

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(`/api/users/profile/${login.userId}`);
  };

  const handleMenuCloseAndLogout = () => {
    setAnchorEl(null);
    login.logout();
    onClearSearchBar();
    handleMobileMenuClose();
    navigate("/homepage");
  };

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
      <StyleMenuItem onClick={handleProfileMenuClose}>Profile</StyleMenuItem>
      <StyleMenuItem onClick={handleMenuCloseAndLogout}>Logout</StyleMenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      {login.isLoggedIn ? (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              title="Account"
              style={{
                padding: "0px",
                paddingRight: "12px",
                paddingLeft: "12px",
              }}
            >
              <AvatarComponent />

              {/* <AccountCircleOutlined /> */}
            </IconButton>
            {renderMenu}
          </Box>
        </Zoom>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AccountMenu;
