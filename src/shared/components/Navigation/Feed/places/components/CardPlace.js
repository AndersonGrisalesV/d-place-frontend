import React from "react";
import CardImages from "./CardImages";
import AvatarWrapper from "./Avatar/AvatarWrapper";
import CardTitle from "./CardTitle";
import ButtonsWrapper from "./Buttons/ButtonsWrapper";
import CardWrapper from "./CardWrapper";

const CardPlaces = ({ onMap = false, DUMMY_PLACES }) => {
  return (
    <CardWrapper>
      <AvatarWrapper DUMMY_PLACES={DUMMY_PLACES} />
      <CardImages />
      <CardTitle onMap={onMap} />
      <ButtonsWrapper onMap={onMap} />
    </CardWrapper>
  );
};

export default CardPlaces;
