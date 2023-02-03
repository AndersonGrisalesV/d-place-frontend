import React from "react";

import EditPlacePost from "../shared/components/Navigation/Feed/places/EditPlace/EditPlacePost";

const EditPlace = () => {
  return (
    <React.Fragment>
      {/* The EditPlacePost component needs the "bgcolor" props for it to display
       the proper background color */}
      <EditPlacePost bgcolor={"backgroundColor"} />
    </React.Fragment>
  );
};

export default EditPlace;
