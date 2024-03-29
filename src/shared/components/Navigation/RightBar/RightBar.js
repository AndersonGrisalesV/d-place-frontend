import React from "react";

import Comments from "./components/Comments/Comments";
import LatestPhotos from "./components/LatestPhotos/LatestPhotos";

import { Box } from "@mui/system";
import { Card, Grow } from "@mui/material";

const Rightbar = () => {
  return (
    <Grow
      in={true}
      style={{ transitionDelay: true ? "100ms" : "0ms" }}
      {...(true ? { timeout: 500 } : {})}
    >
      <Box
        flex={2}
        p={0}
        sx={{
          //* display for different screen sizes
          display: {
            sps: "none",
            ps: "none",
            ts: "none",
            sls: "none",
            sms: "none",
            sc: "none",
            ns: "none",
            msc: "flex",
            mns: "flex",
            ms: "flex",
            lgs: "flex",
            justifyContent: "end",
          },
        }}
      >
        <Box position="fixed" sx={{ bgcolor: "background.paper" }}>
          <Card
            variant="outlined"
            sx={{
              margin: "0px",
              //* maxWidth for different screen sizes
              maxWidth: {
                msc: "300px",
                mns: "800px",
                ms: "800px",
                lgs: "800px",
              },
            }}
          >
            <LatestPhotos />
            <Comments />
          </Card>
        </Box>
      </Box>
    </Grow>
  );
};

export default Rightbar;
