import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { CardContent, Zoom } from "@mui/material";
import { useHttpClient } from "../../../../../hooks/http-hook";
import AvatarComment from "./AvatarComment";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../context/login-context";

const StyledListItem = styled(ListItem)({
  paddingTop: "0px",
  paddingLeft: "0px",
});

const Comments = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const login = useContext(LoginContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/homepage/comments"
        );

        setLoadedPlaces(responseData.comments.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  let regex = /[a-zA-Z0-9]/g;

  const latestComment0 = !isLoading && loadedPlaces ? loadedPlaces[0] : null;
  const latestComment1 = !isLoading && loadedPlaces ? loadedPlaces[1] : null;
  const latestComment2 = !isLoading && loadedPlaces ? loadedPlaces[2] : null;

  console.log(loadedPlaces);
  console.log(latestComment0);

  const firstpPlaceLinkHandler = () => {
    navigate(`/api/places/${latestComment0.placeId._id}`);
    login.listItemsNotListed(latestComment0.placeId._id);
  };

  const secondPlaceLinkHandler = () => {
    navigate(`/api/places/${latestComment1.placeId._id}`);
    login.listItemsNotListed(latestComment1.placeId._id);
  };

  const thirdpPlaceLinkHandler = () => {
    navigate(`/api/places/${latestComment2.placeId._id}`);
    login.listItemsNotListed(latestComment2.placeId._id);
  };

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

              <StyledListItem
                alignItems="flex-start"
                bgcolor={"background.paper"}
              >
                <ListItemAvatar sx={{ marginTop: "18px" }}>
                  <AvatarComment loadedPlace={latestComment0} />
                </ListItemAvatar>
                <ListItemText
                  onClick={firstpPlaceLinkHandler}
                  sx={{ cursor: "pointer" }}
                  primary={latestComment0.placeId.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        fontSize={13}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {latestComment0.creatorId.name}
                      </Typography>
                      {` — ${
                        latestComment0.commentText.match(regex).length >= 64
                          ? latestComment0.commentText.slice(0, 64).trimEnd() +
                            "…"
                          : latestComment0.commentText
                      }`}
                    </React.Fragment>
                  }
                />
              </StyledListItem>
              <Divider variant="middle" />
              <StyledListItem alignItems="flex-start">
                <ListItemAvatar sx={{ marginTop: "18px" }}>
                  <AvatarComment loadedPlace={latestComment1} />
                </ListItemAvatar>
                <ListItemText
                  onClick={secondPlaceLinkHandler}
                  sx={{ cursor: "pointer" }}
                  primary={latestComment1.placeId.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        fontSize={13}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {latestComment1.creatorId.name}
                      </Typography>
                      {` — ${
                        latestComment1.commentText.match(regex).length >= 64
                          ? latestComment1.commentText.slice(0, 64).trimEnd() +
                            "…"
                          : latestComment1.commentText
                      }`}
                    </React.Fragment>
                  }
                />
              </StyledListItem>
              <Divider variant="middle" />
              <StyledListItem alignItems="flex-start">
                <ListItemAvatar sx={{ marginTop: "18px" }}>
                  <AvatarComment loadedPlace={latestComment2} />
                </ListItemAvatar>
                <ListItemText
                  onClick={thirdpPlaceLinkHandler}
                  sx={{ cursor: "pointer" }}
                  primary={latestComment2.placeId.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        fontSize={13}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {latestComment2.creatorId.name}
                      </Typography>
                      {` — ${
                        latestComment2.commentText.match(regex).length >= 64
                          ? latestComment2.commentText.slice(0, 64).trimEnd() +
                            "…"
                          : latestComment2.commentText
                      }`}
                    </React.Fragment>
                  }
                />
              </StyledListItem>
            </List>
          </CardContent>
        </Zoom>
      ) : null}
      {/* //here goes skeleton, inside null */}
    </React.Fragment>
  );
};

export default Comments;
