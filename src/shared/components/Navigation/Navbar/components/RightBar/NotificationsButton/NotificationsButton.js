import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Zoom,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled/macro";

import { AccountCircleOutlined } from "@mui/icons-material";
import { useHttpClient } from "../../../../../../hooks/http-hook";

import AvatarNotification from "./AvatarNotification";
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

const StyleStack = styled(Stack)(({ theme }) => ({
  "&:hover": {
    color:
      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
    [`${Typography}`]: {
      color: "#9b9b9bc7",
    },
  },
}));

const NotificationsButton = ({
  onResponsive,
  onCloseMenuResponsive = null,
}) => {
  const login = useContext(LoginContext);
  const responsiveVariant = onResponsive;
  const [changeResponsive, setChangeResponsive] = useState(responsiveVariant);
  const [showPopover, setShowPopover] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setChangeResponsive(responsiveVariant);
  }, [responsiveVariant]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/homepage"
        );

        setLoadedPlaces(responseData.places);
        // console.log("aqui" + responseData.places.length())

        // if (
        //   login.userId !==
        //   responseData.places.reverse().slice(0, 1)[0].creatorId._id
        // ) {
        //   setShowNotification(true);
        // }
      } catch (err) {}
    };
    fetchPlaces();

    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/profile/${login.userId}`,
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
  }, [sendRequest, login.userId, login.notification, login.token]);

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(false);

  // useEffect(() => {
  //   if (showNotification) {
  //     anchorRef.current.click();

  //     // setAnchorEl(anchorRef.currentTarget);
  //   }
  // }, [anchorRef, showNotification]);

  const [updateNotification, setUpdateNotification] = useState(false);

  // const handleClick = async (event) => {
  //   setAnchorEl(event.currentTarget);

  //   if (showNotification) {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:4000/api/users/notification/${login.userId}`,
  //         "PATCH",
  //         JSON.stringify({
  //           notification: false,
  //         }),
  //         {
  //           Authorization: "Bearer " + login.token,
  //           "Content-Type": "Application/json",
  //         }
  //       );
  //       setUpdateNotification(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     setShowNotification(false);
  //   }
  // };

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (onResponsive) {
      setShowPopover(true);
    }

    if (showNotification) {
      setShowNotification(false);
      setUpdateNotification(true);
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/notification/${login.userId}`,
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
  };

  // useEffect(() => {
  //   // setUpdateNotification(true);
  // }, [updateNotification]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewPost = () => {
    let placeId;
    if (loadedPlaces) {
      placeId = loadedPlaces.slice(0, 1)[0]._id;
    }

    login.listItemsNotListed();
    navigate(`/api/places/${placeId}`);
    handleClose();
    login.listItemsNotListed(placeId);
    if (onCloseMenuResponsive) {
      onCloseMenuResponsive();
    }
    setShowPopover(false);

    // onCloseMenuResponsive();
  };

  return (
    <React.Fragment>
      {changeResponsive ? (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
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
              >
                {!isLoading ? (
                  <Badge
                    badgeContent={
                      showNotification && !updateNotification ? 1 : null
                    }
                    color="error"
                  >
                    <NotificationsOutlinedIcon />
                  </Badge>
                ) : null}
              </IconButton>
              <p>Notifications</p>
            </StyleMenuItem>
            {!isLoading && loadedPlaces ? (
              <PopoverComponent
                loadedPlaces={loadedPlaces}
                anchorEl={anchorEl}
                onHandleNewPost={handleNewPost}
                onHandleClose={handleClose}
              />
            ) : null}
          </Box>
        </Zoom>
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
              badgeContent={showNotification && !updateNotification ? 1 : null}
              color="error"
            >
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      )}
      {!isLoading && loadedPlaces ? (
        <PopoverComponent
          loadedPlaces={loadedPlaces}
          anchorEl={anchorEl}
          onHandleNewPost={handleNewPost}
          onHandleClose={handleClose}
        />
      ) : null}
    </React.Fragment>
  );
};

export default NotificationsButton;
