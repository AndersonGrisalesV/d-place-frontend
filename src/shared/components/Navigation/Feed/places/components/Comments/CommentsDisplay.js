import React, { useContext, useState } from "react";
import { Typography, Stack, TextField, Divider } from "@mui/material";
import TitleComments from "./components/TitleComments";
import CardWrapperCommentsDisplay from "./components/CardWrapperCommentsDisplay";
import CardContentComments from "./components/CardContentComments";
import CommentShow from "./components/CommentShow";
import ButtonSendComment from "./components/Buttons/ButtonSendComment";
import { LoginContext } from "../../../../../../context/login-context";
import useFocusBlurHook from "../../../../../../../shared/hooks/use-my-input";
import styled from "@emotion/styled";
import LoginButton from "../../../../Navbar/components/RightBar/LoginButtons/LoginButton";
import ButtonCancelSendComment from "./components/Buttons/ButtonCancelSendComment";

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

const CommentsDisplay = ({ DUMMY_COMMENTS, onAddComment }) => {
  const login = useContext(LoginContext);

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

  const onSubmitAddCommentHandler = (e) => {
    e.preventDefault();

    if (formIsValid) {
      console.log(formInputs);
      // send comment here
    }
    resetCommentInput();

    // const currentYear = new Date().getFullYear();

    // const currentMonth = new Date().getMonth() + 1;

    // const currentDay = new Date().getDate();
    // const monthAndDay = [currentMonth, currentDay].join(" ");
    // const completeDAte = [monthAndDay, currentYear].join(",");

    // onAddComment();
    // Math.random().toString(),
    // completeDAte,
    // commentText,
    // placeId,
    // title,
    // creatorId,
    // creatorName,
    // creatorImageUrl

    // setTimeout(navigate("/"), 8000);
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
      {DUMMY_COMMENTS.map((comment) => (
        <React.Fragment key={comment.commentId}>
          <CommentShow
            DUMMY_COMMENTS={comment}
            key={comment.commentId}
            id={comment.commentId}
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
      {/* {successMessage ? showMessage : ""} */}
    </CardWrapperCommentsDisplay>
  );
};

export default CommentsDisplay;
