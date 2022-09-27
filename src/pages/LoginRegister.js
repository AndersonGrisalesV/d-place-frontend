import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardWrapper from "../shared/components/Navigation/Feed/places/components/CardWrapper";
import { LoginContext } from "../shared/context/login-context";
import { useForm } from "../shared/hooks/form-hook";
import styled from "@emotion/styled";
import UploadButton from "../shared/components/LoginRegister/UploadButton";

const StyleTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
    },
  },
}));

const StyleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const LoginRegister = () => {
  const login = useContext(LoginContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const initialFormInputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const handleSetFormInputs = (e) => {
    setFormInputs(...formInputs, ([e.target.name] = e.target.value));
  };

  const loginRegisterSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(formState.inputs);
    login.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // setFormData(
      //   {
      //     ...formState.inputs,
      //     name: undefined,
      //   },
      //   formState.inputs.email.isValid && formState.inputs.password.isValid
      // );
    } else {
      // setFormData(
      //   {
      //     ...formState.inputs,
      //     name: {
      //       value: "",
      //       isValid: false,
      //     },
      //   },
      //   false
      // );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Box flex={8} p={8} m={1}>
      <Box
        sx={{
          marginLeft: "10px",
          marginTop: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardWrapper sx={{ marginRight: "105px" }}>
          <CardContent sx={{ width: "368px" }}>
            <Typography
              variant="h6"
              fontWeight={400}
              mt={2}
              mb={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoginMode ? "Login" : "Register"}
            </Typography>
            <Divider variant="middle" />
            <br />
            <br />
            <form onSubmit={loginRegisterSubmitHandler}>
              <Stack
                direction="column"
                spacing={4}
                justifyContent="space-between"
              >
                {!isLoginMode && (
                  <StyleTextField
                    id="outlined-name-input"
                    label="Name"
                    type="name"
                    autoComplete="current-name"
                    size="small"
                    name="name"
                  />
                )}
                <StyleTextField
                  id="outlined-email-input"
                  label="Email Address"
                  type="email"
                  autoComplete="current-email"
                  size="small"
                  name="email"
                />
                <StyleTextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  name="password"
                />
                {!isLoginMode && (
                  <StyleTextField
                    id="outlined-confirmpassword-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-confirmpassword"
                    size="small"
                    name="confirmPassword"
                  />
                )}
                <UploadButton />
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <StyleButton
                    type="submit"
                    disabled={isLoginMode ? false : true}
                    // disabled={!formState.isValid}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

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
                    }}
                  >
                    {isLoginMode ? "LOGIN" : "REGISTER"}
                  </StyleButton>
                  <StyleButton
                    onClick={switchModeHandler}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                    }}
                  >
                    {isLoginMode ? "Create an Account" : "Go back"}
                  </StyleButton>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default LoginRegister;
