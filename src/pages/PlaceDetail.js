import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";

const PlaceDetail = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      {/* The Feed component needs the "bgcolor" props for it to display 
      the proper background color */}
      {/* onFilterSearch is a callback function passed as a prop from its parent 
      component used for filtering on FeedPage*/}
      {/* onDetail, onMap are props passed down to Feed 
      component used for showing an individul place or showing a map of a place on 
      FeeedPage and PlaceGetByIdPage*/}
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
