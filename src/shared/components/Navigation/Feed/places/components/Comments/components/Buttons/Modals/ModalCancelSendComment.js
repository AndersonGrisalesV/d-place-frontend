import { Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonGobackSendComment from "../ButtonGobackSendComment";
import ButtonYesCancelSendComment from "../ButtonYesCancelSendComment";

const styleModalCancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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

const ModalCancelSendComment = ({
  open,
  close,
  onHandleOpen,
  onHandleClose,
  CancelSendComment,
}) => {
  let navigate = useNavigate();
  const handleConfirmCancel = () => {
    // redirect
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
            <Stack>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{
                    display: "inline",
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
