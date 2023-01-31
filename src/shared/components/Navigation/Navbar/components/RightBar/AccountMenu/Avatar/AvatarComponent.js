import React, { useContext, useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import { AccountCircleOutlined } from "@mui/icons-material";
import { LoginContext } from "../../../../../../../context/login-context";
import { useHttpClient } from "../../../../../../../hooks/http-hook";

const AvatarComponent = () => {
  const login = useContext(LoginContext);

  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [succssProfilePhoto, setSuccessProfilePhoto] = useState(false);

  useEffect(() => {
    if (!succssProfilePhoto || login.newAvatar) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/profile/${login.userId}`,
            "GET",
            null,
            {
              Authorization: "Bearer " + login.token,
            }
          );

          console.log(responseData.user);
          setLoadedPlace(responseData.user);
        } catch (err) {}
      };
      fetchPlaces();
    }
    setSuccessProfilePhoto(true);
    login.refreshAvatar();
  }, [sendRequest, succssProfilePhoto, login]);

  return (
    <>
      {!isLoading && loadedPlace ? (
        <Avatar
          src={loadedPlace.imageUrl.url ? loadedPlace.imageUrl.url : ""}
          title={loadedPlace.name}
          sx={{
            color: "#fff",
            cursor: "pointer",
            fontSize: {
              sps: "10px",
              ps: "12px",
              ts: "14px",
              sls: "15px",
              sms: "18px",
              sc: "18px",
              nsc: "18px",
              ns: "18px",
              msc: "18px",
              mns: "18px",
              ms: "18px",
              lgs: "18px",
            },
            bgcolor: "#da4453c7",
            width: {
              sps: "28px",
              ps: "31px",
              ts: "34px",
              sls: "36px",
              sms: "40px",
              sc: "40px",
              nsc: "40px",
              ns: "40px",
              msc: "40px",
              mns: "40px",
              ms: "40px",
              lgs: "40px",
            },
            height: {
              sps: "28px",
              ps: "31px",
              ts: "34px",
              sls: "36px",
              sms: "40px",
              sc: "40px",
              nsc: "40px",
              ns: "40px",
              msc: "40px",
              mns: "40px",
              ms: "40px",
              lgs: "40px",
            },
          }}
          aria-label="recipe"
        >
          {loadedPlace.imageUrl.url === "" ? loadedPlace.name.charAt(0) : ""}
        </Avatar>
      ) : (
        <AccountCircleOutlined />
      )}
    </>
  );
};

export default AvatarComponent;
