import { AccountCircleOutlined } from "@mui/icons-material";
import { Popover, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import React, { useRef, useState } from "react";
import AvatarNotification from "./AvatarNotification";

const StyleStack = styled(Stack)(({ theme }) => ({
  "&:hover": {
    color:
      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
    [`${Typography}`]: {
      color: "#9b9b9bc7",
    },
  },
}));

const PopoverComponent = ({
  loadedPlaces,
  anchorEl,
  onHandleNewPost,
  onHandleClose,
}) => {
  return (
    <Popover
      open={anchorEl}
      anchorEl={anchorEl}
      onClose={onHandleClose}
      // anchorReference="anchorPosition"
      // anchorPosition={{ top: 67, left: 1084 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 1.5, fontWeight: "600" }}>Notifications</Typography>
      <StyleStack
        direction="row"
        spacing={0}
        sx={{ cursor: "pointer" }}
        onClick={onHandleNewPost}
      >
        <AvatarNotification loadedPlaces={loadedPlaces} />
        <Typography
          variant="body1"
          fontWeight={500}
          fontSize={14}
          sx={{ p: 2, paddingTop: "7px" }}
        >
          {`New post by ${loadedPlaces.slice(0, 1)[0].creatorId.name}`}
        </Typography>
      </StyleStack>
    </Popover>
  );
};

export default PopoverComponent;
