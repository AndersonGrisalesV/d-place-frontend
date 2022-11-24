import React from "react";
import { Box, Zoom } from "@mui/material";
import CardPlace from "./components/CardPlace";
import CommentsPost from "./components/Comments/CommentsPost";

const Place = ({ onMap = false, loadedPlaces, onShowComments = false }) => {
  return (
    <React.Fragment>
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
          <CardPlace onMap={onMap} loadedPlaces={loadedPlaces} />
        </Box>
      </Zoom>
      {onShowComments && (
        <React.Fragment>
          <CommentsPost loadedPlaces={loadedPlaces} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Place;
