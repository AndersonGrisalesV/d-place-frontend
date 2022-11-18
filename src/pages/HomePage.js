import React, { useContext, useEffect, useState } from "react";

import Rightbar from "../shared/components/Navigation/RightBar/RightBar";
import Feed from "../shared/components/Navigation/Feed/Feed";
import SnackBarResultLogin from "../shared/components/LoginRegister/components/SnackBarResultLogin";
import { LoginContext } from "../shared/context/login-context";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  // const login = useContext(LoginContext);
  // const { state } = useLocation();
  // const [changeState, setChangeState] = useState(login.isLoggedIn);
  // console.log(state);

  // useEffect(() => {}, [setChangeState]);

  return (
    <React.Fragment>
      {/* {login.isLoggedIn && state.response === "Welcome back" && (
        <SnackBarResultLogin
          onSuccess={changeState}
          setChangeState={setChangeState}
          message={state.response}
          logUser={state.user}
        />
      )} */}
      <Feed bgcolor={"backgroundColor"} />
      <Rightbar />
    </React.Fragment>
  );
};

export default HomePage;
