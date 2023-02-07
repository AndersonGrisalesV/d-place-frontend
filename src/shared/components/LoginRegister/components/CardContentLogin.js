import React from "react";

import { CardContent } from "@mui/material";

// Wraps up the entire form on LoginRegisterPage
const CardContentLogin = (props) => {
  return (
    <CardContent
      bgcolor={"backgroundColor"}
      sx={{
        //* width for different screen sizes
        width: {
          sps: "156px",
          ps: "224px",
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
