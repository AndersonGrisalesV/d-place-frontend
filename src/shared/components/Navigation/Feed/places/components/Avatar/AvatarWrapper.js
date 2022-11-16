import React from "react";

import AvatarComponent from "./AvatarComponent";
import ButtonEdit from "../Buttons/ButtonEdit";
import { CardHeader } from "@mui/material";

const AvatarWrapper = ({ DUMMY_PLACES }) => {
  let isLoggedIn = true;
  // const login = useContext(LoginContext);

  return (
    <CardHeader
      avatar={<AvatarComponent DUMMY_PLACES={DUMMY_PLACES} />}
      action={isLoggedIn ? <ButtonEdit DUMMY_PLACES={DUMMY_PLACES} /> : ""}
      title={DUMMY_PLACES.creatorName}
      subheader={DUMMY_PLACES.postDate}
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
