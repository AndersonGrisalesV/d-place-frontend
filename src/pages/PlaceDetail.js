import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";

const PlaceDetail = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      <Feed
        bgcolor={"backgroundColor"}
        onDetail={true}
        onMap={true}
        onFilterSearch={onFilterSearch}
      />
    </React.Fragment>
  );
};

export default PlaceDetail;
