import React from "react";
import { Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ButtonYesDelete from "../../../../components/Comments/components/Buttons/ButtonYesDelete";
import ButtonGoback from "../../../../components/Comments/components/Buttons/ButtonGoback";

const styleModalDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sps: "280px",
    ps: "346px",
    ts: "380px",
    sls: "444px",
    sms: "509px",
    sc: "509px",
    nsc: "509px",
    ns: "509px",
    msc: "509px",
    mns: "509px",
    ms: "509px",
    lgs: "509px",
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

const ModalDeletePlace = ({ open, handleClose, handleConfirmDelete }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-cancel-delete-comment"
        aria-describedby="modal-modal-cancel-delete-comment"
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
                  Are you sure you want to delete this place ?
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
  );
};

export default ModalDeletePlace;
