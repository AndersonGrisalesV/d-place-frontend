import React from "react";

import FavoritePlaces from "../shared/components/Navigation/Feed/FavoritePlaces";

const HomePage = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      <FavoritePlaces
        bgcolor={"backgroundColor"}
        onFilterSearch={onFilterSearch}
      />
    </React.Fragment>
  );
};

export default HomePage;
