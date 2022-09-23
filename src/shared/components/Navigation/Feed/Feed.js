import { Box } from "@mui/material";
import React from "react";
import Place from "./places/Place";

const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <Place />
      <br />
      <Place />
      <br />
    </Box>
  );
};

export default Feed;
