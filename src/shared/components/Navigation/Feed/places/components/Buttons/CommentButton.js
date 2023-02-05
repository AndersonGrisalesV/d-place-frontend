import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import CommentIcon from "@mui/icons-material/Comment";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { yellow } from "@mui/material/colors";
import { Checkbox, IconButton, styled } from "@mui/material";

// Personalized color from MUI
const colorYellow = yellow[700];

// Styled component for ModeCommentOutlinedIcon
const StyleCommentBorderIcon = styled(ModeCommentOutlinedIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 1,
}));

// Styled component for CommentIcon
const StyleCommentIcon = styled(CommentIcon)(({ theme }) => ({
  stroke: theme.palette.mode === "dark" ? "#fffff" : "#ffffff",
  strokeWidth: theme.palette.mode === "dark" ? 1 : 0,
}));

// loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
// CommentButton is on ButtonsWrapper
const CommentButton = ({ loadedPlaces = false }) => {
  let navigate = useNavigate();
  const login = useContext(LoginContext);

  // login.listItemsNotListed cleans the leftSideBar selected menu Item to none
  // When click the StyleCommentIcon goest to the place's details
  const handleNavigateToPost = () => {
    if (loadedPlaces) {
      login.listItemsNotListed(loadedPlaces.id);
      navigate(`/api/places/${loadedPlaces.id}`);
    }
  };

  return (
    <IconButton
      disableRipple={true}
      aria-label="post comments"
      style={{ backgroundColor: "transparent" }}
      title="Comment"
      onClick={handleNavigateToPost}
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
        checked={loadedPlaces.comments.length >= 1 ? true : false}
        style={{ backgroundColor: "transparent" }}
        icon={
          <StyleCommentBorderIcon
            sx={{
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
          <StyleCommentIcon
            sx={{
              backgroundColor: "transparent",
              color: `${colorYellow}`,
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
      {loadedPlaces ? loadedPlaces.comments.length : "0"}
    </IconButton>
  );
};

export default CommentButton;
