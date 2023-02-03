import React from "react";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";

// Styled component for the upload image button
const StyleButtonImage = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// formInputsHandler is pointer to a function that is called when the input field's value changes or the button is clicked.
// isLoading is a boolean indicating whether the image is loaded or not
// showSuccess helps us disable the button(s) after clicking the form
const ImageUploadButton = ({ formInputsHandler, isLoading, showSuccess }) => {
  // Event handler when the input file changes (changes the image and reflects that change)
  const handleChangeImageUploadPlaceButton = (e) => {
    if (e.target.files[0]) {
      formInputsHandler(e);
    }
  };
  // Event handler when the input file is clicked (opens up a select image for user to select image)
  const handleClickImageUploadPlaceButton = (e) => {
    if (e.target.files[0]) {
      formInputsHandler(e);
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
          disableRipple={true}
          disabled={isLoading ? true : false || showSuccess ? true : false}
          component="span"
          sx={{
            fontWeight: 500,
            textTransform: "none",
            // fontSize for different screen sizes
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

export default ImageUploadButton;
