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

const ButtonDeletePost = ({ onHandleOpenDeletePost }) => {
  return (
    <Stack direction="row">
      <StyleButton
        onClick={onHandleOpenDeletePost}
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
        Delete
      </StyleButton>
    </Stack>
  );
};

export default ButtonDeletePost;
