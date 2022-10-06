import { CardContent, Typography } from "@mui/material";
import React from "react";

const CardTitle = ({ onMap = false, DUMMY_PLACES }) => {
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
        {DUMMY_PLACES.title}
      </Typography>
      {onMap && (
        <React.Fragment>
          <p style={{ margin: "8px" }} />
          <Typography
            variant="h6"
            fontWeight={400}
            color="text.secondary"
            sx={{
              fontSize: {
                sps: "8px",
                ps: "9px",
                ts: "11px",
                sls: "11px",
                sms: "13px",
                sc: "13px",
                nsc: "13px",
                ns: "13px",
                msc: "13px",
                mns: "13px",
                ms: "13px",
                lgs: "13px",
              },
            }}
          >
            {DUMMY_PLACES.description}
          </Typography>
        </React.Fragment>
      )}
    </CardContent>
  );
};

export default CardTitle;
