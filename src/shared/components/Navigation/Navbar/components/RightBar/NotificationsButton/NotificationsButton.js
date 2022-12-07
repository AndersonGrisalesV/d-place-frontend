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
import { LoginContext } from "../../../../../../context/login-context";
import AvatarNotification from "./AvatarNotification";
import { useNavigate } from "react-router-dom";

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

const NotificationsButton = ({ onResponsive }) => {
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
          "http://localhost:4000/homepage"
        );

        setLoadedPlaces(responseData.places.reverse());
        console.log(responseData.places.reverse());
        if (
          login.userId !==
          responseData.places.reverse().slice(0, 1)[0].creatorId._id
        ) {
          setShowNotification(true);
        }
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, login.userId]);

  const anchorRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowNotification(false);
    // console.log(loadedPlaces);
    // setTimeout(() => {
    //   login.notification();
    // }, "4000");
  };

  const handleClickResponsive = (event) => {
    setAnchorEl(event.currentTarget);
    setShowNotification(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewPost = () => {
    navigate(`api/places/${loadedPlaces.slice(0, 1)[0]._id}`);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const PopoverComponent = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 1.5, fontWeight: "600" }}>Notifications</Typography>
      <StyleStack direction="row" spacing={0} sx={{ cursor: "pointer" }}>
        {!isLoading && loadedPlaces ? (
          <React.Fragment>
            <AvatarNotification loadedPlaces={loadedPlaces} />

            <Typography
              variant="body1"
              fontWeight={500}
              fontSize={14}
              sx={{ p: 2, paddingTop: "7px" }}
              onClick={handleNewPost}
            >
              {`New post by ${loadedPlaces.slice(0, 1)[0].creatorId.name}`}
            </Typography>
          </React.Fragment>
        ) : (
          <AccountCircleOutlined />
        )}
      </StyleStack>
    </Popover>
  );

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
            <StyleMenuItem onClick={handleClickResponsive}>
              <IconButton
                style={{ backgroundColor: "transparent" }}
                size="large"
                aria-label="show new notifications"
                color="inherit"
                title="Notifications"
              >
                {!isLoading ? (
                  <Badge
                    badgeContent={
                      showNotification && login.newNotification ? 1 : null
                    }
                    color="error"
                  >
                    <NotificationsOutlinedIcon
                      onClick={handleClickResponsive}
                    />
                    {PopoverComponent}
                  </Badge>
                ) : null}
              </IconButton>
              <p>Notifications</p>
            </StyleMenuItem>
          </Box>
        </Zoom>
      ) : (
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
                ms: "flex",
                lgs: "flex",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
              title="Notifications"
              sx={{ marginLeft: "6px" }}
            >
              {!isLoading ? (
                <Badge
                  badgeContent={
                    showNotification && login.newNotification ? 1 : null
                  }
                  color="error"
                >
                  <NotificationsOutlinedIcon onClick={handleClick} />
                  {PopoverComponent}
                </Badge>
              ) : null}
            </IconButton>
          </Box>
        </Zoom>
      )}
    </React.Fragment>
  );
};

export default NotificationsButton;
