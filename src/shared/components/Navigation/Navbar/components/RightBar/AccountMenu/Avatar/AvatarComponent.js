import React, { useContext, useEffect, useState } from "react";

import { LoginContext } from "../../../../../../../context/login-context";

import { useHttpClient } from "../../../../../../../hooks/http-hook";

import { AccountCircleOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

const AvatarComponent = () => {
  const login = useContext(LoginContext);

  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const [succssProfilePhoto, setSuccessProfilePhoto] = useState(false);

  // Using useEffect hook to fetch the user data and set it in the loadedPlace state
  useEffect(() => {
    // If successProfilePhoto is false or the newAvatar in the login context has changed
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
          // Setting the fetched user data in the loadedPlace state
          setLoadedPlace(responseData.user);
        } catch (err) {}
      };

      fetchPlaces();
    }
    // Setting successProfilePhoto to true
    setSuccessProfilePhoto(true);
    // Calling the refreshAvatar function in the login context
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
            //* fontSize for different screen sizes
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
            //* width for different screen sizes
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
            //* height for different screen sizes
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
          {/* If there's no image then it selects the first letter of the user */}
          {loadedPlace.imageUrl.url === "" ? loadedPlace.name.charAt(0) : ""}
        </Avatar>
      ) : (
        <AccountCircleOutlined />
      )}
    </>
  );
};

export default AvatarComponent;
