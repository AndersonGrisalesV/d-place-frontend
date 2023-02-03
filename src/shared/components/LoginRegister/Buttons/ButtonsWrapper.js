import React from "react";

import { Stack } from "@mui/material";

// Wraps the buttons LoginRegisterButton, CreateAccountButton on LoginRegisterPage
const ButtonsWrapper = (props) => {
  return (
    <Stack direction="row-reverse" spacing={1} justifyContent="space-between">
      {props.children}
    </Stack>
  );
};

export default ButtonsWrapper;
