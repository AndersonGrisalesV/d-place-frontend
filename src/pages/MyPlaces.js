import React from "react";

import ProfilePlaces from "../shared/components/Navigation/Feed/ProfilePlaces";

const MyPlaces = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      {/* The ProfilePlaces component needs the "bgcolor" props for it to display 
      the proper background color */}
      {/* onFilterSearch is a callback function passed as a prop from its parent 
      component used for filtering on ProfilePlacesPage*/}
      <ProfilePlaces
        bgcolor={"backgroundColor"}
        onFilterSearch={onFilterSearch}
      />
    </React.Fragment>
  );
};

export default MyPlaces;
