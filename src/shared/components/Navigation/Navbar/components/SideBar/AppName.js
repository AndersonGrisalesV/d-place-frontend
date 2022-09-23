import { Typography } from "@mui/material";
import React from "react";

const AppName = () => {
  return (
    <Typography
      mouse={"pointer"}
      fontWeight={600}
      variant="h6"
      component="div"
      sx={{
        marginLeft: "3px",
        display: {
          sps: "none",
          ps: "none",
          ts: "none",
          sls: "none",
          sms: "none",
          sc: "none",
          nsc: "none",
          ns: "block",
          msc: "block",
          mns: "block",
          ms: "block",
          lgs: "block",
        },
      }}
    >
      Dplace
    </Typography>
  );
};

export default AppName;
