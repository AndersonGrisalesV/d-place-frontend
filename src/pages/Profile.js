import React from "react";

import ProfilePlaces from "../shared/components/Navigation/Feed/ProfilePlaces";

const Profile = ({ onFilterSearch }) => {
  return (
    <React.Fragment>
      <ProfilePlaces
        bgcolor={"backgroundColor"}
        onFilterSearch={onFilterSearch}
      />
    </React.Fragment>
  );
};

export default Profile;
