import { Box } from "@mui/material";
import React from "react";
import Place from "./places/Place";

const Feed = ({ onDetail = false }) => {
  const places = (
    <React.Fragment>
      <Place />
      <br />
      <Place />
      <br />
      {/*
      <Place />
      <br />
      <Place />
      <br />
      <Place />
      <br /> */}
    </React.Fragment>
  );

  return (
    <Box flex={4} p={2} style={{ marginBottom: "100%" }}>
      {onDetail ? (
        <React.Fragment>
          <Place />
          <br />
        </React.Fragment>
      ) : (
        places
      )}
    </Box>
  );
};

export default Feed;
