import React, { useState, useEffect, useContext } from "react";

import { LoginContext } from "../../../../../context/login-context";

import { useHttpClient } from "../../../../../hooks/http-hook";

import { Switch } from "@mui/material";
import styled from "@emotion/styled";

const StyleSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-switchBase": {
    padding: 8,
    margin: 3.2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#888" : "#da4453",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[600]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    marign: 2,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#da445385" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ModeSwitch = ({ mode, setMode }) => {
  const login = useContext(LoginContext);
  const { sendRequest } = useHttpClient();

  const switchVariant = mode === "light" ? false : true;
  const [changeSwitch, setChangeSwitch] = useState(switchVariant);

  useEffect(() => {
    setChangeSwitch(switchVariant);
  }, [switchVariant]);

  const modeHandler = async (e) => {
    setMode(mode === "light" ? "dark" : "light");

    if (login.isLoggedIn) {
      const updateTheme = async () => {
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/updatetheme/${login.userId}`,
            "PATCH",
            JSON.stringify({
              theme: mode === "light" ? "dark" : "light",
            }),
            {
              "Content-Type": "Application/json",
            }
          );
        } catch (err) {}
      };
      updateTheme();
    }

    const data = window.localStorage.getItem("userData");
    const newData = JSON.parse(data);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...newData, theme: mode === "light" ? "dark" : "light" })
    );
  };

  return (
    <>
      <StyleSwitch
        disableRipple={true}
        m={0}
        p={0}
        checked={changeSwitch}
        onChange={modeHandler}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default ModeSwitch;
