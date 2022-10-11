import React from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ButtonEditDeleteComments from "./Buttons/ButtonEditDeleteComments";
import styled from "@emotion/styled";

const StyledListItem = styled(ListItem)({
  paddingTop: "0px",
  paddingLeft: "0px",
});

const StyleListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "13px",
  },
  "& .MuiListItemText-secondary": {
    color: "gray",
  },
}));

const CommentShow = () => {
  return (
    <Box>
      <StyledListItem
        alignItems="flex-start"
        bgcolor={"background.paper"}
        sx={{ marginTop: "18px", marginBottom: "0px", paddingBottom: "0px" }}
      >
        <ListItemAvatar sx={{ marginTop: "0px" }}>
          <Avatar
            sx={{ marginTop: "5%", marginLeft: "5%" }}
            title="Ali Connors"
            alt="Ali Connors"
            src="/static/images/avatar/1.jpg"
          />
        </ListItemAvatar>

        <StyleListItemText
          primary="Ali Connors"
          secondary={
            <React.Fragment>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
                fontSize={10}
                component="span"
                variant="body2"
                color="text.primary"
              >
                September 9, 2022
              </Typography>
              {
                "I'll be in your neighborhood doing errands this… I'll be in your neighborhood doing errands this…"
              }
            </React.Fragment>
          }
        />
      </StyledListItem>

      <Stack direction="row" spacing={0} justifyContent="end">
        <ButtonEditDeleteComments />
        <ButtonEditDeleteComments onDelete={true} />
      </Stack>
      <Divider variant="middle" sx={{ visibility: "hidden" }} />
    </Box>
  );
};

export default CommentShow;
