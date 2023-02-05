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

const CommentsDisplay = ({
  onPlaceComments,
  onPlaceId,
  onRefreshPlaceComments,
  onErrorDeleteComment,
}) => {
  const login = useContext(LoginContext);

  const { sendRequest } = useHttpClient();

  const initialFormInputs = {
    comment: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formInputsHandler = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

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

  let formIsValid = false;

  if (login.isLoggedIn && commentIsValid) {
    formIsValid = true;
  }

  const onSubmitAddCommentHandler = async (e) => {
    e.preventDefault();

    if (login.isLoggedIn && formIsValid) {
      // send comment here
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

        onErrorDeleteComment(
          null,
          null,
          "created",
          "Your comment was created successfully"
        );

        onRefreshPlaceComments(onPlaceId);
      } catch (err) {
        setTimeout(() => {
          onErrorDeleteComment(
            err,
            "errorCreate",
            null,
            "Something went wrong, try again"
          );
          onRefreshPlaceComments(onPlaceId);
        }, "910");
      }
    }
    resetCommentInput();
  };

  const handleCancelSendComment = () => {
    resetCommentInput();
  };

  let cancelSendCommentIsValid = false;

  if (commentInputHasError) {
    cancelSendCommentIsValid = true;
  } else if (formIsValid) {
    cancelSendCommentIsValid = true;
  }

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
            // fontSize for different screen sizes
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
                    // fontSize for different screen sizes
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
                    // fontSize for different screen sizes
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
                <ButtonSendComment formIsValid={formIsValid} />
                <ButtonCancelSendComment
                  cancelSendCommentIsValid={cancelSendCommentIsValid}
                  open={open}
                  close={handleClose}
                  onHandleOpen={handleOpen}
                  onHandleClose={handleClose}
                  handleCancelSendComment={handleCancelSendComment}
                />
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
              // fontSize for different screen sizes
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
