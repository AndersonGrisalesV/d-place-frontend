import React from "react";

import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

const ImagePreviewButton = ({ imageUrl, selectedImageName }) => {
  return (
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
    </React.Fragment>
  );
};

export default ImagePreviewButton;
