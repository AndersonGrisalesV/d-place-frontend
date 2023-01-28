import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ButtonEditDeleteComments from "./Buttons/ButtonEditDeleteComments";
import { LoginContext } from "../../../../../../../context/login-context";
import ButtonSendComment from "./Buttons/ButtonSendComment";
import ButtonCancelComment from "./Buttons/ButtonCancelComment";
import ModalCancelEditComment from "./Buttons/Modals/ModalCancelEditComment";
import ModalCancelDeleteComment from "./Buttons/Modals/ModalCancelDeleteComment";
import useFocusBlurHook from "../../../../../../../hooks/use-my-input";
import styled from "@emotion/styled";
import { useHttpClient } from "../../../../../../../hooks/http-hook";
import LoadingSpinnerWrapper from "../../../../../../LoadingSpinner/LoadingSpinnerWrapper";
import LoadingSpinner from "../../../../../../LoadingSpinner/LoadingSpinner";

const StyledListItem = styled(ListItem)({
  paddingTop: "0px",
  paddingLeft: "0px",
});

const StyleListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "15px",
  },
  "& .MuiListItemText-secondary": {
    color: "gray",
  },
}));

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

const CommentShow = ({
  onPlaceComments,
  onRefreshPlaceComments,
  onButton,
  onAddComment,
  onDeletedComments,
  onErrorDeleteComment,
}) => {
  const login = useContext(LoginContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showSuccess, setShowSuccess] = useState(false);

  console.log(onPlaceComments);

  const addDays = (date) => {
    let year;
    let month;
    let day;

    const monthName = (month) => {
      if (month == "01") {
        month = "January";
      }
      if (month == "02") {
        month = "February";
      }
      if (month == "03") {
        month = "March";
      }
      if (month == "04") {
        month = "April";
      }
      if (month == "05") {
        month = "May";
      }
      if (month == "06") {
        month = "June";
      }
      if (month == "07") {
        month = "July";
      }
      if (month == "08") {
        month = "August";
      }
      if (month == "09") {
        month = "September";
      }
      if (month == "10") {
        month = "October";
      }
      if (month == "11") {
        month = "November";
      }
      if (month == "12") {
        month = "December";
      }

      return month;
    };

    month = date.substring(5, 7);
    month = monthName(month);
    day = date.substring(8, 10);
    year = date.substring(0, 4);

    return { month, day, year };
  };

  let fetchedDate = addDays(onPlaceComments.postCommentDate);

  const [commentValue, setCommentValue] = useState(
    `${onPlaceComments.commentText}`
  );

  const initialFormInputs = {
    commentText: `${onPlaceComments.commentText}`,
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const formInputsHandler = (e) => {
    // console.log("hello " + e.target.value);
    if (e.target.name === "commentText" && showBlurComment) {
      setShowBlurComment(false);
    }
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const {
    defaultValue: commentInput = commentValue,
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

  const handleSendComment = (e) => {
    // console.log("hello" + formInputs.commentText);
    resetCommentInput();
  };

  const onSubmitEditHandler = async (e) => {
    e.preventDefault();

    let date = new Date().toJSON();
    if (login.isLoggedIn && formInputs) {
      if (showBlurComment) {
        formInputs.commentText = "same";
      }
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${onPlaceComments.placeId}/editcomment/${onPlaceComments._id}`,
          "PATCH",
          JSON.stringify({
            commentText: formInputs.commentText,
            postCommentDate: date,
          }),
          {
            Authorization: "Bearer " + login.token,
            "Content-Type": "Application/json",
          }
        );
        setShowSuccess(true);

        onErrorDeleteComment(
          null,
          null,
          "edited",
          "Your comment was edited successfully"
        );

        onRefreshPlaceComments(onPlaceComments.placeId);
        // setTimeout(() => {
        //   // onErrorDeleteComment(null, "created", null, null);
        // }, "910");
        setTimeout(() => {
          setShowSuccess(false);
        }, "930");
        // navigate(`/api/places/${pid}`);
      } catch (err) {
        setTimeout(() => {
          onErrorDeleteComment(
            err,
            "errorEdit",
            null,
            "Something went wrong, try again"
          );

          onRefreshPlaceComments(onPlaceComments.placeId);
        }, "910");
      }
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [editComment, setEditComment] = useState(false);
  const [showBlurComment, setShowBlurComment] = useState(true);

  const handleEditComment = () => {
    // if(login && userowncomment){
    if (login.isLoggedIn) {
      setEditComment((eComment) => !eComment);
    }
  };

  const handleConfirmCancel = () => {
    handleClose();
    setEditComment((eComment) => !eComment);
    resetCommentInput();
  };

  const handleDeleteComment = () => {
    // if(login && userowncomment){ deleete comment
    if (login.isLoggedIn) {
      handleOpen();
    }
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${onPlaceComments.placeId}/deletecomment/${onPlaceComments._id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );

      setShowSuccess(true);

      onErrorDeleteComment(
        null,
        null,
        "deleted",
        "Your comment was deleted successfully"
      );

      onRefreshPlaceComments(onPlaceComments.placeId);
      setTimeout(() => {
        setShowSuccess(false);
      }, "930");
    } catch (err) {
      setTimeout(() => {
        onErrorDeleteComment(
          err,
          "errorDelete",
          null,
          "Something went wrong, try again"
        );

        onRefreshPlaceComments(onPlaceComments.placeId);
      }, "910");
    }

    handleClose();
  };

  let formIsValid = false;

  if (login.isLoggedIn) {
    if (!showBlurComment && commentIsValid) {
      formIsValid = true;
    }
  }

  let sendCommentIsValid = false;

  if (formIsValid && !commentInputHasError) {
    sendCommentIsValid = true;
  }

  let isEdit = false;
  if (login.isLoggedIn && onPlaceComments.creatorId._id === login.userId) {
    isEdit = true;
  }

  const buttonsShow = (
    <Stack direction="row" spacing={0} justifyContent="end">
      <ButtonEditDeleteComments onEdit={handleEditComment} />
      <ButtonEditDeleteComments
        onButtonName={true}
        onDelete={handleDeleteComment}
      />
    </Stack>
  );

  return (
    <>
      {isLoading || showSuccess ? (
        <LoadingSpinnerWrapper onNewPlace={true}>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : (
        <Box>
          <Divider />
          {!editComment ? (
            <StyledListItem
              alignItems="flex-start"
              bgcolor={"background.paper"}
              sx={{
                marginTop: "18px",
                marginBottom: "0px",
                paddingBottom: "0px",
                paddingRight: "0px",
              }}
            >
              <ListItemAvatar
                sx={{
                  paddingTop: "2px",
                  marginTop: "0px",
                  display: {
                    sps: "none",
                    ps: "none",
                    ts: "flex",
                    sls: "flex",
                    sms: "flex",
                    sc: "flex",
                    nsc: "flex",
                    ns: "flex",
                    msc: "flex",
                    mns: "flex",
                    ms: "flex",
                    lgs: "flex",
                  },
                }}
              >
                <Avatar
                  sx={{
                    color: "#fff",
                    marginTop: "5%",
                    marginLeft: "5%",
                    fontSize: {
                      sps: "10px",
                      ps: "12px",
                      ts: "14px",
                      sls: "15px",
                      sms: "18px",
                      sc: "18px",
                      nsc: "18px",
                      ns: "18px",
                      msc: "18px",
                      mns: "18px",
                      ms: "18px",
                      lgs: "18px",
                    },
                    bgcolor: "#da4453c7",
                    width: {
                      sps: "28px",
                      ps: "31px",
                      ts: "34px",
                      sls: "36px",
                      sms: "40px",
                      sc: "40px",
                      nsc: "40px",
                      ns: "40px",
                      msc: "40px",
                      mns: "40px",
                      ms: "40px",
                      lgs: "40px",
                    },
                    height: {
                      sps: "28px",
                      ps: "31px",
                      ts: "34px",
                      sls: "36px",
                      sms: "40px",
                      sc: "40px",
                      nsc: "40px",
                      ns: "40px",
                      msc: "40px",
                      mns: "40px",
                      ms: "40px",
                      lgs: "40px",
                    },
                  }}
                  title={onPlaceComments.creatorId.name}
                  alt={onPlaceComments.creatorId.name}
                  src={onPlaceComments.creatorId.imageUrl.url}
                >
                  {onPlaceComments.creatorId.imageUrl.url === ""
                    ? onPlaceComments.creatorId.name.charAt(0)
                    : ""}
                </Avatar>
              </ListItemAvatar>

              <StyleListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    color="text.primary"
                    sx={{
                      fontSize: {
                        sps: "10px",
                        ps: "11px",
                        ts: "13px",
                        sls: "13px",
                        sms: "15px",
                        sc: "15px",
                        nsc: "15px",
                        ns: "15px",
                        msc: "15px",
                        mns: "15px",
                        ms: "15px",
                        lgs: "15px",
                      },
                    }}
                  >
                    {onPlaceComments.creatorId.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="text.secondary"
                    sx={{
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
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "10px",
                        fontSize: {
                          sps: "6px",
                          ps: "7px",
                          ts: "9px",
                          sls: "9px",
                          sms: "11px",
                          sc: "11px",
                          nsc: "11px",
                          ns: "11px",
                          msc: "11px",
                          mns: "11px",
                          ms: "11px",
                          lgs: "11px",
                        },
                      }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${fetchedDate.month} ${fetchedDate.day}, ${fetchedDate.year}`}
                    </Typography>
                    {`${
                      onPlaceComments.commentText.includes(" ") === false
                        ? onPlaceComments.commentText.slice(0, 72) + "…"
                        : onPlaceComments.commentText
                    }`}
                  </Typography>
                }
              />
            </StyledListItem>
          ) : (
            <form onSubmit={onSubmitEditHandler}>
              <Stack
                direction="column"
                spacing={4}
                justifyContent="space-between"
              >
                <StyleTextField
                  id="outlined-commentText-input"
                  disabled={
                    isLoading ? true : false || showSuccess ? true : false
                  }
                  multiline
                  // defaultValue={commentInput}
                  autoComplete="current-commentText"
                  size="small"
                  name="commentText"
                  defaultValue={`${onPlaceComments.commentText}`}
                  onChange={(e) => {
                    formInputsHandler(e);
                    commentChangeHandler(e);
                  }}
                  onBlur={showBlurComment ? null : commentBlurHandler}
                  // value={titleInput}
                  error={commentInputHasError}
                  // onBlur={commentBlurHandler}
                  // value={commentInput}
                  // error={commentInputHasError}
                  helperText={
                    commentInputHasError
                      ? "Edit your comment to send it. (Cannot be empty)"
                      : ""
                  }
                />
                <Stack direction="row" spacing={0} justifyContent="end">
                  <ButtonSendComment
                    formIsValid={formIsValid}
                    handleSendComment={handleSendComment}
                  />
                  <ButtonCancelComment onHandleOpen={handleOpen} />
                </Stack>
              </Stack>
            </form>
          )}

          {editComment ? (
            <ModalCancelEditComment
              open={open}
              handleClose={handleClose}
              handleConfirmCancel={handleConfirmCancel}
            />
          ) : (
            <ModalCancelDeleteComment
              open={open}
              handleClose={handleClose}
              handleConfirmDelete={handleConfirmDelete}
            />
          )}
          {login.isLoggedIn && !editComment && isEdit ? (
            buttonsShow
          ) : (
            <React.Fragment>
              <br />
            </React.Fragment>
          )}
        </Box>
      )}
    </>
  );
};

export default CommentShow;
