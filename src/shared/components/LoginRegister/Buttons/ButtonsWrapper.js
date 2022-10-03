import { Stack } from "@mui/material";
import React from "react";

const ButtonsWrapper = (props) => {
  return (
    <Stack direction="column" spacing={2} justifyContent="space-between">
      {props.children}
    </Stack>
  );
};

export default ButtonsWrapper;
