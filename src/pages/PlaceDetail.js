import React from "react";
import Feed from "../shared/components/Navigation/Feed/Feed";

const PlaceDetail = () => {
  return (
    <React.Fragment>
      {/* <SidebarBackground /> */}
      <Feed bgcolor={"backgroundColor"} onDetail={true} />
    </React.Fragment>
  );
};

export default PlaceDetail;
