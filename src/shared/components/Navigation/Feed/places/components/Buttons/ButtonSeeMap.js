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

const ButtonSeeMap = ({ onHandleOpen }) => {
  return (
    <Stack
      direction="row"
      sx={{
        paddingLeft: {
          sps: "148px",
          ps: "90px",
          ts: "148px",
          sls: "188px",
          sms: "388px",
          sc: "388px",
          nsc: "388px",
          ns: "388px",
          msc: "388px",
          mns: "388px",
          ms: "388px",
          lgs: "388px",
        },
      }}
    >
      <StyleButton
        onClick={onHandleOpen}
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
        See map
      </StyleButton>
    </Stack>
  );
};

export default ButtonSeeMap;
