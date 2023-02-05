import React, { useContext } from "react";

import { LoginContext } from "../../../../context/login-context";

import ModalCancel from "./Modals/ModalCancel";

import { Button, Zoom } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for Button
const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

// open is a boolean indicating if the modal is open and located on EditProfile
// close is a pointer to a function that changes the state open to false on EditProfile
// onOpenModal is a pointer to a function that triggers the cancelation of a profile editing on EditProfile
const ButtonCancelEditProfile = ({ open, close, onOpenModal }) => {
  const login = useContext(LoginContext);

  return (
    <React.Fragment>
      {login.isLoggedIn && (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <StyleButton
            disableRipple={true}
            onClick={onOpenModal}
            sx={{
              fontWeight: 500,
              textTransform: "none",
              // fontSize for different screen sizes
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
              // marginRight for different screen sizes
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
        {open && <ModalCancel open={open} close={close} />}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ButtonCancelEditProfile;
