import React from "react";

import Avatar from "@mui/material/Avatar";

const AvatarComponent = ({ loadedPlaces }) => {
  return (
    <Avatar
      src={loadedPlaces.creatorId.image ? loadedPlaces.creatorId.image : ""}
      title={loadedPlaces.creatorId.name}
      sx={{
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
      {loadedPlaces.creatorId.image === ""
        ? loadedPlaces.creatorId.name.charAt(0)
        : ""}
    </Avatar>
  );
};

export default AvatarComponent;
