import { AccountCircleOutlined } from "@mui/icons-material";
import { Popover, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../../context/login-context";
import { useHttpClient } from "../../../../../../hooks/http-hook";
import AvatarNotification from "./AvatarNotification";
import NotificationText from "./NotificationText";

const StyleStack = styled(Stack)(({ theme }) => ({
  "&:hover": {
    color:
      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
    [`${Typography}`]: {
      color: "#9b9b9bc7",
    },
  },
}));

const PopoverComponent = ({
  anchorEl,
  onHandleClose,
  loadedPlaces,
  onPost = false,
  setLoadedPlaces,
  onCloseMenuResponsive = null,
  onReloadPopComponent,
}) => {
  const login = useContext(LoginContext);

  let navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [updatedPlaceId, setUpdatedPlaceId] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (onPost) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/homepage`
          );

          setLoadedPlaces(responseData.places);

          setUpdatedPlaceId(responseData.places.reverse().slice(0, 1)[0]);
          setTimeout(() => {
            // navigate("/homepage");
            setReload(true);
          }, "100");
        } catch (err) {}
      };

      fetchPlaces();
    }
  }, [onPost, sendRequest, setLoadedPlaces, reload]);

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
      {!isLoading && loadedPlaces && reload ? (
        <Popover
          open={anchorEl ? true : false}
          anchorEl={anchorEl}
          onClose={onHandleClose}
          // anchorReference="anchorPosition"
          // anchorPosition={{ top: 67, left: 1084 }}
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
