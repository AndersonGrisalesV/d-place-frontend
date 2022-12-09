import React from "react";
import CardImages from "./CardImages";
import AvatarWrapper from "./Avatar/AvatarWrapper";
import CardTitle from "./CardTitle";
import ButtonsWrapper from "./Buttons/ButtonsWrapper";
import CardWrapper from "./CardWrapper";

const CardPlaces = ({ onMap = false, loadedPlaces, onClearListItems }) => {
  return (
    <CardWrapper>
      <AvatarWrapper loadedPlaces={loadedPlaces} />
      <CardImages loadedPlaces={loadedPlaces} />
      <CardTitle onMap={onMap} loadedPlaces={loadedPlaces} />
      <ButtonsWrapper
        onMap={onMap}
        loadedPlaces={loadedPlaces}
        onClearListItems={onClearListItems}
      />
    </CardWrapper>
  );
};

export default CardPlaces;
