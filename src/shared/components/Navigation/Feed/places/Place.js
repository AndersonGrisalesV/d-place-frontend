import React from "react";

import CardPlace from "./components/CardPlace";
import CommentsPost from "./components/Comments/CommentsPost";

import { Box, Zoom } from "@mui/material";

//* onMap is a boolean that is passed down by PlaceDetail page
//* loadedPlaces are the places passed down by Feed, FavoritePlaces, PlaceDetail or ProfilePlaces
//* onShowComments is a boolean that is passed down by Feed page
//* onRefreshPlaceComments is a pointer to a function that triggers a state that refreshes the places and their comments once one of them is edited or deleted PlaceGetById > CommentsPost where only comments are selected and then passed down
//* onErrorDeleteComment is a pointer to a function that manages error/success messages when creating, editing, deleting a message PlaceGetById > CommentsPost > CommentsDisplay
//* onArrangeBigSize is a boolean that helps us arrange the margin on big sized screens when showing FavoritePlaces, ProfilePlaces and FilteredPlaces
const Place = ({
  onMap = false,
  loadedPlaces,
  onShowComments = false,
  onRefreshPlaceComments,
  onErrorDeleteComment,
  onArrangeBigSize = false,
}) => {
  return (
    <React.Fragment>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            //* marginLeft for different screen sizes
            //! marginLeft on big sizes becomes not well adjusted hence the propr trying to arrange them at least to a certain degree
            marginLeft: {
              sps: onArrangeBigSize ? "-14px" : "-15px",
              ps: onArrangeBigSize ? "-16px" : "-16px",
              ts: onArrangeBigSize ? "-16px" : "-18px",
              sls: onArrangeBigSize ? "-14px" : "-16px",
              sms: onArrangeBigSize ? "-13px" : "-14px",
              sc: onArrangeBigSize ? "-10px" : "-17px",
              nsc: onArrangeBigSize ? "-6px" : "-17px",
              ns: onArrangeBigSize ? "46px" : "10px",
              msc: "16px",
              mns: "16px",
              ms: onArrangeBigSize ? "3px" : "53px",
              lgs: onArrangeBigSize ? "-225px" : "380px",
            },
            marginTop: onArrangeBigSize ? "30px" : "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // TODO: specify one value that is applied in all breakpoints
            // color: "white",
            // specify multiple values applied in specific breakpoints
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
            onErrorDeleteComment={onErrorDeleteComment}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Place;
