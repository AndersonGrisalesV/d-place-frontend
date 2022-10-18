import React from "react";
import { Avatar, ImageList, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ImagePreviewPlaceButton = ({ imageUrl, selectedImageName }) => {
  console.log(imageUrl);
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
          {/* <Avatar
            src={imageUrl}
            alt={selectedImageName}
            sx={{
              width: 150,
              height: 150,
              border: "1px solid rgb(118, 118, 118)",
            }}
          /> */}
          {/* <ImageList
            sx={{ width: "330px", height: "250px", paddingRight: "0px" }}
          >
          */}
          <ImageListItem
            key={imageUrl}
            style={{ gridColumnEnd: "4", objectFit: "contain" }}
            sx={{ width: "330px", height: "250px", paddingRight: "0px" }}
          >
            <img
              style={{ borderRadius: "2.2%" }}
              src={imageUrl}
              srcSet={imageUrl}
              alt={selectedImageName}
              loading="lazy"
            />
          </ImageListItem>
          {/* 
          </ImageList> */}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ImagePreviewPlaceButton;
