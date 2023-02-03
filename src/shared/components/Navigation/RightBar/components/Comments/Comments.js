import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../context/login-context";

import { useHttpClient } from "../../../../../hooks/http-hook";

import AvatarComment from "./AvatarComment";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";

import { Box, CardContent, Zoom } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const StyledListItem = styled(ListItem)({
  paddingTop: "0px",
  paddingLeft: "0px",
});

const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#000000de",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const StyleTitleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: "500",
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#000000de",
}));

const StyleCommentNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: "500",
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#00000099",
}));

const Comments = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const login = useContext(LoginContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage/comments`
        );

        setLoadedPlaces(responseData.comments.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  let regex = /[a-zA-Z0-9]/g;

  let latestComment0;
  let latestComment1;
  let latestComment2;

  let finalComment0;
  let finalComment1;
  let finalComment2;

  if (!isLoading && loadedPlaces) {
    if (loadedPlaces[0] !== undefined) {
      latestComment0 = !isLoading && loadedPlaces ? loadedPlaces[0] : null;

      finalComment0 = latestComment0.commentText.trimEnd() + "…";

      if (latestComment0.commentText.match(regex).length >= 64) {
        finalComment0 = latestComment0.commentText.slice(0, 64).trimEnd() + "…";
      }
      if (latestComment0.commentText.includes(" ") === false) {
        finalComment0 = latestComment0.commentText.slice(0, 20).trimEnd() + "…";
      }
    }

    if (loadedPlaces[1] !== undefined) {
      latestComment1 = !isLoading && loadedPlaces ? loadedPlaces[1] : null;

      finalComment1 = latestComment1.commentText.trimEnd() + "…";

      if (latestComment1.commentText.match(regex).length >= 64) {
        finalComment1 = latestComment1.commentText.slice(0, 64).trimEnd() + "…";
      }
      if (latestComment1.commentText.includes(" ") === false) {
        finalComment1 = latestComment1.commentText.slice(0, 20).trimEnd() + "…";
      }
    }

    if (loadedPlaces[2] !== undefined) {
      latestComment2 = !isLoading && loadedPlaces ? loadedPlaces[2] : null;

      finalComment2 = latestComment2.commentText.trimEnd() + "…";

      if (latestComment2.commentText.match(regex).length >= 64) {
        finalComment2 = latestComment2.commentText.slice(0, 64).trimEnd() + "…";
      }
      if (latestComment2.commentText.includes(" ") === false) {
        finalComment2 = latestComment2.commentText.slice(0, 20).trimEnd() + "…";
      }
    }
  }
  const profileNavigationHandler = () => {
    if (login.isLoggedIn) {
      login.listItemsNotListed(login.userId);
      navigate(`/api/users/profile/${login.userId}`);
    } else {
      login.listItemsNotListed();
      navigate("/api/users/loginregister");
    }
  };

  const firstpPlaceLinkHandler = () => {
    if (loadedPlaces[0] !== undefined) {
      login.listItemsNotListed(latestComment0.placeId._id);
    }
  };

  const secondPlaceLinkHandler = () => {
    if (loadedPlaces[1] !== undefined) {
      login.listItemsNotListed(latestComment1.placeId._id);
    }
  };

  const thirdpPlaceLinkHandler = () => {
    if (loadedPlaces[2] !== undefined) {
      login.listItemsNotListed(latestComment2.placeId._id);
    }
  };

  const cleanListHandler = () => {
    login.listItemsNotListed(login.userId);
  };

  let spinner = "";
  if (isLoading) {
    spinner = (
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <CardContent
          sx={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "0px",
            paddingBottom: "0PX",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 330,
              paddingTop: "0px",
            }}
          >
            <Typography variant="h6" fontWeight={400}>
              Latest Comments
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "14px",
              }}
            >
              <LoadingSpinner asOverlay />
            </Box>
          </List>
        </CardContent>
      </Zoom>
    );
  }

  return (
    <React.Fragment>
      {!isLoading && loadedPlaces ? (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <CardContent
            sx={{
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "0px",
              paddingBottom: "0PX",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 330,
                paddingTop: "0px",
              }}
            >
              <Typography variant="h6" fontWeight={400}>
                Latest Comments
              </Typography>

              {loadedPlaces[0] !== undefined && (
                <StyledListItem
                  alignItems="flex-start"
                  bgcolor={"background.paper"}
                >
                  <ListItemAvatar sx={{ marginTop: "18px" }}>
                    <AvatarComment
                      loadedPlace={latestComment0}
                      onProfileNavigation={profileNavigationHandler}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ cursor: "pointer" }}
                    primary={
                      <StyleTitleNavLink
                        to={`/api/places/${latestComment0.placeId._id}`}
                        onClick={firstpPlaceLinkHandler}
                      >
                        {`${latestComment0.placeId.title}`}
                      </StyleTitleNavLink>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          fontSize={13}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <StyleNavLink
                            to={
                              login.isLoggedIn
                                ? `/api/users/profile/${login.userId}`
                                : `/api/users/loginregister`
                            }
                            onClick={cleanListHandler}
                          >
                            {`${latestComment0.creatorId.name}`}
                          </StyleNavLink>
                        </Typography>
                        <StyleCommentNavLink
                          to={`/api/places/${latestComment0.placeId._id}`}
                          onClick={firstpPlaceLinkHandler}
                        >
                          {` — ${finalComment0}`}
                        </StyleCommentNavLink>
                      </React.Fragment>
                    }
                  />
                </StyledListItem>
              )}
              <Divider variant="middle" />
              {loadedPlaces[1] !== undefined && (
                <StyledListItem alignItems="flex-start">
                  <ListItemAvatar sx={{ marginTop: "18px" }}>
                    <AvatarComment
                      loadedPlace={latestComment1}
                      onProfileNavigation={profileNavigationHandler}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ cursor: "pointer" }}
                    primary={
                      <StyleTitleNavLink
                        to={`/api/places/${latestComment1.placeId._id}`}
                        onClick={secondPlaceLinkHandler}
                      >
                        {`${latestComment1.placeId.title}`}
                      </StyleTitleNavLink>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          fontSize={13}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <StyleNavLink
                            to={
                              login.isLoggedIn
                                ? `/api/users/profile/${login.userId}`
                                : `/api/users/loginregister`
                            }
                            onClick={cleanListHandler}
                          >
                            {`${latestComment1.creatorId.name}`}
                          </StyleNavLink>
                        </Typography>
                        <StyleCommentNavLink
                          to={`/api/places/${latestComment1.placeId._id}`}
                          onClick={firstpPlaceLinkHandler}
                        >
                          {` — ${finalComment1}`}
                        </StyleCommentNavLink>
                      </React.Fragment>
                    }
                  />
                </StyledListItem>
              )}
              <Divider variant="middle" />
              {loadedPlaces[2] !== undefined && (
                <StyledListItem alignItems="flex-start">
                  <ListItemAvatar sx={{ marginTop: "18px" }}>
                    <AvatarComment
                      loadedPlace={latestComment2}
                      onProfileNavigation={profileNavigationHandler}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    onClick={thirdpPlaceLinkHandler}
                    sx={{ cursor: "pointer" }}
                    primary={
                      <StyleTitleNavLink
                        to={`/api/places/${latestComment2.placeId._id}`}
                        onClick={secondPlaceLinkHandler}
                      >
                        {`${latestComment2.placeId.title}`}
                      </StyleTitleNavLink>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          fontSize={13}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <StyleNavLink
                            to={
                              login.isLoggedIn
                                ? `/api/users/profile/${login.userId}`
                                : `/api/users/loginregister`
                            }
                            onClick={cleanListHandler}
                          >
                            {`${latestComment2.creatorId.name}`}
                          </StyleNavLink>
                        </Typography>
                        <StyleCommentNavLink
                          to={`/api/places/${latestComment2.placeId._id}`}
                          onClick={thirdpPlaceLinkHandler}
                        >
                          {` — ${finalComment2}`}
                        </StyleCommentNavLink>
                      </React.Fragment>
                    }
                  />
                </StyledListItem>
              )}
            </List>
          </CardContent>
        </Zoom>
      ) : (
        spinner
      )}
    </React.Fragment>
  );
};

export default Comments;
