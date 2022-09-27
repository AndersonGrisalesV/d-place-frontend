import React from "react";
import { Button, Stack } from "@mui/material";

import styled from "@emotion/styled";

const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ButtonDetails = () => {
  return (
    <Stack
      direction="row"
      sx={{
        paddingLeft: {
          sps: "51px",
          ps: "124px",
          ts: "185px",
          sls: "226px",
          sms: "427px",
          sc: "427px",
          nsc: "427px",
          ns: "427px",
          msc: "427px",
          mns: "427px",
          ms: "427px",
          lgs: "427px",
        },
      }}
    >
      <StyleButton
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
        See details
      </StyleButton>
    </Stack>
  );
};

export default ButtonDetails;
