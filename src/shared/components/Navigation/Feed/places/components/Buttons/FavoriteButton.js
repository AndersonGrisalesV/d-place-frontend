import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, IconButton } from "@mui/material";
import styled from "@emotion/styled";

// Styled component for FavoriteBorderIcon
const StyleFavoriteBorderIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
  "&:hover": {
    backgroundColor: "#db2d3f0f",
    color: "#db2d3f",
  },
}));

// Styled component for FavoriteIcon
const StyleFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
  color: "#da4453",
  "&:hover": {
    backgroundColor: "#db2d3f0f",
    color: "#db2d3f",
  },
}));

const IconButtonModified = styled(IconButton)({});

// isFavorite is a boolean that indicates if a place is favorite by the user who's loggedIn
// onFavoriteHandler is a pointer to a function that sets or removes a favorites from the user on ButtonsWrapper
// onChangeFavorite is a boolean that indicates if a user wants to change a place to favorite or remove said favorite on ButtonsWrapper
// loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
// onCount is a boolean that indicates if a place is liked by the user or not on ButtonsWrapper
const FavoriteButton = ({
  isFavorite = "",
  onFavoriteHandler,
  onChangeFavorite,
  onLoadedPlaces,
  onCount,
}) => {
  const [newFavorite, setNewFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Checks if user wants to change the state of the place to favorite or remove favorite and sets a state for this new change
  useEffect(() => {
    if (onChangeFavorite) {
      if (onChangeFavorite.favorite === true) {
        setNewFavorite(true);
      } else {
        setNewFavorite(false);
      }
    }
  }, [onChangeFavorite]);

  // Sets a new count for favorites to display in real time without having to send an API request to the backend
  const handlerClickFavorite = () => {
    setFavoriteCount(true);
  };

  return (
    <IconButtonModified
      disableRipple={true}
      aria-label="add to favorites"
      style={{
        backgroundColor: "transparent",
      }}
      title="Like"
      onClick={(e) => {
        onFavoriteHandler(e);
        handlerClickFavorite(e);
      }}
      sx={{
        paddingTop: "0px",
        paddingBottom: "0px",
        // fontSize for different screen sizes
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "12px",
          sls: "13px",
          sms: "14px",
          sc: "14px",
          nsc: "14px",
          ns: "14px",
          msc: "14px",
          mns: "14px",
          ms: "14px",
          lgs: "14px",
        },
      }}
    >
      <Checkbox
        disableRipple={true}
        checked={onChangeFavorite ? newFavorite : isFavorite}
        style={{
          backgroundColor: "transparent",
        }}
        icon={
          <StyleFavoriteBorderIcon
            sx={{
              backgroundColor: "transparent",
              // width for different screen sizes
              width: {
                sps: "15px",
                ps: "16px",
                ts: "18px",
                sls: "20px",
                sms: "24px",
                sc: "24px",
                nsc: "24px",
                ns: "24px",
                msc: "24px",
                mns: "24px",
                ms: "24px",
                lgs: "24px",
              },
              // height for different screen sizes
              height: {
                sps: "18px",
                ps: "20px",
                ts: "22px",
                sls: "22px",
                sms: "30px",
                sc: "30px",
                nsc: "30px",
                ns: "30px",
                msc: "30px",
                mns: "30px",
                ms: "30px",
                lgs: "30px",
              },
            }}
          />
        }
        checkedIcon={
          <StyleFavoriteIcon
            sx={{
              backgroundColor: "transparent",
              color: "red",
              // width for different screen sizes
              width: {
                sps: "15px",
                ps: "16px",
                ts: "18px",
                sls: "20px",
                sms: "24px",
                sc: "24px",
                nsc: "24px",
                ns: "24px",
                msc: "24px",
                mns: "24px",
                ms: "24px",
                lgs: "24px",
              },
              // height for different screen sizes
              height: {
                sps: "18px",
                ps: "20px",
                ts: "22px",
                sls: "22px",
                sms: "30px",
                sc: "30px",
                nsc: "30px",
                ns: "30px",
                msc: "30px",
                mns: "30px",
                ms: "30px",
                lgs: "30px",
              },
            }}
          />
        }
      />
      {/* Check if favoriteCount, onCount, and newFavorite are truthy,
       If all are truthy, set length to onCount's favoritesUserIds length
       If favoriteCount and onCount are truthy, but newFavorite is falsy, 
        set length to onCount's favoritesUserIds length minus 1
         If none of the above conditions are met, 
         set length to onLoadedPlaces' favoritesUserIds length
       */}
      {favoriteCount && onCount && newFavorite
        ? onCount.favoritesUserIds.length
        : favoriteCount && onCount && !newFavorite
        ? onCount.favoritesUserIds.length - 1
        : onLoadedPlaces.favoritesUserIds.length}
    </IconButtonModified>
  );
};

export default FavoriteButton;
