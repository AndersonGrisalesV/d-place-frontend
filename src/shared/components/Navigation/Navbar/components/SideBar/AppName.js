import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { LoginContext } from "../../../../../context/login-context";

const AppName = () => {
  const [activateAnimation, setActivateAnimation] = useState(false);

  const login = useContext(LoginContext);

  let navigate = useNavigate();

  const handleClickAppName = () => {
    setActivateAnimation(true);
    navigate("/homepage");
    login.listItemsCleanHomepage(0);
    setTimeout(() => {
      setActivateAnimation(false);
    }, "2000");
  };
  return (
    <React.Fragment>
      <Typography
        className={
          activateAnimation ? "animate__animated animate__jackInTheBox" : ""
        }
        onClick={handleClickAppName}
        mouse={"pointer"}
        fontWeight={600}
        variant="h6"
        component="div"
        sx={{
          cursor: "pointer",
          marginLeft: "3px",
          display: {
            sps: "none",
            ps: "none",
            ts: "none",
            sls: "none",
            sms: "none",
            sc: "none",
            nsc: "none",
            ns: "block",
            msc: "block",
            mns: "block",
            ms: "block",
            lgs: "block",
          },
        }}
      >
        Dplace
      </Typography>
    </React.Fragment>
  );
};

export default AppName;
