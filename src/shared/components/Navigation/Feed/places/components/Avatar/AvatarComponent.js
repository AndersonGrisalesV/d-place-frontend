import React from "react";

import Avatar from "@mui/material/Avatar";

//* loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
// onProfileNavigation is a pointer to a function that goes to the creator of the place profile on AvatarWrapper component
const AvatarComponent = ({ loadedPlaces, onProfileNavigation }) => {
  return (
    <Avatar
      onClick={onProfileNavigation}
      //* Checks if the user has an image or not
      src={
        loadedPlaces.creatorId.imageUrl.url
          ? loadedPlaces.creatorId.imageUrl.url
          : ""
      }
      title={loadedPlaces.creatorId.name}
      sx={{
        color: "#fff",
        cursor: "pointer",
        //* fontSize for different screen sizes
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "14px",
          sls: "15px",
          sms: "18px",
          sc: "18px",
          nsc: "18px",
          ns: "18px",
          msc: "18px",
          mns: "18px",
          ms: "18px",
          lgs: "18px",
        },
        bgcolor: "#da4453c7",
        //* width for different screen sizes
        width: {
          sps: "28px",
          ps: "31px",
          ts: "34px",
          sls: "36px",
          sms: "40px",
          sc: "40px",
          nsc: "40px",
          ns: "40px",
          msc: "40px",
          mns: "40px",
          ms: "40px",
          lgs: "40px",
        },
        //* height for different screen sizes
        height: {
          sps: "28px",
          ps: "31px",
          ts: "34px",
          sls: "36px",
          sms: "40px",
          sc: "40px",
          nsc: "40px",
          ns: "40px",
          msc: "40px",
          mns: "40px",
          ms: "40px",
          lgs: "40px",
        },
      }}
      aria-label="recipe"
    >
      {/* Checks if the user has an image or not to show the user's name (first
      letter) instead */}
      {loadedPlaces.creatorId.imageUrl.url === ""
        ? loadedPlaces.creatorId.name.charAt(0)
        : ""}
    </Avatar>
  );
};

export default AvatarComponent;
