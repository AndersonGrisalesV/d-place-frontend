import styled from "@emotion/styled";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const StyleButton = styled(Button)(({ theme }) => ({
  border:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "1px solid #da4453",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
    border:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.7)"
        : "1px solid #9b9b9bc7",
  },
}));

const UploadButton = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const changeImageHandler = (e) => {
    let reader = new FileReader();

    setSelectedImage(e.target.files[0]);

    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.name);
    reader.onload = () => {
      // console.log(reader.result); //base64encoded string
      const baseResult = reader.result;
      onUpload(baseResult);
    };
    // reader.onerror = (error) => {
    //   console.log("Error: ", error);
    // };
  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={changeImageHandler}
          name="image"
        />
        <label htmlFor="select-image" style={{ marginLeft: "0px" }}>
          <StyleButton
            component="span"
            sx={{
              fontWeight: 500,
              textTransform: "none",
              fontSize: {
                sps: "10px",
                ps: "12px",
                ts: "12px",
                sls: "13px",
                sms: "14px",
                sc: "14px",
                nsc: "14px",
                ns: "14px",
                msc: "14px",
                mns: "14px",
                ms: "14px",
                lgs: "14px",
              },
            }}
          >
            Upload Image
          </StyleButton>
        </label>
      </Stack>
      {imageUrl && selectedImage && (
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
                alt={selectedImage.name}
                sx={{
                  width: 150,
                  height: 150,
                  border: "1px solid rgb(118, 118, 118)",
                }}
              />
            </Box>
          </Box>
        </React.Fragment>
      )}
    </>
  );
};

export default UploadButton;
