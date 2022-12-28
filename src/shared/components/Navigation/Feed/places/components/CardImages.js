import React from "react";
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardImages = ({ loadedPlaces }) => {
  let navigate = useNavigate();

  const handleNavigateToPost = () => {
    if (loadedPlaces) {
      navigate(`/api/places/${loadedPlaces.id}`);
    }
  };
  return (
    <CardMedia
      onClick={handleNavigateToPost}
      sx={{ height: "100%", objectFit: "contain", cursor: "pointer" }}
      component="img"
      height="194"
      image={loadedPlaces.imageUrl.url}
      alt={loadedPlaces.title}
    />
  );
};

export default CardImages;
