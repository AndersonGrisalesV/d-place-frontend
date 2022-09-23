import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { Checkbox, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";

const colorGreen = green[600];

const ShareButton = () => {
  return (
    <IconButton
      aria-label="share"
      style={{ backgroundColor: "transparent" }}
      title="Share"
    >
      <Checkbox
        style={{ backgroundColor: "transparent" }}
        icon={
          <ShareIcon
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
    </IconButton>
  );
};

export default ShareButton;
