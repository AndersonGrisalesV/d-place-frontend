import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";
import Rightbar from "../shared/components/Navigation/RightBar/RightBar";

const HomePage = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      <Feed bgcolor={"backgroundColor"} onFilterSearch={onFilterSearch} />
      <Rightbar />
    </React.Fragment>
  );
};

export default HomePage;
