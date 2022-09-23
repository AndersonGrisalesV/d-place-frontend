import { CardActions, Stack } from "@mui/material";
import React from "react";
import ButtonDetails from "./ButtonDetails";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

const ButtonsWrapper = () => {
  return (
    <CardActions
      disableSpacing
      sx={{ paddingTop: "0px", paddingLeft: "0px", paddingBottom: "0px" }}
    >
      <Stack direction="row" spacing={-3}>
        <FavoriteButton />
        <ShareButton />
      </Stack>
      <ButtonDetails />
    </CardActions>
  );
};

export default ButtonsWrapper;
