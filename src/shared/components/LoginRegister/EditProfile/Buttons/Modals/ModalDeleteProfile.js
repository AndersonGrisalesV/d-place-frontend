import React from "react";

import ButtonGoback from "../../../../Navigation/Feed/places/components/Comments/components/Buttons/ButtonGoback";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ButtonYesDelete from "../ButtonYesDelete";

//* Styled component for ModalDelete
const styleModalDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //* width for different screen sizes
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

// open is a boolean indicating if the modal is open and located on EditProfile
// close is a pointer to a function that changes the state open to false on EditProfile
//* handleConfirmDelete is a pointer to a function that triggers the deletion of a profile
const ModalDeleteProfile = ({ open, close, onConfirmDelete }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-delete-profile"
        aria-describedby="modal-delete-profile"
      >
        <Stack>
          <Box sx={styleModalDelete}>
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
                  Your profile will be deleted, continue?
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
                <ButtonGoback onGoback={close} />
                <ButtonYesDelete onYesDelete={onConfirmDelete} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </div>
  );
};

export default ModalDeleteProfile;
