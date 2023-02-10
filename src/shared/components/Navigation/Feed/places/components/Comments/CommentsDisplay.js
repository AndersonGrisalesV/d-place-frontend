import React, { useContext, useState } from "react";

import { LoginContext } from "../../../../../../context/login-context";

import useFocusBlurHook from "../../../../../../../shared/hooks/use-my-input";
import { useHttpClient } from "../../../../../../hooks/http-hook";

import CardContentComments from "./components/CardContentComments";
import CardWrapperCommentsDisplay from "./components/CardWrapperCommentsDisplay";
import CommentShow from "./components/CommentShow";
import TitleComments from "./components/TitleComments";

import ButtonSendComment from "./components/Buttons/ButtonSendComment";
import ButtonCancelSendComment from "./components/Buttons/ButtonCancelSendComment";
import LoginButton from "../../../../Navbar/components/RightBar/LoginButtons/LoginButton";

import { Divider, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for TextField
const StyleTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
    },
  },
}));

//* onPlaceComments are the comment places passed down by PlaceGetById > CommentsPost where only comments are selected and then passed down to CommentsDisplay
//* onPlaceId is the place Id passed down by PlaceGetById > CommentsPost where only the placeId is selected andcomments are selected and then passed down to CommentsDisplay
//* onRefreshPlaceComments is a pointer to a function that triggers a state that refreshes the places and their comments once one of them is edited or deleted PlaceGetById > CommentsPost where only comments are selected and then passed down to CommentsDisplay
//* onErrorDeleteComment is a pointer to a function that manages error/success messages when creating, editing, deleting a message PlaceGetById > CommentsPost > CommentsDisplay
const CommentsDisplay = ({
  onPlaceComments,
  onPlaceId,
  onRefreshPlaceComments,
  onErrorDeleteComment,
}) => {
  const login = useContext(LoginContext);

  // Custom hook to send Http request to the backend
  const { sendRequest } = useHttpClient();

  // Preloads the place comment to avoid errors without inital data
  const initialFormInputs = {
    comment: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  // State and function sto open modals to warn users when trying to cancel the sending/creation of a new comment
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fucntion to handle the object storing the new comment
  const formInputsHandler = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  // Comment validators
  const {
    value: commentInput,
    isValid: commentIsValid,
    hasError: commentInputHasError,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    reset: resetCommentInput,
  } = useFocusBlurHook((value) => validateComment(value));

  function validateComment(text) {
    if (text.trim() !== "" && text.length < 378) {
      return true;
    }
    return false;
  }

  //* Logic to enable/disable send new comment button
  let formIsValid = false;

  if (login.isLoggedIn && commentIsValid) {
    formIsValid = true;
  }

  const onSubmitAddCommentHandler = async (e) => {
    e.preventDefault();

    if (login.isLoggedIn && formIsValid) {
      //* Generates a new date to assign to the new comment
      let date = new Date().toJSON();

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${onPlaceId}/newcomment`,
          "POST",
          JSON.stringify({
            commentText: formInputs.comment,
            postCommentDate: date,
            placeId: onPlaceId,
            creatorId: login.userId,
          }),
          {
            Authorization: "Bearer " + login.token,
            "Content-Type": "Application/json",
          }
        );
        // Shows the success message, using onErrorDeleteComment pointer to the funciton that handles that operation on PlaceGetById
        onErrorDeleteComment(
          null,
          null,
          "created",
          "Your comment was created successfully"
        );
        // Triggers the pointer to the function that refreshes the state of the place's comments
        onRefreshPlaceComments(onPlaceId);
      } catch (err) {
        // Shows possible errors message, using onErrorDeleteComment pointer to the funciton that handles that operation on PlaceGetById
        setTimeout(() => {
          onErrorDeleteComment(
            err,
            "errorCreate",
            null,
            "Something went wrong, try again"
          );
          // Triggers  the pointer to the function that refreshes the state of the place's comments
          onRefreshPlaceComments(onPlaceId);
        }, "910");
      }
    }

    // Resets the InputValue of the comment Box
    resetCommentInput();
  };

  // Functions that resets the InputValue of the comment Box
  const handleCancelSendComment = () => {
    resetCommentInput();
  };

  //* Adittional logic needed to enable/disable send new comment button
  let cancelSendCommentIsValid = false;

  if (commentInputHasError) {
    cancelSendCommentIsValid = true;
  } else if (formIsValid) {
    cancelSendCommentIsValid = true;
  }

  // Loads comments to show
  const comments = (
    <React.Fragment>
      {onPlaceComments.map((comment) => (
        <React.Fragment key={comment._id}>
          <CommentShow
            onRefreshPlaceComments={onRefreshPlaceComments}
            onErrorDeleteComment={onErrorDeleteComment}
            onPlaceComments={comment}
            key={comment._id}
            id={comment._id}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <CardWrapperCommentsDisplay>
      <CardContentComments>
        <TitleComments />
        {comments}
        <Divider sx={{ marginTop: "2px" }} />
        <Typography
          variant="subtitle1"
          fontWeight={400}
          mt={2}
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "-webkit-center",
            //* fontSize for different screen sizes
            fontSize: {
              sps: "0.9rem",
              ps: "1rem",
              ts: "1rem",
              sls: "1.25rem",
              sms: "1.25rem",
              sc: "1.25rem",
              nsc: "1.25rem",
              ns: "1.25rem",
              msc: "1.25rem",
              mns: "1.25rem",
              ms: "1.25rem",
              lgs: "1.25rem",
            },
          }}
        >
          Leave a comment
        </Typography>
        {login.isLoggedIn ? (
          <form onSubmit={onSubmitAddCommentHandler}>
            <Stack
              direction="column"
              spacing={4}
              justifyContent="space-between"
            >
              <StyleTextField
                id="outlined-commentText-input"
                type="text"
                placeholder="Type here..."
                autoComplete="comment-text"
                multiline
                rows={2}
                size="small"
                name="comment"
                inputProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "9px",
                      ps: "10px",
                      ts: "12px",
                      sls: "12px",
                      sms: "14px",
                      sc: "14px",
                      nsc: "14px",
                      ns: "14px",
                      msc: "14px",
                      mns: "14px",
                      ms: "14px",
                      lgs: "14px",
                    },
                    fontWeight: "500",
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "9px",
                      ps: "10px",
                      ts: "12px",
                      sls: "12px",
                      sms: "14px",
                      sc: "14px",
                      nsc: "14px",
                      ns: "14px",
                      msc: "14px",
                      mns: "14px",
                      ms: "14px",
                      lgs: "14px",
                    },
                  },
                }}
                onChange={(e) => {
                  formInputsHandler(e);
                  commentChangeHandler(e);
                }}
                onBlur={commentBlurHandler}
                value={commentInput}
                error={commentInputHasError}
                helperText={
                  commentInputHasError
                    ? "Your comment cannot be empty or too long."
                    : ""
                }
              />
              <Stack direction="row" spacing={1} justifyContent="center">
                <ButtonCancelSendComment
                  open={open}
                  close={handleClose}
                  onHandleOpen={handleOpen}
                  onHandleClose={handleClose}
                  handleCancelSendComment={handleCancelSendComment}
                  cancelSendCommentIsValid={cancelSendCommentIsValid}
                />
                <ButtonSendComment formIsValid={formIsValid} />
              </Stack>
            </Stack>
          </form>
        ) : (
          <Typography
            variant="h6"
            fontWeight={400}
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              //* fontSize for different screen sizes
              fontSize: {
                sps: "8px",
                ps: "9px",
                ts: "11px",
                sls: "11px",
                sms: "13px",
                sc: "13px",
                nsc: "13px",
                ns: "13px",
                msc: "13px",
                mns: "13px",
                ms: "13px",
                lgs: "13px",
              },
            }}
          >
            Please {<LoginButton OnComment={true} />} to comment
          </Typography>
        )}
      </CardContentComments>
    </CardWrapperCommentsDisplay>
  );
};

export default CommentsDisplay;
