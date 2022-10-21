import React, { useEffect, useState } from "react";
import {
  Button,
  ImageListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453c7",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ImagePreviewPlaceButton = ({
  imageUrl,
  selectedImageName,
  handleRemoveImage,
}) => {
  return (
    <React.Fragment>
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
          <Stack direction="row" justifyContent="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageListItem
                key={imageUrl}
                style={{
                  gridColumnEnd: "4",
                  objectFit: "contain",
                }}
                sx={{
                  width: "330px",
                  height: "250px",
                  paddingRight: "0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignAitems: "flex-start",
                    backgroundColor: "transparent",
                  }}
                >
                  <StyleCloseIcon
                    onClick={handleRemoveImage}
                    sx={{ cursor: "pointer" }}
                  />
                </Box>
                <img
                  style={{ borderRadius: "2.2%" }}
                  src={imageUrl}
                  srcSet={imageUrl}
                  alt={selectedImageName}
                  loading="lazy"
                />
              </ImageListItem>
            </Box>
          </Stack>
        </Box>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ImagePreviewPlaceButton;
