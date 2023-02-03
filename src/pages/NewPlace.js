import React from "react";

import NewPlacePost from "../shared/components/Navigation/Feed/places/NewPlace/NewPlacePost";

const NewPlace = () => {
  return (
    <React.Fragment>
      {/* The NewPlacePost component needs the "bgcolor" props for it to display 
      the proper background color */}
      <NewPlacePost bgcolor={"backgroundColor"} />
    </React.Fragment>
  );
};

export default NewPlace;
