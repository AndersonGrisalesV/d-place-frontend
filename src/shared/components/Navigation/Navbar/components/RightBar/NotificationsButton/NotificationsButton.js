import React, { useContext, useEffect, useRef, useState } from "react";

import { LoginContext } from "../../../../../../context/login-context";

import { useHttpClient } from "../../../../../../hooks/http-hook";

import PopoverComponent from "./PopoverComponent";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, Box, IconButton, MenuItem } from "@mui/material";
import styled from "@emotion/styled/macro";

//* Styled component for MenuItem
const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#da4453c7" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${NotificationsOutlinedIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

//* onResponsive is a boolean that indicates if a small screen sized is accesing in order to display correctly the notificationButton features
//* onCloseMenuResponsive is a pointer to a function that closes  the mobile menu on AccountMenuMobile
//* onUser is a satest that contains the information of the user to be displayed on the menu on AccountMenuMobile
// setUpdateNotification is a setState passed down by NavigationBar to help maintain the same state for the notification badge on mobile and desktop-sized screens
// updateNotification is a state passed down by NavigationBar to help maintain the same state for the notification badge on mobile and desktop-sized screens
const NotificationsButton = ({
  onResponsive,
  onCloseMenuResponsive = null,
  onUser,
  setUpdateNotification,
  updateNotification = true,
}) => {
  const login = useContext(LoginContext);
  const responsiveVariant = onResponsive;

  // state variable to hold the value of the responsive variant
  const [changeResponsive, setChangeResponsive] = useState(responsiveVariant);

  //* useEffect to update the changeResponsive state when responsiveVariant changes
  useEffect(() => {
    setChangeResponsive(responsiveVariant);
  }, [responsiveVariant]);

  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [showNotification, setShowNotification] = useState(false);

  // useEffect to send an API request to the backend to fetch places and user details from the API
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage`
        );

        setLoadedPlaces(responseData.places);
        // Checks if users owns the last place createdo or not to decide if it-s neccesary to show the notification for that specific user
        if (
          login.userId ===
          responseData.places.reverse().slice(0, 1)[0].creatorId._id
        ) {
          setUpdateNotification(true);
        }
      } catch (err) {}
    };
    fetchPlaces();

    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile/${login.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        // Checks if users has seen or not the latest notification
        if (responseData.user.viewedNotification) {
          setShowNotification(true);
        }
      } catch (err) {}
    };
    fetchUser();
  }, [
    sendRequest,
    login.userId,
    login.notification,
    login.token,
    setUpdateNotification,
    login.newNotification,
    login.notification,
    login,
  ]);

  const [anchorEl, setAnchorEl] = useState(false);
  // reference variable to hold the notificationBadge component and trigger a click to maintain consistency between responsive and non responsive versions
  const notificationBadge = useRef(null);

  // handleClick function to handle the clicking of the notification icon and to update the user info of the notification beign seen
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

    if (login.userId !== loadedPlaces.slice(0, 1)[0].creatorId._id) {
      if (showNotification && !updateNotification) {
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/notification/${login.userId}`,
            "PATCH",
            JSON.stringify({
              notification: false,
            }),
            {
              Authorization: "Bearer " + login.token,
              "Content-Type": "Application/json",
            }
          );
        } catch (err) {}
      }
      setUpdateNotification(true);
      setShowNotification(false);
    }
    // Checkis if responsive is being show in order to trigger a click and show the submenu on responsive screen size devices
    if (onResponsive) {
      notificationBadge.current.click();
    }
  };

  // handleClose closes the popOverMenu that opens up to show the latest added place
  const handleClose = () => {
    setAnchorEl(false);
  };

  // Preloads the popOver to show to the user with the latest added place
  let popOver;
  if (!isLoading && loadedPlaces) {
    popOver = (
      <PopoverComponent
        setLoadedPlaces={setLoadedPlaces}
        onPost={true}
        loadedPlaces={loadedPlaces}
        anchorEl={anchorEl ? anchorEl : false}
        onHandleClose={handleClose}
        onCloseMenuResponsive={onCloseMenuResponsive}
      />
    );
  }

  return (
    <React.Fragment>
      {changeResponsive ? (
        <Box
          sx={{
            //* display for different screen sizes
            display: {
              sps: "flex",
              ps: "flex",
              ts: "flex",
              sls: "flex",
              sms: "flex",
              sc: "flex",
              nsc: "flex",
              ns: "none",
              ms: "none",
              lgs: "none",
            },
          }}
        >
          <StyleMenuItem onClick={handleClick} disableRipple={true}>
            <IconButton
              disableRipple={true}
              style={{ backgroundColor: "transparent" }}
              size="large"
              aria-label="show new notifications"
              color="inherit"
              title="Notifications"
              ref={notificationBadge}
            >
              {onUser ? (
                <Badge
                  badgeContent={
                    onUser.viewedNotification && !updateNotification ? 1 : null
                  }
                  color="error"
                >
                  <NotificationsOutlinedIcon />
                </Badge>
              ) : null}
            </IconButton>
            <p>Notifications</p>
          </StyleMenuItem>
          {popOver}
        </Box>
      ) : (
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
              ms: "flex",
              lgs: "flex",
            },
          }}
        >
          <IconButton
            disableRipple={true}
            size="large"
            aria-label="show new notifications"
            color="inherit"
            title="Notifications"
            sx={{ marginLeft: "6px" }}
            onClick={handleClick}
          >
            <Badge
              badgeContent={
                showNotification && !updateNotification && loadedPlaces
                  ? 1
                  : null
              }
              color="error"
            >
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      )}
      {popOver}
    </React.Fragment>
  );
};

export default NotificationsButton;
