import React from "react";
import { CardContent } from "@mui/material";

const CardContentLogin = (props) => {
  return (
    <CardContent
      sx={{
        width: {
          sps: "100px",
          ps: "164px",
          ts: "294px",
          sls: "295px",
          sms: "358px",
          sc: "368px",
          nsc: "368px",
          ns: "368px",
          msc: "368px",
          mns: "368px",
          ms: "368px",
          lgs: "368px",
        },
      }}
    >
      {props.children}
    </CardContent>
  );
};

export default CardContentLogin;
