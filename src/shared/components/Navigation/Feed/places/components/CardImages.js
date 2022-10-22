import React from "react";
import { CardMedia } from "@mui/material";

const CardImages = ({ DUMMY_PLACES }) => {
  return (
    <CardMedia
      sx={{ maxHeight: "800px", objectFit: "contain" }}
      component="img"
      height="194"
      image={DUMMY_PLACES.imageUrl}
      alt={DUMMY_PLACES.title}
    />
  );
};

export default CardImages;
