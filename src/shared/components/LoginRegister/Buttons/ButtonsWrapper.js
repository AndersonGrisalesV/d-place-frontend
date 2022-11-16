import React from "react";

import { Stack } from "@mui/material";

const ButtonsWrapper = (props) => {
  return (
    <Stack direction="column" spacing={2} justifyContent="space-between">
      {props.children}
    </Stack>
  );
};

export default ButtonsWrapper;
