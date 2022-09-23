import React from "react";
import Rightbar from "../shared/components/Navigation/RightBar/RightBar";
import Feed from "../shared/components/Navigation/Feed/Feed";

const HomePage = () => {
  return (
    <React.Fragment>
      {/* <SidebarBackground /> */}
      <Feed bgcolor={"backgroundColor"} />
      <Rightbar />
    </React.Fragment>
  );
};

export default HomePage;
