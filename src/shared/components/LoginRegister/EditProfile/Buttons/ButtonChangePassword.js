import React, { useContext } from "react";

import { LoginContext } from "../../../../context/login-context";

import { Button, Zoom } from "@mui/material";
import { styled } from "@mui/system";

const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  border:
    theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const ButtonChangePassword = ({
  onChangePassword,
  onValue = false,
  isLoading,
  showSuccess,
}) => {
  const login = useContext(LoginContext);

  return (
    <React.Fragment>
      {login.isLoggedIn && (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <StyleButton
            disabled={isLoading ? true : false || showSuccess ? true : false}
            onClick={onChangePassword}
            sx={{
              fontWeight: 500,
              textTransform: "none",
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
            {!onValue ? "CHANGE PASSWORD" : "LEAVE OLD PASSWORD"}
          </StyleButton>
        </Zoom>
      )}
    </React.Fragment>
  );
};

export default ButtonChangePassword;
