import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, IconButton } from "@mui/material";
import styled from "@emotion/styled";

const StyleFavoriteBorderIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
  // color: "#da4453",
  "&:hover": {
    backgroundColor: "#db2d3f0f",
    color: "#db2d3f",
  },
}));

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

const FavoriteButton = ({
  isFavorite = "",
  onFavoriteHandler,
  onChangeFavorite,
  onLoadedPlaces,
  onCount,
}) => {
  const [newFavorite, setNewFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    if (onChangeFavorite) {
      if (onChangeFavorite.favorite === true) {
        setNewFavorite(true);
      } else {
        setNewFavorite(false);
      }
    }
  }, [onChangeFavorite]);

  const handlerClickFavorite = () => {
    setFavoriteCount(true);
    // if (onChangeFavorite.favorite) {
    //   setPlaceFavorites(userLikeValue + 1);
    // } else {
    //   setPlaceFavorites(userLikeValue - 1);
    // }
    // setTimeout(() => {
    //   fetchPlaces();
    // }, "100");
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
      // onChange={(e) => {
      //                     formInputsHandler(e);
      //                     titleChangeHandler(e);
      //                   }}
      sx={{
        paddingTop: "0px",
        paddingBottom: "0px",
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
      {favoriteCount && onCount && newFavorite
        ? onCount.favoritesUserIds.length
        : favoriteCount && onCount && !newFavorite
        ? onCount.favoritesUserIds.length - 1
        : onLoadedPlaces.favoritesUserIds.length}
    </IconButtonModified>
  );
};

export default FavoriteButton;
