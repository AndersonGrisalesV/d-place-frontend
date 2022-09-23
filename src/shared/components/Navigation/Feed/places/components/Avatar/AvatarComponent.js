import React from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const AvatarComponent = () => {
  return (
    <Avatar
      title="Anderson"
      sx={{
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "14px",
          sls: "15px",
          sms: "19px",
          sc: "19px",
          nsc: "19px",
          ns: "19px",
          msc: "19px",
          mns: "19px",
          ms: "19px",
          lgs: "19px",
        },
        bgcolor: red[500],
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
      A
    </Avatar>
  );
};

export default AvatarComponent;
