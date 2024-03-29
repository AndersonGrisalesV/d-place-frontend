import React, { useState } from "react";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../../LoadingSpinner/LoadingSpinnerWrapper";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import {
  Avatar,
  ImageListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";

// Styled component for the CloseIcon
const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453c7",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// imageUrl contains the URL of an image
// selectedImageName contains the name of the selected image
//* handleRemoveImageis pointer function that removes the image
// isLoading is a boolean indicating whether the image is loaded or not
// showSuccess helps us disable the button(s) after clicking the form
const ImagePreviewButton = ({
  imageUrl,
  selectedImageName,
  handleRemoveImage,
  isLoading,
  showSuccess,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  //* This emulates a loading time when user selects an image
  setTimeout(() => {
    setLoadingImage(false);
  }, "1000");

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
            //* fontSize for different screen sizes
            fontSize: {
              sps: "11px",
              ps: "13px",
              ts: "13px",
              sls: "14px",
              sms: "15px",
              sc: "15px",
              nsc: "15px",
              ns: "15px",
              msc: "15px",
              mns: "15px",
              ms: "15px",
              lgs: "15px",
            },
          }}
        >
          Image Preview
        </Typography>
        {loadingImage ? (
          <Stack style={{ marginTop: "62px" }}>
            <LoadingSpinnerWrapper onLogin={true}>
              <LoadingSpinner />
            </LoadingSpinnerWrapper>
          </Stack>
        ) : (
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
                  key={imageUrl.url}
                  style={{
                    gridColumnEnd: "4",
                    objectFit: "contain",
                  }}
                  sx={{
                    paddingRight: "0px",
                    borderRadius: "18%",
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
                      sx={{
                        visibility:
                          isLoading || showSuccess ? "hidden" : "visible",
                        cursor: "pointer",
                        //* width for different screen sizes
                        width: {
                          sps: "16px",
                          ps: "17px",
                          ts: "18px",
                          sls: "20px",
                          sms: "24px",
                          sc: "24px",
                          nsc: "24px",
                          ns: "24px",
                          msc: "24px",
                          mns: "24px",
                          ms: "24px",
                          lgs: "24px",
                        },
                        //* height for different screen sizes
                        height: {
                          sps: "16px",
                          ps: "17px",
                          ts: "18px",
                          sls: "20px",
                          sms: "24px",
                          sc: "24px",
                          nsc: "24px",
                          ns: "24px",
                          msc: "24px",
                          mns: "24px",
                          ms: "24px",
                          lgs: "24px",
                        },
                      }}
                    />
                  </Box>
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
                          //* width for different screen sizes
                          width: {
                            sps: "60px",
                            ps: "90px",
                            ts: "90px",
                            sls: "120px",
                            sms: "150px",
                            sc: "150px",
                            nsc: "150px",
                            ns: "150px",
                            msc: "150px",
                            mns: "150px",
                            ms: "150px",
                            lgs: "150px",
                          },
                          //* height for different screen sizes
                          height: {
                            sps: "60px",
                            ps: "90px",
                            ts: "90px",
                            sls: "120px",
                            sms: "150px",
                            sc: "150px",
                            nsc: "150px",
                            ns: "150px",
                            msc: "150px",
                            mns: "150px",
                            ms: "150px",
                            lgs: "150px",
                          },
                          border: "1px solid rgb(118, 118, 118)",
                        }}
                      />
                    </Box>
                  </Box>
                </ImageListItem>
              </Box>
            </Stack>
          </Box>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ImagePreviewButton;
