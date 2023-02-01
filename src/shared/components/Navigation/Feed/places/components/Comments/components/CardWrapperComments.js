import React from "react";

import { Box } from "@mui/system";
import { Card } from "@mui/material";
import styled from "@emotion/styled";

const BoxStyled = styled(Box)(() => ({
  display: {
    sps: "flex",
    ps: "flex",
    ts: "flex",
    sls: "flex",
    sms: "flex",
    sc: "flex",
    ns: "flex",
    msc: "flex",
    mns: "flex",
    ms: "flex",
    lgs: "flex",
  },
  justifyContent: "center",
  height: {
    ns: "514px",
    mns: "514px",
    msc: "514px",
    ms: "514px",
    lgs: "514px",
  },
  maxWidth: {
    ns: "800px",
    msc: "800px",
    mns: "800px",
    ms: "800px",
    lgs: "800px",
  },
}));
const CardWrapperComments = (props) => {
  return (
    <BoxStyled>
      <Card
        sx={{
          borderRadius: "18px",
          maxWidth: {
            sps: "200px",
            ps: "285px",
            ts: "350px",
            sls: "400px",
            sms: "618px",
            sc: "618px",
            nsc: "618px",
            ns: "618px",
            msc: "618px",
            mns: "618px",
            ms: "618px",
            lgs: "618px",
          },
        }}
      >
        {props.children}
      </Card>
    </BoxStyled>
  );
};

export default CardWrapperComments;
