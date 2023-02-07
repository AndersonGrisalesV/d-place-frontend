import React from "react";

import { Typography } from "@mui/material";

//* loadedPlaces are places passed by NotificationsButton
const NotificationText = ({ loadedPlaces }) => {
  return (
    <Typography
      variant="body1"
      fontWeight={500}
      fontSize={14}
      sx={{ p: 2, paddingTop: "7px" }}
    >
      {/* LoadedPlaces must be reversed to pick up the last one added, or the new place */}
      {`New post by ${loadedPlaces.reverse().slice(0, 1)[0].creatorId.name}`}
    </Typography>
  );
};

export default NotificationText;
