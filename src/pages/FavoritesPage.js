import React from "react";

import FavoritePlaces from "../shared/components/Navigation/Feed/FavoritePlaces";

const HomePage = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      {/* The FavoritePlaces component needs the "bgcolor" props for it to display 
      the proper background color */}
      {/* onFilterSearch is a callback function passed as a prop from its parent 
      component used for filtering on FavoritePlacesPage*/}
      <FavoritePlaces
        bgcolor={"backgroundColor"}
        onFilterSearch={onFilterSearch}
      />
    </React.Fragment>
  );
};

export default HomePage;
