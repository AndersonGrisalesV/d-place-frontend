import React from "react";
import CardImages from "./CardImages";
import AvatarWrapper from "./Avatar/AvatarWrapper";
import CardTitle from "./CardTitle";
import ButtonsWrapper from "./Buttons/ButtonsWrapper";
import CardWrapper from "./CardWrapper";

const CardPlaces = () => {
  return (
    <CardWrapper>
      <AvatarWrapper />
      <CardImages />
      <CardTitle />
      <ButtonsWrapper />
    </CardWrapper>
  );
};

export default CardPlaces;
