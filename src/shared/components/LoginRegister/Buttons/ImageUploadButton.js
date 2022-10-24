import React from "react";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const StyleButtonImage = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ImageUploadButton = ({ formInputsHandler }) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={formInputsHandler}
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

export default ImageUploadButton;