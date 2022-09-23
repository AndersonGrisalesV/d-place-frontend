import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

const buttonColor = red["A400"];

const LoginButton = () => {
  return (
    <Box
      sx={{
        display: {
          sps: "none",
          ps: "none",
          ts: "none",
          sls: "none",
          sms: "none",
          sc: "flex",
          ns: "flex",
          ms: "flex",
          lgs: "flex",
        },
      }}
    >
      <Button
        variant="contained"
        sx={{ textTransform: "none", bgcolor: `${buttonColor}` }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default LoginButton;
