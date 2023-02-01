import React, { useState } from "react";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../../../LoadingSpinner/LoadingSpinnerWrapper";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Avatar, ImageListItem, Stack, styled } from "@mui/material";

const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453c7",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ImagePreviewEditProfileButton = ({
  imageUrl,
  selectedImageName,
  handleRemoveImage,
  isLoading,
  showSuccess,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  setTimeout(() => {
    setLoadingImage(false);
  }, "1000");

  return (
    <React.Fragment>
      <React.Fragment>
        {loadingImage ? (
          <Stack style={{ marginTop: "62px" }}>
            <LoadingSpinnerWrapper onLogin={true}>
              <LoadingSpinner />
            </LoadingSpinnerWrapper>
          </Stack>
        ) : (
          <Box mt={2} textAlign="center">
            <Stack direction="row" justifyContent="space-around">
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
                        visibility:
                          isLoading || showSuccess ? "hidden" : "visible",
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
                  <Box mt={2} textAlign="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={imageUrl.url}
                        srcSet={imageUrl}
                        alt={selectedImageName}
                        sx={{
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

export default ImagePreviewEditProfileButton;
