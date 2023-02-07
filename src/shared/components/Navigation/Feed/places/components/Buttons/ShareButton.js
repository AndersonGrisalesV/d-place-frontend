import React, { useEffect, useState } from "react";

import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { green } from "@mui/material/colors";
import { Checkbox, IconButton, styled } from "@mui/material";

// Personalized color from MUI
const colorGreen = green[600];

// Styled component for ShareOutlinedIcon
const StyleShareBorderIcon = styled(ShareOutlinedIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#ffffffb3" : "#00000099",
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

// Styled component for ShareIcon
const StyleShareIcon = styled(ShareIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

// onClickLinks is a pointer to a function that sets the current target for the event
// onOpenMenuLinks contains the current value of the event target to feed the IconButton
// loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
// onSharePost is a boolean indicating if one of the links to share the post was clicked on ButtonsWrapper
// onChangeShareCount is state that updates the share count in real time without having to make an API call to the backend
const ShareButton = ({
  onClickLinks,
  onOpenMenuLinks,
  loadedPlaces,
  onSharePost = false,
  onChangeShareCount,
}) => {
  const [freezeShareIcon, setFreezeShareIcon] = useState(false);

  //* Checks if the share icon is clicked and executes the function that sets the current target for the event
  //* and declares a new state to control the output shown of the sharecounts without having to make a new API called
  const handleClickShareButton = (e) => {
    onClickLinks(e);
    setFreezeShareIcon(true);
  };

  const [storeValueToShow, setStoreValueToShow] = useState(0);

  //? useEffect checks when a post has been shared after the user clicked one sharable link on ButtonsWrapper and
  //? stores a new value to display the correct count of shares on the UI.
  //? if removed the share count won't display correctly
  useEffect(() => {
    if (onSharePost) {
      setStoreValueToShow(1);
    } else {
      setStoreValueToShow(0);
    }
  }, [onSharePost, setStoreValueToShow, storeValueToShow]);

  const unchecked = (
    <Checkbox
      disableRipple={true}
      style={{ backgroundColor: "transparent" }}
      icon={
        <StyleShareBorderIcon
          sx={{
            //* width for different screen sizes
            width: {
              sps: "14px",
              ps: "15px",
              ts: "17px",
              sls: "19px",
              sms: "23px",
              sc: "23px",
              nsc: "23px",
              ns: "23px",
              msc: "23px",
              mns: "23px",
              ms: "23px",
              lgs: "23px",
            },
            //* height for different screen sizes
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
        <StyleShareBorderIcon
          sx={{
            //* width for different screen sizes
            width: {
              sps: "14px",
              ps: "15px",
              ts: "17px",
              sls: "19px",
              sms: "23px",
              sc: "23px",
              nsc: "23px",
              ns: "23px",
              msc: "23px",
              mns: "23px",
              ms: "23px",
              lgs: "23px",
            },
            //* height for different screen sizes
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
  );

  const checked = (
    <Checkbox
      disableRipple={true}
      style={{ backgroundColor: "transparent" }}
      icon={
        <StyleShareIcon
          sx={{
            color: `${colorGreen}`,
            //* width for different screen sizes
            width: {
              sps: "14px",
              ps: "15px",
              ts: "17px",
              sls: "19px",
              sms: "23px",
              sc: "23px",
              nsc: "23px",
              ns: "23px",
              msc: "23px",
              mns: "23px",
              ms: "23px",
              lgs: "23px",
            },
            //* height for different screen sizes
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
        <StyleShareIcon
          sx={{
            color: `${colorGreen}`,
            //* width for different screen sizes
            width: {
              sps: "14px",
              ps: "15px",
              ts: "17px",
              sls: "19px",
              sms: "23px",
              sc: "23px",
              nsc: "23px",
              ns: "23px",
              msc: "23px",
              mns: "23px",
              ms: "23px",
              lgs: "23px",
            },
            //* height for different screen sizes
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
  );

  return (
    <IconButton
      disableRipple={true}
      id="basic-button"
      aria-controls={onOpenMenuLinks ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={onOpenMenuLinks ? "true" : undefined}
      onClick={(e) => handleClickShareButton(e)}
      aria-label="share"
      style={{ backgroundColor: "transparent" }}
      title="Share"
      sx={{
        paddingTop: "0px",
        paddingBottom: "0px",
        //* fontSize for different screen sizes
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
      {/* Check if freezeShareIcon and onSharePost are truthy or falsy */}
      {freezeShareIcon && onSharePost ? checked : unchecked}
      {/*  If onSharePost is truthy, calculate the sum of loadedPlaces.shareCount 
      and onChangeShareCount and assign it to the final result 
       If onSharePost is falsy, 
       assign the value of loadedPlaces.shareCount to the final result*/}
      {onSharePost
        ? loadedPlaces.shareCount + onChangeShareCount
        : loadedPlaces.shareCount}
    </IconButton>
  );
};

export default ShareButton;
