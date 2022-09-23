import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, IconButton } from "@mui/material";
import styled from "@emotion/styled";

const StyleFavoriteBorderIcon = styled(FavoriteIcon)({
  color: "#da4453",
  "&:hover": {
    backgroundColor: "#db2d3f0f",
    color: "#db2d3f",
  },
});

const FavoriteButton = () => {
  return (
    <IconButton
      aria-label="add to favorites"
      style={{ backgroundColor: "transparent" }}
      title="Like"
    >
      <Checkbox
        style={{ backgroundColor: "transparent" }}
        icon={
          <FavoriteBorderIcon
            sx={{
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
          <StyleFavoriteBorderIcon
            sx={{
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
    </IconButton>
  );
};

export default FavoriteButton;
