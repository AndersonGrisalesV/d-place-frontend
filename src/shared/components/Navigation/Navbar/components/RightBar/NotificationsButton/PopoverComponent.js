import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import { useHttpClient } from "../../../../../../hooks/http-hook";

import AvatarNotification from "./AvatarNotification";

import { Popover, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";

//* Styled component for Stack
const StyleStack = styled(Stack)(({ theme }) => ({
  "&:hover": {
    color:
      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
    [`${Typography}`]: {
      color: "#9b9b9bc7",
    },
  },
}));

//* anchorEl is a boolean that indicates if the popOver is to be open or not on NotificationButton
//* onHandleClose is a pointer to a function he that closes the popOver on NotificationButton
//* loadedPlaces is a state with the places passed down by NotificationButton
//* onPost is a boolean that indicates that a new post is beign added on NotificationButton
//* setLoadedPlaces a setState with the places passed down by NotificationButton in order to be updated here once a new Place has been added
// onCloseMenuResponsive is a pointer to a function that closes  the mobile menu on AccountMenuMobile
const PopoverComponent = ({
  anchorEl,
  onHandleClose,
  loadedPlaces,
  onPost = false,
  setLoadedPlaces,
  onCloseMenuResponsive = null,
}) => {
  const login = useContext(LoginContext);

  let navigate = useNavigate();

  const { isLoading, sendRequest } = useHttpClient();

  const [updatedPlaceId, setUpdatedPlaceId] = useState(null);
  const [count, setCount] = useState(0);

  // useEffect to send an API request to the backend to fetch places in order to get the recently added place to show the popOver
  useEffect(() => {
    if (onPost) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/homepage`
          );

          setLoadedPlaces(responseData.places);

          setUpdatedPlaceId(responseData.places.reverse().slice(0, 1)[0]);
        } catch (err) {}
      };
      if (count === 0) {
        fetchPlaces();
        setCount(1);
      }
    }
  }, [onPost, sendRequest, setLoadedPlaces, count]);

  // handleNewPost function to navigate to the place shown in the popOver and to clean the leftSideBar
  const handleNewPost = () => {
    login.listItemsNotListed();
    navigate(`/api/places/${updatedPlaceId._id}`);
    onHandleClose();
    login.listItemsNotListed(updatedPlaceId._id);
    if (onCloseMenuResponsive) {
      onCloseMenuResponsive();
    }
  };

  return (
    <React.Fragment>
      {!isLoading && loadedPlaces ? (
        <Popover
          open={anchorEl ? true : false}
          anchorEl={anchorEl}
          onClose={onHandleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 1.5, fontWeight: "600" }}>
            Notifications
          </Typography>
          <StyleStack
            direction="row"
            spacing={0}
            sx={{ cursor: "pointer" }}
            onClick={handleNewPost}
          >
            <AvatarNotification loadedPlaces={loadedPlaces} />

            <Typography
              variant="body1"
              fontWeight={500}
              fontSize={14}
              sx={{ p: 2, paddingTop: "7px" }}
            >
              {`New post by ${
                !updatedPlaceId
                  ? loadedPlaces.reverse().slice(0, 1)[0].creatorId.name
                  : updatedPlaceId.creatorId.name
              }`}
            </Typography>
          </StyleStack>
        </Popover>
      ) : null}
    </React.Fragment>
  );
};

export default PopoverComponent;
