import React, { useState } from "react";

import LoadingSpinner from "../../../../../../LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../../../../../../LoadingSpinner/LoadingSpinnerWrapper";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { ImageListItem, Stack, styled, Typography } from "@mui/material";

const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453c7",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ImagePreviewEditPlaceButton = ({
  imageUrl,
  selectedImageName,
  handleRemoveImage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

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
            <LoadingSpinnerWrapper onNewPlace={true}>
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
                  key={imageUrl}
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
                        cursor: "pointer",
                        width: {
                          sps: "16px",
                          ps: "17px",
                          ts: "18px",
                          sls: "20px",
                          sms: "24px",
                          sc: "24px",
                          nsc: "150px",
                          ns: "24px",
                          msc: "24px",
                          mns: "24px",
                          ms: "24px",
                          lgs: "24px",
                        },
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
                  <img
                    style={{ borderRadius: "2.2%", maxHeight: "800px" }}
                    src={imageUrl.url}
                    srcSet={imageUrl}
                    alt={selectedImageName}
                    loading="lazy"
                  ></img>
                </ImageListItem>
              </Box>
            </Stack>
          </Box>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ImagePreviewEditPlaceButton;
