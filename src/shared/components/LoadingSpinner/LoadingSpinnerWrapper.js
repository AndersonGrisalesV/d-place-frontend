import React from "react";

import { Stack } from "@mui/material";

const LoadingSpinnerWrapper = (props) => {
  let loadingSpinner = null;

  if (props.onLogin) {
    loadingSpinner = (
      <Stack
        direction="column"
        spacing={2}
        justifyContent="space-between"
        sx={{
          display: "flex",
          alignItems: "center",
          width: {
            sps: "122%",
            ps: "112%",
            ts: "109%",
            sls: "108%",
            sms: "107%",
            sc: "105%",
            nsc: "105%",
            ns: "106%",
            msc: "106%",
            mns: "106%",
            ms: "106%",
            lgs: "106%",
          },
        }}
      >
        {props.children}
      </Stack>
    );
  } else if (props.onNewPlace) {
    loadingSpinner = (
      <Stack
        direction="column"
        spacing={2}
        justifyContent="space-between"
        sx={{
          display: "flex",
          alignItems: "center",
          width: {
            sps: "122%",
            ps: "112%",
            ts: "109%",
            sls: "108%",
            sms: "107%",
            sc: "105%",
            nsc: "105%",
            ns: "106%",
            msc: "106%",
            mns: "106%",
            ms: "106%",
            lgs: "106%",
          },
        }}
      >
        {props.children}
      </Stack>
    );
  }

  return <>{loadingSpinner}</>;
};

export default LoadingSpinnerWrapper;