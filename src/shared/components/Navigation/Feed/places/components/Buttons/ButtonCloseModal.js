import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, styled, Zoom } from "@mui/material";

const StyleCloseIcon = styled(CloseIcon)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453c7",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ButtonCloseModal = ({ handleClose }) => {
  return (
    <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignAitems: "flex-start",
          backgroundColor: "transparent",
          marginRight: {
            sps: "20px",
            ps: "20px",
            ts: "19px",
            sls: "19px",
            sms: "17px",
            sc: "17.5px",
            nsc: "17.5px",
            ns: "17.8px",
            msc: "18px",
            mns: "17.8px",
            ms: "17px",
            lgs: "20px",
          },
          marginTop: "9px",
        }}
      >
        <StyleCloseIcon
          onClick={handleClose}
          sx={{
            cursor: "pointer",
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
    </Zoom>
  );
};

export default ButtonCloseModal;
