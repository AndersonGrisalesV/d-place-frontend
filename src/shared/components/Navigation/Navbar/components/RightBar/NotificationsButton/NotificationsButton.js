import React, { useState, useEffect, useRef } from "react";
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
  const responsiveVariant = onResponsive;
  const [changeResponsive, setChangeResponsive] = useState(responsiveVariant);

  useEffect(() => {
    setChangeResponsive(responsiveVariant);
  }, [responsiveVariant]);

  const anchorRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
        <Avatar
          title="Anderson"
          sx={{ marginLeft: "10px", marginBottom: "18px" }}
        />
        <Typography
          variant="body1"
          fontWeight={500}
          fontSize={14}
          sx={{ p: 2, paddingTop: "7px" }}
        >
          New post by "Anderson"
        </Typography>
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
            <StyleMenuItem>
              <IconButton
                style={{ backgroundColor: "transparent" }}
                size="large"
                aria-label="show new notifications"
                color="inherit"
                title="Notifications"
              >
                <Badge badgeContent={1} color="error">
                  <NotificationsOutlinedIcon onClick={handleClick} />

                  {PopoverComponent}
                </Badge>
              </IconButton>
              <p onClick={handleClick}>Notifications</p>
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
              <Badge badgeContent={1} color="error">
                <NotificationsOutlinedIcon onClick={handleClick} />
                {PopoverComponent}
              </Badge>
            </IconButton>
          </Box>
        </Zoom>
      )}
    </React.Fragment>
  );
};

export default NotificationsButton;
