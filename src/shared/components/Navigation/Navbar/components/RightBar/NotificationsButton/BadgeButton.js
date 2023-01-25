import React, { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const BadgeButton = ({
  onUpdatedNotification,
  onShowNotification,
  onHandleClick,
  onFunction = false,
  onBadge,
}) => {
  const [badge, setBadge] = useState(
    onShowNotification && !onUpdatedNotification ? 1 : 0
  );

  useEffect(() => {
    if (onShowNotification && !onUpdatedNotification) {
      setBadge(1);
    } else {
      setBadge(0);
    }
  }, [onUpdatedNotification, onShowNotification]);

  return (
    <IconButton
      disableRipple={true}
      style={{ backgroundColor: "transparent" }}
      size="large"
      aria-label="show new notifications"
      color="inherit"
      title="Notifications"
      onClick={onFunction ? onHandleClick : null}
    >
      <Badge badgeContent={!onBadge ? null : onBadge} color="error">
        <NotificationsOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default BadgeButton;
