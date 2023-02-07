import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../context/login-context";

import { CardMedia } from "@mui/material";

//* loadedPlaces is the places passed down by Place, Feed, FavoritePlaces, ProfilePlaces or PlaceGetById
const CardImages = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);
  let navigate = useNavigate();

  // Function that enables users to click the image and sends them to said image's place details
  const handleNavigateToPost = () => {
    if (loadedPlaces) {
      navigate(`/api/places/${loadedPlaces.id}`);
      login.listItemsNotListed(loadedPlaces.id);
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
