import React from "react";

import { Button, Stack } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// onHandleOpen is a pointer to a function that opens the map Modal on ButtonsWrapper
const ButtonSeeMap = ({ onHandleOpen }) => {
  return (
    <Stack
      direction="row"
      sx={{
        //* marginTop for different screen sizes
        marginTop: {
          sps: "-4px",
          ps: "-39px",
          ts: "-39px",
          sls: "-37px",
          sms: "-46px",
          sc: "-46px",
          nsc: "-46px",
          ns: "-46px",
          msc: "-46px",
          mns: "-46px",
          ms: "-46px",
          lgs: "-46px",
        },
        //* paddingLeft for different screen sizes
        paddingLeft: {
          sps: "129px",
          ps: "214px",
          ts: "276px",
          sls: "322px",
          sms: "534px",
          sc: "534px",
          nsc: "534px",
          ns: "534px",
          msc: "534px",
          mns: "534px",
          ms: "534px",
          lgs: "534px",
        },
      }}
    >
      <StyleButton
        disableRipple={true}
        onClick={onHandleOpen}
        sx={{
          fontWeight: 500,
          textTransform: "none",
          //* fontSize for different screen sizes
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
