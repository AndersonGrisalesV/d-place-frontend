import { CardHeader } from "@mui/material";
import React from "react";
import AvatarComponent from "./AvatarComponent";
import ButtonEdit from "../Buttons/ButtonEdit";

const AvatarWrapper = ({ DUMMY_PLACES }) => {
  let isLoggedIn = true;

  return (
    <CardHeader
      avatar={<AvatarComponent />}
      action={isLoggedIn ? <ButtonEdit /> : ""}
      title={DUMMY_PLACES.creatorName}
      subheader="September 6, 2022"
      titleTypographyProps={{
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "12px",
          sls: "13px",
          sms: "14px",
          sc: "14px",
          nsc: "14px",
          ns: "14px",
          msc: "14px",
          mns: "14px",
          ms: "14px",
          lgs: "14px",
        },
      }}
      subheaderTypographyProps={{
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "12px",
          sls: "13px",
          sms: "14px",
          sc: "14px",
          nsc: "14px",
          ns: "14px",
          msc: "14px",
          mns: "14px",
          ms: "14px",
          lgs: "14px",
        },
      }}
    />
  );
};

export default AvatarWrapper;
