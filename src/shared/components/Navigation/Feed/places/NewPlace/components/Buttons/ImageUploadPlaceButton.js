import React, { useEffect, useState } from "react";
import { Button, Stack, styled } from "@mui/material";

const StyleButtonImage = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ImageUploadPlaceButton = ({ formInputsHandler }) => {
  const handleChangeImageUploadPlaceButton = (e) => {
    if (e.target.files[0]) {
      formInputsHandler(e);
    }
  };

  const handleClickImageUploadPlaceButton = (e) => {
    if (e.target.files[0]) {
      formInputsHandler(e);

      console.log(e.target.files[0]);
      console.log(e.target.value);
    }
  };
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onClick={handleClickImageUploadPlaceButton}
        onChange={handleChangeImageUploadPlaceButton}
        name="image"
      />
      <label htmlFor="select-image" style={{ marginLeft: "0px" }}>
        <StyleButtonImage
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
        </StyleButtonImage>
      </label>
    </Stack>
  );
};

export default ImageUploadPlaceButton;
