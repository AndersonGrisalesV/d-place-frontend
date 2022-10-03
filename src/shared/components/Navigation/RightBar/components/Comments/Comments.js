import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { CardContent, Zoom } from "@mui/material";

const StyledListItem = styled(ListItem)({
  paddingTop: "0px",
  paddingLeft: "0px",
});

const Comments = () => {
  return (
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
          <StyledListItem alignItems="flex-start" bgcolor={"background.paper"}>
            <ListItemAvatar sx={{ marginTop: "18px" }}>
              <Avatar
                title="Ali Connors"
                alt="Ali Connors"
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Place title"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    fontSize={13}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </StyledListItem>
          <Divider variant="middle" />
          <StyledListItem alignItems="flex-start">
            <ListItemAvatar sx={{ marginTop: "18px" }}>
              <Avatar
                title="Jennifer"
                alt="Jennifer"
                src="/static/images/avatar/2.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    fontSize={13}
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </StyledListItem>
          <Divider variant="middle" />
          <StyledListItem alignItems="flex-start">
            <ListItemAvatar sx={{ marginTop: "18px" }}>
              <Avatar
                title="Sandra Adams"
                alt="Sandra Adams"
                src="/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    fontSize={13}
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </StyledListItem>
        </List>
      </CardContent>
    </Zoom>
  );
};

export default Comments;
