import React from "react";

import { Box, Zoom } from "@mui/material";
import CardWrapper from "../../Navigation/Feed/places/components/CardWrapper";

const CardWrapperLogin = (props) => {
  return (
    <Box flex={8} p={8} m={1}>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            // marginLeft: "10px",
            marginTop: "14px",
            marginBottom: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardWrapper sx={{ marginRight: "105px" }}>
            {props.children}
          </CardWrapper>
        </Box>
      </Zoom>
    </Box>
  );
};

export default CardWrapperLogin;
