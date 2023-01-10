import React from "react";
import { Box, Zoom } from "@mui/material";
import CardPlace from "./components/CardPlace";
import CommentsPost from "./components/Comments/CommentsPost";

const Place = ({
  onMap = false,
  loadedPlaces,
  onShowComments = false,
  onRefreshPlaceComments,
  onDeletedComments,
  onErrorDeleteComment,
}) => {
  return (
    <React.Fragment>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            marginLeft: {
              sps: "10px",
              ps: "10px",
              ts: "10px",
              sls: "10px",
              sms: "10px",
              sc: "10px",
              nsc: "10px",
              ns: "10px",
              msc: "16px",
              mns: "16px",
              ms: "53px",
              lgs: "380px",
            },
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
          <CommentsPost
            loadedPlaces={loadedPlaces}
            onRefreshPlaceComments={onRefreshPlaceComments}
            onDeletedComments={onDeletedComments}
            onErrorDeleteComment={onErrorDeleteComment}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Place;
