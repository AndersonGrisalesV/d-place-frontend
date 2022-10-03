import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ImagePreviewButton = ({ imageUrl, selectedImageName }) => {
  return (
    <React.Fragment>
      <Typography
        variant="h9"
        fontWeight={300}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Image Preview
      </Typography>
      <Box mt={2} textAlign="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={imageUrl}
            alt={selectedImageName}
            sx={{
              width: 150,
              height: 150,
              border: "1px solid rgb(118, 118, 118)",
            }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ImagePreviewButton;
