import React from "react";

import { Stack } from "@mui/material";

const ButtonsWrapper = (props) => {
  return (
    <Stack direction="row-reverse" spacing={1} justifyContent="space-between">
      {props.children}
    </Stack>
  );
};

export default ButtonsWrapper;
