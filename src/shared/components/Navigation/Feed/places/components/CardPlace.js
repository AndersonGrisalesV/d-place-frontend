import React from "react";

import AvatarWrapper from "./Avatar/AvatarWrapper";
import ButtonsWrapper from "./Buttons/ButtonsWrapper";
import CardImages from "./CardImages";
import CardTitle from "./CardTitle";
import CardWrapper from "./CardWrapper";

//* onMap is a boolean that is passed down by PlaceDetail page
//* loadedPlaces is the places passed down by Place, Feed, FavoritePlaces, ProfilePlaces or PlaceGetById
const CardPlaces = ({ onMap = false, loadedPlaces }) => {
  return (
    <CardWrapper>
      <AvatarWrapper loadedPlaces={loadedPlaces} />
      <CardImages loadedPlaces={loadedPlaces} />
      <CardTitle onMap={onMap} loadedPlaces={loadedPlaces} />
      <ButtonsWrapper onMap={onMap} loadedPlaces={loadedPlaces} />
    </CardWrapper>
  );
};

export default CardPlaces;
