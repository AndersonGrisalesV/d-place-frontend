import { CardContent, Typography } from "@mui/material";
import React from "react";

const CardTitle = () => {
  return (
    <CardContent
      sx={{
        paddingTop: "12px",
        paddingBottom: "1px",
      }}
    >
      <Typography
        variant="body1"
        fontWeight={500}
        color="text.secondary"
        sx={{
          fontSize: {
            sps: "10px",
            ps: "11px",
            ts: "13px",
            sls: "13px",
            sms: "15px",
            sc: "15px",
            nsc: "15px",
            ns: "15px",
            msc: "15px",
            mns: "15px",
            ms: "15px",
            lgs: "15px",
          },
        }}
      >
        Title impressive paella is a perfect party dish
      </Typography>
    </CardContent>
  );
};

export default CardTitle;
