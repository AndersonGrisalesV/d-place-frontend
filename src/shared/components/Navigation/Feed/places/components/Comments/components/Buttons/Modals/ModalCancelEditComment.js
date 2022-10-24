import React from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import ButtonGoback from "../ButtonGoback";
import ButtonYesCancel from "../ButtonYesCancel";

const styleModalCancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sps: "257px",
    ps: "267px",
    ts: "287px",
    sls: "331px",
    sms: "396px",
    sc: "396px",
    nsc: "396px",
    ns: "396px",
    msc: "396px",
    mns: "396px",
    ms: "396px",
    lgs: "396px",
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

const ModalCancelEditComment = ({ open, handleClose, handleConfirmCancel }) => {
  return (
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
  );
};

export default ModalCancelEditComment;
