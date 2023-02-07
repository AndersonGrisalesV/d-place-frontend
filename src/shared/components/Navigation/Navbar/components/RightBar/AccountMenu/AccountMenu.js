import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import AvatarComponent from "./Avatar/AvatarComponent";

import { Box } from "@mui/system";
import { IconButton, Menu, MenuItem, Zoom } from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import styled from "@emotion/styled/macro";

//* Styled component for MenuItem
const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#da4453c7" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${AccountCircleOutlined}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

//* onClearSearchBar is a pointer to a function that cleans the searchBar on NavigationBar, SideBar > App
const AccountMenu = ({ onClearSearchBar }) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  // handleProfileMenuOpen function sets the currentTarget as the anchor element
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handleMenuClose functon sets anchorEl to null
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // handleMenuClose function sets anchorEl to null
  const handleProfileMenuClose = () => {
    login.listItemsNotListed();
    setAnchorEl(null);
    navigate(`/api/users/profile/${login.userId}`);
  };

  // handleProfileMenuClose function closes the profile menu, logs the list of items that are not listed, sets anchorEl to null and navigates to the profile page for the current user
  const handleMenuCloseAndLogout = () => {
    setAnchorEl(null);
    login.logout();
    onClearSearchBar();
    navigate("/api/homepage");
    window.location.reload();
  };

  // Menu to be rendered
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
        Profile
      </StyleMenuItem>
      <StyleMenuItem onClick={handleMenuCloseAndLogout} disableRipple={true}>
        Logout
      </StyleMenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      {login.isLoggedIn ? (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
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
            <IconButton
              disableRipple={true}
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
                paddingLeft: "5px",
              }}
            >
              <AvatarComponent />
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
