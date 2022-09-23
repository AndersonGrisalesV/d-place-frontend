import { Box } from "@mui/material";
import React from "react";

const SidebarBackground = () => {
  return (
    <Box
      // width="100%"
      // height="100%"
      // flex={1}
      // p={0}
      // sx={{ display: { xs: "none", sm: "block" } }}
      sx={{ bgcolor: "background.paper" }}
    >
      <svg
        sx={{
          alignItems: "stretch",
        }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          alignItems: "stretch",
          display: "flex",
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
        width="320"
        height="1028"
        viewBox="878 0 320 1028"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.0025 0.49918L209.217 0.563727C209.217 0.563727 314.747 131.896 314.59 245.319C314.433 358.743 261.116 420.723 208.512 509.53C169.237 575.832 99.0257 717.689 123.934 839.895C148.841 962.102 313.505 1027.57 313.505 1027.57L0.820801 1027.83L19.0025 0.849918Z"
          fill="#da4453"
        />
      </svg>
    </Box>
  );
};

export default SidebarBackground;
