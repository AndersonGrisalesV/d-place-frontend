import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";
import Rightbar from "../shared/components/Navigation/RightBar/RightBar";

const HomePage = ({ onFilterSearch, onClearListItems }) => {
  return (
    <React.Fragment>
      <Feed
        bgcolor={"backgroundColor"}
        onFilterSearch={onFilterSearch}
        onClearListItems={onClearListItems}
      />
      <Rightbar />
    </React.Fragment>
  );
};

export default HomePage;
