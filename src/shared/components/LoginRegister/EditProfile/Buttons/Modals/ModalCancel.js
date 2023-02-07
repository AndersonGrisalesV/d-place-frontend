import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonGobackEditProfile from "../ButtonGobackEditProfile";
import ButtonYesCancelEditProfile from "../ButtonYesCancelEditProfile";

import { Box, Modal, Stack, Typography } from "@mui/material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

//* Styled component for ModalCancel
const styleModalCancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //* width for different screen sizes
  width: {
    sps: "234px",
    ps: "278px",
    ts: "278px",
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

// open is a boolean indicating if the modal is open or not located on EditProfile
// close is a pointer to a function that changes the state open to false on EditProfile
const ModalCancel = ({ open, close }) => {
  let navigate = useNavigate();

  //* Confirms cancel EditProfile
  const handleConfirmCancel = () => {
    close();
    navigate("/api/homepage");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-confirm-cancel-edit-profile"
        aria-describedby="modal-confirm-cancel-edit-profile"
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
                <DoDisturbIcon
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
                  Are you sure you want to cancel ?
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
                <ButtonYesCancelEditProfile onYesCancel={handleConfirmCancel} />
                <ButtonGobackEditProfile onGoback={close} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </div>
  );
};

export default ModalCancel;
