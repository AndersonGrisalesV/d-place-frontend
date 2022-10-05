import { Box, Zoom } from "@mui/material";
import React from "react";
import CardPlace from "./components/CardPlace";

const Place = ({ onMap = false, DUMMY_PLACES }) => {
  return (
    <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
      <Box
        sx={{
          marginLeft: "10px",
          marginTop: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // // specify one value that is applied in all breakpoints
          // color: "white",
          // // specify multiple values applied in specific breakpoints
          // backgroundColor: {
          //   sps: "orange",
          //   ps: "green",
          //   ts: "black",
          //   sls: "yellow",
          //   sms: "purple",
          //   sc: "red",
          //   ns: "blue",
          //   mns: "red",
          //   ms: "pink",
          //   lgs: "lightblue",
          // },
        }}
      >
        <CardPlace onMap={onMap} DUMMY_PLACES={DUMMY_PLACES} />
      </Box>
    </Zoom>
  );
};

export default Place;
