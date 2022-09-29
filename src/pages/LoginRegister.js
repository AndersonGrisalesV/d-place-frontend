import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
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
import UploadButton from "../shared/components/LoginRegister/UploadButton";
import useFocusBlurHook from "../shared/hooks/focusblur-hook";
import styled from "@emotion/styled";

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

const StyleButtonImage = styled(Button)(({ theme }) => ({
  border:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "1px solid #da4453",
  color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#da4453",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
    border:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.7)"
        : "1px solid #9b9b9bc7",
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

  const handlerOnFocus = (e) => {
    console.log(e.target.value);
    if (e.target.name === "image") {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        // console.log(reader.result); //base64encoded string
        setFormInputs({
          ...formInputs,
          [e.target.name]: "",
        });
        // console.log(reader.result);
      };
    } else {
      setFormInputs({
        ...formInputs,
        [e.target.name]: "",
      });
    }
  };

  const handleSetFormInputs = (e) => {
    console.log(e.target.value);
    if (e.target.name === "image") {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        // console.log(reader.result); //base64encoded string
        setFormInputs({
          ...formInputs,
          [e.target.name]: reader.result,
        });
        // console.log(reader.result);
      };
    } else {
      setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value,
      });
      e.target.error(true);
    }
  };

  const onSubmitLoginRegisterHandler = (e) => {
    e.preventDefault();
    console.log(formInputs);
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // const changeImageHandlerUrl = (e) => {
  //   let reader = new FileReader();

  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     // console.log(reader.result); //base64encoded string

  //     return reader.result;
  //   };
  //   // reader.onerror = (error) => {
  //   //   console.log("Error: ", error);
  //   // };

  // };

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useFocusBlurHook((value) => validateNameAndLastName(value));

  function validateNameAndLastName(text) {
    if (text.trim() !== "") {
      return true;
    }
    return false;
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

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
            <form onSubmit={onSubmitLoginRegisterHandler}>
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
                    onChange={handleSetFormInputs}
                    value={formInputs.name}
                    onFocus={handlerOnFocus}
                  />
                )}
                <StyleTextField
                  id="outlined-email-input"
                  label="Email Address"
                  type="email"
                  autoComplete="current-email"
                  size="small"
                  name="email"
                  value={formInputs.email}
                  onChange={handleSetFormInputs}
                />
                <StyleTextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  name="password"
                  onChange={handleSetFormInputs}
                  value={formInputs.password}
                />
                {!isLoginMode && (
                  <StyleTextField
                    id="outlined-confirmpassword-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-confirmpassword"
                    size="small"
                    name="confirmPassword"
                    onChange={handleSetFormInputs}
                    value={formInputs.confirmPassword}
                  />
                )}
                {!isLoginMode && (
                  <>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        onChange={handleSetFormInputs}
                        name="image"
                      />
                      <label
                        htmlFor="select-image"
                        style={{ marginLeft: "0px" }}
                      >
                        <StyleButtonImage
                          component="span"
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
                          }}
                        >
                          Upload Image
                        </StyleButtonImage>
                      </label>
                    </Stack>
                    {imageUrl && selectedImage && (
                      <React.Fragment>
                        <Typography
                          variant="h9"
                          fontWeight={300}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Image Preview
                        </Typography>
                        <Box mt={2} textAlign="center">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={imageUrl}
                              alt={selectedImage.name}
                              sx={{
                                width: 150,
                                height: 150,
                                border: "1px solid rgb(118, 118, 118)",
                              }}
                            />
                          </Box>
                        </Box>
                      </React.Fragment>
                    )}
                  </>
                )}
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <StyleButton
                    type="submit"
                    disabled={!isLoginMode ? false : true}
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
