import { CardMedia } from "@mui/material";
import React from "react";

const CardImages = () => {
  return (
    <CardMedia
      sx={{ height: "min-content" }}
      component="img"
      height="194"
      image="https://areajugones.sport.es/wp-content/uploads/2022/09/bleach-tybw-akksakls.jpg"
      alt="Paella dish"
    />
  );
};

export default CardImages;
