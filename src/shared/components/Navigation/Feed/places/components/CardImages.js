import React from "react";
import { CardMedia } from "@mui/material";

const CardImages = ({ loadedPlaces }) => {
  return (
    <CardMedia
      sx={{ height: "100%", objectFit: "contain" }}
      component="img"
      height="194"
      image={loadedPlaces.imageUrl.url}
      alt={loadedPlaces.title}
    />
  );
};

export default CardImages;
