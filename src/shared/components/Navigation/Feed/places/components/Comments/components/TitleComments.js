import { Divider, Typography } from "@mui/material";
import React from "react";

const TitleComments = () => {
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        fontWeight={400}
        mt={2}
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Comments
      </Typography>
      <Divider />
    </React.Fragment>
  );
};

export default TitleComments;
