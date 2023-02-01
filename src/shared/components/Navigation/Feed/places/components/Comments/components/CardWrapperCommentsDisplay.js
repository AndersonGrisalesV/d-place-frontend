import React from "react";

import CardWrapperComments from "./CardWrapperComments";

import { Box, Zoom } from "@mui/material";

const CardWrapperCommentsDisplay = (props) => {
  return (
    <Box flex={8} p={8} m={1} sx={{ padding: "20px" }}>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            marginLeft: {
              sps: "-14px",
              ps: "-16px",
              ts: "-16px",
              sls: "-14px",
              sms: "-13px",
              sc: "-10px",
              nsc: "-6px",
              ns: "6px",
              msc: "16px",
              mns: "16px",
              ms: "3px",
              lgs: "-225px",
            },
            marginTop: "14px",
            marginBottom: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardWrapperComments sx={{ marginRight: "105px" }}>
            {props.children}
          </CardWrapperComments>
        </Box>
      </Zoom>
    </Box>
  );
};

export default CardWrapperCommentsDisplay;
