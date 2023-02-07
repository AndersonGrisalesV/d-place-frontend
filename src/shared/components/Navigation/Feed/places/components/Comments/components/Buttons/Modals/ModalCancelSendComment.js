import React from "react";

import ButtonGobackSendComment from "../ButtonGobackSendComment";
import ButtonYesCancelSendComment from "../ButtonYesCancelSendComment";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

//* Styled component for styleModalCancelSendComment container Box
const styleModalCancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //* width for different screen sizes
  width: {
    sps: "244px",
    ps: "288px",
    ts: "288px",
    sls: "328px",
    sms: "368px",
    sc: "388px",
    nsc: "388px",
    ns: "388px",
    msc: "388px",
    mns: "388px",
    ms: "388px",
    lgs: "388px",
  },
  //* height for different screen sizes
  height: {
    sps: "4.1rem",
    ps: "4.5rem",
    ts: "4.6rem",
    sls: "5rem",
    sms: "5.6rem",
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

// open is a pointer to a function that changes the state open to true on CommentDisplay
// close is a pointer to a function that changes the state open to false on CommentDisplay
// onHandleClose is a pointer to a function that changes the state open to false on CommentDisplay
//* CancelSendComment is a pointer to a function that cancels the sending of a new comment and resets the value
const ModalCancelSendComment = ({
  open,
  close,
  onHandleClose,
  CancelSendComment,
}) => {
  const handleConfirmCancel = () => {
    CancelSendComment();
    onHandleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-confirm-cancel"
        aria-describedby="modal-modal-confirm-cancel-edit"
      >
        <Stack>
          <Box sx={styleModalCancel}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <DeleteOutlinedIcon
                  sx={{
                    backgroundColor: "transparent",
                    color: "#da4453c7",
                    //* width for different screen sizes
                    width: {
                      sps: "15px",
                      ps: "16px",
                      ts: "18px",
                      sls: "20px",
                      sms: "24px",
                      sc: "24px",
                      nsc: "24px",
                      ns: "24px",
                      msc: "24px",
                      mns: "24px",
                      ms: "24px",
                      lgs: "24px",
                    },
                    //* height for different screen sizes
                    height: {
                      sps: "18px",
                      ps: "20px",
                      ts: "22px",
                      sls: "22px",
                      sms: "30px",
                      sc: "30px",
                      nsc: "30px",
                      ns: "30px",
                      msc: "30px",
                      mns: "30px",
                      ms: "30px",
                      lgs: "30px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    display: "inline",
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "12px",
                      ps: "13px",
                      ts: "13px",
                      sls: "15px",
                      sms: "17px",
                      sc: "17px",
                      nsc: "17px",
                      ns: "17px",
                      msc: "17px",
                      mns: "17px",
                      ms: "17px",
                      lgs: "17px",
                    },
                  }}
                  fontWeight={600}
                  variant="h6"
                  color="text.primary"
                >
                  Your comment will be lost, cancel?
                </Typography>
              </Stack>
              {/* Margin correction */}
              <p style={{ margin: "1px" }} />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <ButtonYesCancelSendComment onYesCancel={handleConfirmCancel} />
                <ButtonGobackSendComment onGoback={close} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </div>
  );
};

export default ModalCancelSendComment;
