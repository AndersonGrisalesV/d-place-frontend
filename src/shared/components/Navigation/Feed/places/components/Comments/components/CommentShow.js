import React, { useContext, useEffect, useState } from "react";
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
import { LoginContext } from "../../../../../../../context/login-context";

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

const CommentShow = ({ DUMMY_COMMENTS, onButton }) => {
  const login = useContext(LoginContext);
  // console.log("here" + `${onButton}`);
  // const [showButtons, setShowButtons] = useState(false);

  // useEffect(() => {
  //   if (`${DUMMY_COMMENTS.commentId}` === `${onButton.creatorId}`) {
  //     setShowButtons(true);
  //   } else {
  //     setShowButtons(false);
  //   }
  // }, [DUMMY_COMMENTS, onButton]);

  // let buttonsShow;
  // buttonsShow = Object.values(DUMMY_COMMENTS).filter(
  //   (comment) => comment.creatorId === onButton.creatorId
  // );

  const buttonsShow = (
    <Stack direction="row" spacing={0} justifyContent="end">
      <ButtonEditDeleteComments />
      <ButtonEditDeleteComments onDelete={true} />
    </Stack>
  );

  return (
    <Box>
      <Divider />
      <StyledListItem
        alignItems="flex-start"
        bgcolor={"background.paper"}
        sx={{ marginTop: "18px", marginBottom: "0px", paddingBottom: "0px" }}
      >
        <ListItemAvatar sx={{ marginTop: "0px" }}>
          <Avatar
            sx={{ marginTop: "5%", marginLeft: "5%" }}
            title={DUMMY_COMMENTS.creatorName}
            alt={DUMMY_COMMENTS.creatorName}
            src={DUMMY_COMMENTS.creatorImageUrl}
          />
        </ListItemAvatar>

        <StyleListItemText
          primary={DUMMY_COMMENTS.creatorName}
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
                {DUMMY_COMMENTS.postCommentDate}
              </Typography>
              {`${DUMMY_COMMENTS.commentText}`}
            </React.Fragment>
          }
        />
      </StyledListItem>
      {login.isLoggedIn ? (
        buttonsShow
      ) : (
        <React.Fragment>
          <br />
        </React.Fragment>
      )}
    </Box>
  );
};

export default CommentShow;
