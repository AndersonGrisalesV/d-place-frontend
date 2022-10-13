import React, { useContext, useEffect, useState } from "react";
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
  Modal,
} from "@mui/material";
import ButtonEditDeleteComments from "./Buttons/ButtonEditDeleteComments";
import styled from "@emotion/styled";
import { LoginContext } from "../../../../../../../context/login-context";

import ButtonSendComment from "./Buttons/ButtonSendComment";
import ButtonCancelComment from "./Buttons/ButtonCancelComment";
import ButtonGoback from "./Buttons/ButtonGoback";
import ButtonYesCancel from "./Buttons/ButtonYesCancel";
import ButtonYesDelete from "./Buttons/ButtonYesDelete";

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

const styleModalCancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sps: "210px",
    ps: "290px",
    ts: "351px",
    sls: "400px",
    sms: "600px",
    sc: "388px",
    nsc: "388px",
    ns: "388px",
    msc: "388px",
    mns: "388px",
    ms: "388px",
    lgs: "388px",
  },
  height: {
    sps: "15rem",
    ps: "20rem",
    ts: "22rem",
    sls: "23rem",
    sms: "24rem",
    sc: "5.6rem",
    nsc: "5.6rem",
    ns: "5.6rem",
    msc: "5.6rem",
    mns: "5.6rem",
    ms: "5.6rem",
    lgs: "5.6rem",
  },
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingBottom: "0px",
};

const styleModalDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sps: "210px",
    ps: "290px",
    ts: "351px",
    sls: "400px",
    sms: "600px",
    sc: "509px",
    nsc: "509px",
    ns: "509px",
    msc: "509px",
    mns: "509px",
    ms: "509px",
    lgs: "509px",
  },
  height: {
    sps: "15rem",
    ps: "20rem",
    ts: "22rem",
    sls: "23rem",
    sms: "24rem",
    sc: "5.6rem",
    nsc: "5.6rem",
    ns: "5.6rem",
    msc: "5.6rem",
    mns: "5.6rem",
    ms: "5.6rem",
    lgs: "5.6rem",
  },
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingBottom: "0px",
};

const CommentShow = ({ DUMMY_COMMENTS, onButton }) => {
  const login = useContext(LoginContext);
  // console.log("here" + `${onButton}`);

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
    // if(login && userowncomment){
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
      ) : (
        <form onSubmit={onSubmitEditCancelHandler}>
          <Stack direction="column" spacing={4} justifyContent="space-between">
            <StyleTextField
              id="outlined-commentText-input"
              multiline
              defaultValue={DUMMY_COMMENTS.commentText}
              autoComplete="current-name"
              size="small"
              name="name"
              // onChange={(e) => {
              //    formInputsHandler(e);
              //    nameChangeHandler(e);
              // }}
              // onBlur={nameBlurHandler}
              // value={nameInput}
              // error={nameInputHasError}
              // helperText={
              //   nameInputHasError ? "Name must be at least 5 letters" : ""
            />

            {/* <ButtonsWrapper> */}
            {/* <LoginRegisterButton

              // formIsValid={formIsValid}
              // isLoginMode={isLoginMode}
              /> */}
            {/* <CreateAccountButton
                switchModeHandler={switchModeHandler}
                isLoginMode={isLoginMode}
              /> */}
            {/* </ButtonsWrapper> */}
            <Stack direction="row" spacing={0} justifyContent="end">
              <ButtonSendComment />
              <ButtonCancelComment onHandleOpen={handleOpen} />
            </Stack>
          </Stack>
        </form>
      )}

      {editComment ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-confirm-cancel"
            aria-describedby="modal-modal-confirm-cancel-edit"
          >
            <Stack>
              <Box sx={styleModalCancel}>
                <Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      sx={{ display: "inline" }}
                      fontSize={17}
                      fontWeight={600}
                      variant="h6"
                      color="text.primary"
                    >
                      Are you sure you want to cancel ?
                    </Typography>
                  </Stack>

                  <p style={{ margin: "1px" }} />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ButtonYesCancel onYesCancel={handleConfirmCancel} />
                    <ButtonGoback onGoback={handleClose} />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-confirm-cancel"
            aria-describedby="modal-modal-confirm-cancel-edit"
          >
            <Stack>
              <Box sx={styleModalDelete}>
                <Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      sx={{ display: "inline" }}
                      fontSize={17}
                      fontWeight={600}
                      variant="h6"
                      color="text.primary"
                    >
                      Are you sure you want to delete this comment ?
                    </Typography>
                  </Stack>

                  <p style={{ margin: "1px" }} />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ButtonYesDelete onYesDelete={handleConfirmDelete} />
                    <ButtonGoback onGoback={handleClose} />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Modal>
        </div>
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
