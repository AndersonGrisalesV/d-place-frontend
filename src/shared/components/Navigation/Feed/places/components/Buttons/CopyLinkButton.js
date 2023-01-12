import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Checkbox, IconButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { LoginContext } from "../../../../../../context/login-context";
import LinkIcon from "@mui/icons-material/Link";

const StyleLinkIcon = styled(LinkIcon)(({ theme }) => ({
  color: "#db2d3f",
  backgroundColor: "transparent",
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
  // color: "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#db2d3f",
  },
}));

const StyleFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
  color: "#da4453",
  "&:hover": {
    backgroundColor: "#db2d3f0f",
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
        transform: "rotate(45deg)",
      }}
      title="Like"
      sx={{
        paddingTop: "0px",
        paddingBottom: "0px",
      }}
    >
      <StyleLinkIcon
        disableRipple={true}
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
