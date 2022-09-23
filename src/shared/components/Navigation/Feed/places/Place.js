import { Box } from "@mui/material";
import React from "react";
import CardPlace from "./components/CardPlace";

const Place = () => {
  return (
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
      <CardPlace />
    </Box>
  );
};

export default Place;
