import React, { useContext } from "react";

import { LoginContext } from "../../../../../../../../context/login-context";

import ModalCancelSendComment from "./Modals/ModalCancelSendComment";
import { Button, styled, Zoom } from "@mui/material";

//* Styled component for Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// open is a boolean that indicates if the user wants to cancel the sending/creation of a new comment on CommentDisplay
// close is a pointer to a function that changes the state open to false on CommentShow
// onHandleOpen is a pointer to a function that changes the state open to true on CommentShow (they have to be individual functions or else MUI will have a conflict)
// onHandleClose is a pointer to a function that changes the state open to false on CommentShow (they have to be individual functions or else MUI will have a conflict)
// cancelSendCommentIsValid is a boolean that indicates if the user has a valid comment to send or not
const ButtonCancelSendComment = ({
  open,
  close,
  onHandleOpen,
  onHandleClose,
  handleCancelSendComment,
  cancelSendCommentIsValid,
}) => {
  const login = useContext(LoginContext);

  return (
    <React.Fragment>
      {login.isLoggedIn && (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <StyleButton
            disableRipple={true}
            onClick={onHandleOpen}
            disabled={cancelSendCommentIsValid ? false : true}
            sx={{
              fontWeight: 500,
              textTransform: "none",
              //* fontSize for different screen sizes
              fontSize: {
                sps: "10px",
                ps: "12px",
                ts: "12px",
                sls: "13px",
                sms: "14px",
                sc: "14px",
                nsc: "14px",
                ns: "14px",
                msc: "14px",
                mns: "14px",
                ms: "14px",
                lgs: "14px",
              },
              //* marginRight for different screen sizes
              marginRight: {
                sps: "-10px",
                ps: "-9px",
                ts: "-3px",
                sls: "-4px",
                sms: "4px",
                sc: "4px",
                nsc: "4px",
                ns: "4px",
                msc: "4px",
                mns: "4px",
                ms: "4px",
                lgs: "4px",
              },
            }}
          >
            Cancel
          </StyleButton>
        </Zoom>
      )}
      <React.Fragment>
        {open && (
          <ModalCancelSendComment
            open={open}
            close={close}
            onHandleClose={onHandleClose}
            CancelSendComment={handleCancelSendComment}
          />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ButtonCancelSendComment;
