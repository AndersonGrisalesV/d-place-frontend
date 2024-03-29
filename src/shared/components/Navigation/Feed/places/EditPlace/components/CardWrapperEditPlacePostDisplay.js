import React from "react";

import CardWrapperEditPlacePost from "./CardWrapperEditPlacePost";

import { Box, Zoom } from "@mui/material";

const CardWrapperEditPlacePostDisplay = (props) => {
  return (
    <Box flex={8} p={8} m={1} sx={{ padding: "20px" }}>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            marginLeft: "-13px",
            marginTop: "14px",
            marginBottom: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardWrapperEditPlacePost sx={{ marginRight: "105px" }}>
            {props.children}
          </CardWrapperEditPlacePost>
        </Box>
      </Zoom>
    </Box>
  );
};

export default CardWrapperEditPlacePostDisplay;
