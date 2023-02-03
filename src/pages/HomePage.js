import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";
import Rightbar from "../shared/components/Navigation/RightBar/RightBar";

const HomePage = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      {/* The Feed component needs the "bgcolor" props for it to display 
      the proper background color */}
      {/* onFilterSearch is a callback function passed as a prop from its parent 
      component used for filtering on Homepage*/}
      <Feed bgcolor={"backgroundColor"} onFilterSearch={onFilterSearch} />
      <Rightbar />
    </React.Fragment>
  );
};

export default HomePage;
