import React from "react";

import Feed from "../shared/components/Navigation/Feed/Feed";

const Profile = () => {
  return (
    <React.Fragment>
      <Feed bgcolor={"backgroundColor"} onProfile={true} />
    </React.Fragment>
  );
};

export default Profile;
