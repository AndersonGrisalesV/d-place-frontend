import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Checkbox, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { useLocation } from "react-router-dom";

const colorGreen = green[600];

const ShareButton = () => {
  const { pathname } = useLocation();

  const [showButtons, setShowButtons] = useState(false);

  const handleSocialMediaLinksToShare = () => {
    setShowButtons(true);
  };

  return (
    <IconButton
      onClick={handleSocialMediaLinksToShare}
      aria-label="share"
      style={{ backgroundColor: "transparent" }}
      title="Share"
      sx={{
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
        style={{ backgroundColor: "transparent" }}
        icon={
          <ShareOutlinedIcon
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
        checkedIcon={
          <ShareIcon
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
      {"5"}
    </IconButton>
  );
};

export default ShareButton;
