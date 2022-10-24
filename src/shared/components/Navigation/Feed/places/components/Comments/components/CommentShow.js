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

const CommentShow = ({ DUMMY_COMMENTS, onButton, onAddComment }) => {
  const login = useContext(LoginContext);
  // console.log("here" + `${onButton}`);

  const [commentValue, setCommentValue] = useState(
    `${DUMMY_COMMENTS.commentText}`
  );

  const initialFormInputs = {
    commentText: `${DUMMY_COMMENTS.commentText}`,
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const formInputsHandler = (e) => {
    console.log("hello " + e.target.value);
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

  let formIsValid = false;

  if (login.isLoggedIn && commentIsValid) {
    formIsValid = true;
  }

  let sendCommentIsValid = false;

  if (formIsValid && !commentInputHasError) {
    sendCommentIsValid = true;
  }

  const handleSendComment = (e) => {
    console.log("hello" + formInputs.commentText);
    resetCommentInput();
  };

  const onSubmitEditCancelHandler = (e) => {
    e.preventDefault();

    // setTimeout(navigate("/"), 8000);
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

  const handleEditComment = () => {
    // if(login && userowncomment){
    if (login) {
      setEditComment((eComment) => !eComment);
    }
  };

  const handleConfirmCancel = () => {
    handleClose();
    setEditComment((eComment) => !eComment);
  };

  const handleDeleteComment = () => {
    // if(login && userowncomment){ deleete comment
    if (login) {
      handleOpen();
    }
  };

  const handleConfirmDelete = () => {
    handleClose();
  };

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
              title={DUMMY_COMMENTS.creatorName}
              alt={DUMMY_COMMENTS.creatorName}
              src={DUMMY_COMMENTS.creatorImageUrl}
            >
              {DUMMY_COMMENTS.creatorImageUrl === ""
                ? DUMMY_COMMENTS.creatorName.charAt(0)
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
                {DUMMY_COMMENTS.creatorName}
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
                  {DUMMY_COMMENTS.postCommentDate}
                </Typography>
                {`${DUMMY_COMMENTS.commentText}`}
              </Typography>
            }
          />
        </StyledListItem>
      ) : (
        <form onSubmit={onSubmitEditCancelHandler}>
          <Stack direction="column" spacing={4} justifyContent="space-between">
            <StyleTextField
              id="outlined-commentText-input"
              multiline
              defaultValue={commentInput}
              autoComplete="current-commentText"
              size="small"
              name="commentText"
              onChange={(e) => {
                formInputsHandler(e);
                commentChangeHandler(e);
              }}
              onBlur={commentBlurHandler}
              // value={commentInput}
              error={commentInputHasError}
              helperText={
                commentInputHasError ? "Edit our comment to send it." : ""
              }
            />
            <Stack direction="row" spacing={0} justifyContent="end">
              <ButtonSendComment
                sendCommentIsValid={sendCommentIsValid}
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
      {login.isLoggedIn && !editComment ? (
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
