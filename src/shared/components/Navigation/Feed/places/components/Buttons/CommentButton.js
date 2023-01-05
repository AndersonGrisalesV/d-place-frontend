import React, { useContext } from "react";

import { Checkbox, IconButton, styled } from "@mui/material";

import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import CommentIcon from "@mui/icons-material/Comment";

import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../../context/login-context";

const colorYellow = yellow[700];

const StyleCommentBorderIcon = styled(ModeCommentOutlinedIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

const StyleCommentIcon = styled(CommentIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0,
}));

const CommentButton = ({
  isFavorite = "",
  onFavoriteHandler,
  onChangeFavorite,
  onLoadedPlaces = false,
}) => {
  let navigate = useNavigate();
  const login = useContext(LoginContext);

  const handleNavigateToPost = () => {
    if (onLoadedPlaces) {
      login.listItemsNotListed(onLoadedPlaces.id);
      navigate(`/api/places/${onLoadedPlaces.id}`);
    }
  };

  return (
    <IconButton
      aria-label="post comments"
      style={{ backgroundColor: "transparent" }}
      title="Comment"
      onClick={handleNavigateToPost}
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
        checked={onLoadedPlaces.comments.length >= 1 ? true : false}
        style={{ backgroundColor: "transparent" }}
        icon={
          <StyleCommentBorderIcon
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
          <StyleCommentIcon
            sx={{
              backgroundColor: "transparent",
              color: `${colorYellow}`,
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
      {onLoadedPlaces ? onLoadedPlaces.comments.length : "0"}
    </IconButton>
  );
};

export default CommentButton;
