import React from "react";

import { IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import styled from "@emotion/styled";

const StyleLinkIcon = styled(LinkIcon)(({ theme }) => ({
  color: "#db2d3f",
  backgroundColor: "transparent",
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,

  "&:hover": {
    backgroundColor: "transparent",
    color: "#db2d3f",
  },
}));

const CopyLinkButton = () => {
  return (
    <IconButton
      disableRipple={true}
      aria-label="add to favorites"
      style={{
        backgroundColor: "transparent",
        transform: "rotate(134deg)",
      }}
      title="Like"
      sx={{
        paddingTop: "0px",
        paddingBottom: "0px",
      }}
    >
      <StyleLinkIcon
        sx={{
          backgroundColor: "transparent",
          width: "24px",
          height: "30px",
        }}
      />
    </IconButton>
  );
};

export default CopyLinkButton;
