import React from "react";

import { Divider, Typography } from "@mui/material";

const Title = () => {
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        fontWeight={400}
        mt={2}
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: {
            sps: "0.9rem",
            ps: "1rem",
            ts: "1rem",
            sls: "1.25rem",
            sms: "1.25rem",
            sc: "1.25rem",
            nsc: "1.25rem",
            ns: "1.25rem",
            msc: "1.25rem",
            mns: "1.25rem",
            ms: "1.25rem",
            lgs: "1.25rem",
          },
        }}
      >
        Edit Profile
      </Typography>
      <Divider variant="middle" />
      <br />
      <br />
    </React.Fragment>
  );
};

export default Title;
