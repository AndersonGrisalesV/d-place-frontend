import React from "react";

import Avatar from "@mui/material/Avatar";

const AvatarComment = ({ loadedPlace, onProfileNavigation }) => {
  return (
    <Avatar
      onClick={onProfileNavigation}
      src={
        loadedPlace.creatorId.imageUrl.url
          ? loadedPlace.creatorId.imageUrl.url
          : ""
      }
      title={loadedPlace.creatorId.name}
      sx={{
        color: "#fff",
        cursor: "pointer",
        //* display for different screen sizes
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
      {loadedPlace.creatorId.imageUrl.url === ""
        ? loadedPlace.creatorId.name.charAt(0)
        : ""}
    </Avatar>
  );
};

export default AvatarComment;
