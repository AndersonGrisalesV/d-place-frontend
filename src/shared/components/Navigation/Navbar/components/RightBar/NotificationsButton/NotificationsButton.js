import React, { useState, useEffect, useContext, useRef } from "react";
import { Badge, Box, IconButton, MenuItem, Zoom } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import styled from "@emotion/styled/macro";

import { useHttpClient } from "../../../../../../hooks/http-hook";

import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../../context/login-context";
import PopoverComponent from "./PopoverComponent";

const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    [`${NotificationsOutlinedIcon}`]: {
      color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    },
  },
}));

const NotificationsButton = ({
  onResponsive,
  onCloseMenuResponsive = null,
  onUser,
  setUpdateNotification,
  updateNotification = true,
}) => {
  const login = useContext(LoginContext);
  const responsiveVariant = onResponsive;
  const [changeResponsive, setChangeResponsive] = useState(responsiveVariant);

  let navigate = useNavigate();

  useEffect(() => {
    setChangeResponsive(responsiveVariant);
  }, [responsiveVariant]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage`
        );

        setLoadedPlaces(responseData.places);
        console.log(login.userId);

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

        // setLoadedPlaces(responseData.user);
        // console.log("aqui" + responseData.places.length())

        if (responseData.user.viewedNotification) {
          setShowNotification(true);
        }
      } catch (err) {}
    };
    fetchUser();

    // if (login.newNotification) {
    //   fetchPlaces();
    //   fetchUser();
    //   login.notification();
    // }
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
  const [showPopOver, setShowPopOver] = useState(false);
  const notificationBadge = useRef(null);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(loadedPlaces.reverse().slice(0, 1)[0].creatorId._id);
    // console.log(login.userId);

    // alert(loadedPlaces.slice(0, 1)[0].creatorId._id);
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
        } catch (err) {
          console.log(err);
        }
      }
      setUpdateNotification(true);
      setShowNotification(false);
    }

    if (onResponsive) {
      notificationBadge.current.click();
    }

    setShowPopOver(true);
  };

  // useEffect(() => {
  //   // setUpdateNotification(true);
  // }, [updateNotification]);

  const handleClose = () => {
    setAnchorEl(false);
    setShowPopOver(false);
  };

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
