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
      <CardImages DUMMY_PLACES={DUMMY_PLACES} />
      <CardTitle onMap={onMap} DUMMY_PLACES={DUMMY_PLACES} />
      <ButtonsWrapper onMap={onMap} DUMMY_PLACES={DUMMY_PLACES} />
    </CardWrapper>
  );
};

export default CardPlaces;
