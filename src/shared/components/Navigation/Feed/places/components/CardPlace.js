import React from "react";

import AvatarWrapper from "./Avatar/AvatarWrapper";
import ButtonsWrapper from "./Buttons/ButtonsWrapper";
import CardImages from "./CardImages";
import CardTitle from "./CardTitle";
import CardWrapper from "./CardWrapper";

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
