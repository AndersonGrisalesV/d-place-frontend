import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Checkbox, IconButton, styled } from "@mui/material";
import { green } from "@mui/material/colors";

const colorGreen = green[600];

const StyleShareBorderIcon = styled(ShareOutlinedIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

const StyleShareIcon = styled(ShareIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

const ShareButton = ({ onClickLinks, onOpenMenuLinks, onLoadedPlaces }) => {
  const [sharedPost, setSharedPost] = useState(false);

  const handleClickShareButton = (e) => {
    onClickLinks(e);
    setSharedPost(true);
  };

  const unchecked = (
    <Checkbox
      style={{ backgroundColor: "transparent" }}
      icon={
        <StyleShareBorderIcon
          sx={{
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
      style={{ backgroundColor: "transparent" }}
      icon={
        <StyleShareIcon
          sx={{
            color: `${colorGreen}`,
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
      id="basic-button"
      aria-controls={onOpenMenuLinks ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={onOpenMenuLinks ? "true" : undefined}
      onClick={(e) => handleClickShareButton(e)}
      // onMouseEnter={onClickLinks}
      // onMouseLeave={onCloseMenuLinks}
      aria-label="share"
      style={{ backgroundColor: "transparent" }}
      title="Share"
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
      {sharedPost ? checked : unchecked}
      {onLoadedPlaces.shareCount}
    </IconButton>
  );
};

export default ShareButton;
