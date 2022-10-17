import React from "react";
import { Box, Zoom } from "@mui/material";
import CardWrapperNewPlacePost from "./CardWrapperNewPlacePost";

const CardWrapperNewPlacePostDisplay = (props) => {
  return (
    <Box flex={8} p={8} m={1} sx={{ padding: "20px" }}>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            marginLeft: "10px",
            marginTop: "14px",
            marginBottom: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardWrapperNewPlacePost sx={{ marginRight: "105px" }}>
            {props.children}
          </CardWrapperNewPlacePost>
        </Box>
      </Zoom>
    </Box>
  );
};

export default CardWrapperNewPlacePostDisplay;
