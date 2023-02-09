import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginContext } from "../shared/context/login-context";

import { useHttpClient } from "../shared/hooks/http-hook";
import useFocusBlurHook from "../shared/hooks/use-my-input";

import ScrollToTop from "../shared/util/ScollTop/ScrollToTop";

import CardContentLogin from "../shared/components/LoginRegister/components/CardContentLogin";
import CardWrapperLogin from "../shared/components/LoginRegister/components/CardWrapperLogin";
import Title from "../shared/components/LoginRegister/components/Title";
import LoadingSpinner from "../shared/components/LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../shared/components/LoadingSpinner/LoadingSpinnerWrapper";
import SnackBarResult from "../shared/components/LoginRegister/components/SnackBarResult";

import ButtonsWrapper from "../shared/components/LoginRegister/Buttons/ButtonsWrapper";
import CreateAccountButton from "../shared/components/LoginRegister/Buttons/CreateAccountButton";
import ImagePreviewButton from "../shared/components/LoginRegister/Buttons/ImagePreviewButton";
import ImageUploadButton from "../shared/components/LoginRegister/Buttons/ImageUploadButton";
import LoginRegisterButton from "../shared/components/LoginRegister/Buttons/LoginRegisterButton";

import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "@emotion/styled";

//* Styled component for StyleTextField
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

//* Styled component for StyleVisibilityOffIcon
const StyleVisibilityOffIcon = styled(VisibilityOff)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#ffffff5c" : "#0000005e",
  },
}));

//* Styled component for StyleVisibilityIcon
const StyleVisibilityIcon = styled(Visibility)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#ffffff5c" : "#0000005e",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const LoginRegister = ({ mode, setMode }) => {
  const login = useContext(LoginContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const { pathname } = useLocation();

  let navigate = useNavigate();

  const passwordInputRef = useRef(null);

  // Initial form inputs state
  const initialFormInputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  // onSubmitLoginRegisterHandler function handles submit event for login and registration
  const onSubmitLoginRegisterHandler = async (e) => {
    e.preventDefault();
    //Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);

    //* Checks if there are no images selected in order to be formated correctly in the backend
    if (!formInputs.image || formInputs.image === "noImage") {
      formInputs.image = "";
    }

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formInputs.email,
            password: formInputs.password,
          }),
          {
            "Content-Type": "Application/json",
          }
        );

        // Setting success message and show success flag
        setSuccessMessage(`Welcome back ${responseData.user.name}`);
        setShowSuccess(true);

        // Timeout to login the user and prepared the LoggedIn token plus it closes the success message and navigate to homepage
        setTimeout(() => {
          login.login(
            responseData.user.id,
            responseData.token,
            null,
            responseData.user.themePreference === "light" ? "light" : "dark"
          );

          //Sets the new mode
          setMode(
            responseData.user.themePreference === "light" ? "light" : "dark"
          );
          navigate("/api/homepage");
        }, "910");
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
        }, "930");
        resetNameInput();
        resetEmailInput();

        setImageUrl(null);
        setSelectedImage(null);
      } catch (err) {
        //! Error shown to user when something goes wrong loggin in
      }
    } else {
      try {
        // Creates the FormData object and appends the form inputs to be send to the backend API point
        const myForm = new FormData();
        myForm.append("name", formInputs.name);
        myForm.append("email", formInputs.email);
        myForm.append("theme", mode === "light" ? "light" : "dark");
        myForm.append("notification", true);
        myForm.append("password", formInputs.password);
        myForm.append("confirmPassword", formInputs.confirmPassword);
        myForm.append("image", formInputs.image);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/register`,
          "POST",
          myForm
        );
        // Setting success message and show success flag
        setSuccessMessage(`Welcome to Dplace ${responseData.user.name}`);
        setShowSuccess(true);

        // Timeout to login the user and prepared the LoggedIn token plus it closes the success message and navigate to homepage
        setTimeout(() => {
          login.login(
            responseData.user.id,
            responseData.token,
            null,
            responseData.user.themePreference === "light" ? "light" : "dark"
          );

          //Sets the new mode
          setMode(
            responseData.user.themePreference === "light" ? "light" : "dark"
          );
          navigate("/api/homepage");
        }, "910");
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
        }, "930");

        // Resets inputs
        resetNameInput();
        resetEmailInput();
        setImageUrl(null);
        setSelectedImage(null);
      } catch (err) {
        //! Error shown to user when something goes wrong creating the new account
      }
    }

    // Each time the foomr is clicked the passwords fields' reset
    resetPasswordInput();
    resetconfirmPasswordInput();
  };

  // switchModeHandler function is used to toggle between login and sign up mode reseting the inputs each time
  const switchModeHandler = () => {
    resetNameInput();
    resetEmailInput();
    setImageUrl(null);
    setSelectedImage(null);
    resetPasswordInput();
    resetconfirmPasswordInput();
    setIsLoginMode((prevMode) => !prevMode);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // useEffect hook listens for changes to selectedImage and updates imageUrl accordingly.
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  //The formInputsHandler function is used to update the form inputs state, which is stored in the formInputs object. This function checks if the input being changed is an image, in which case it uses the FileReader API to read the image and convert it to a base64-encoded string, before updating the formInputs object with the image data. Otherwise, it updates the formInputs object with the new value of the changed input.
  const formInputsHandler = (e) => {
    if (e.target.name === "image") {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        //base64encoded string
        setFormInputs({
          ...formInputs,
          [e.target.name]: reader.result,
        });
      };
    } else {
      setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Use the custom hook 'useFocusBlurHook' with input name 'nameInput'
  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useFocusBlurHook((value) => validateNameAndLastName(value));

  // Use the custom hook 'useFocusBlurHook' with input name 'emailInput'
  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useFocusBlurHook((value) => ValidateEmail(value));

  // Use the custom hook 'useFocusBlurHook' with input name 'passwordInput'
  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useFocusBlurHook((value) => ValidatePassword(value));

  // Use the custom hook 'useFocusBlurHook' with input name 'confirmPasswordInput'
  const {
    value: confirmPasswordInput,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPasswordInput,
  } = useFocusBlurHook((value) => ValidatePasswordAndConfirmPassword(value));

  // Extra functions to validate inputs
  function validateNameAndLastName(text) {
    if (text.trim() !== "" && text.length > 4) {
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

  function ValidatePassword(password) {
    if (password.trim() !== "" && password.length > 5) {
      return true;
    }
    return false;
  }

  // Checks if the passwords are the same password and confirmPassword
  function ValidatePasswordAndConfirmPassword(password) {
    if (
      password.trim() !== "" &&
      password.length > 5 &&
      passwordInput.length > 5 &&
      passwordInput === password.trim()
    ) {
      return true;
    }
    return false;
  }

  //* formIsValid is a boolean indicating whether the form is valid to enable the button login/signup and login/signup
  let formIsValid = false;

  if (
    (isLoginMode && emailIsValid && passwordInput.length > 0) ||
    (!isLoginMode &&
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid)
  ) {
    formIsValid = true;
  }

  // handleRemoveImage is a function toremove the image and set to null the values
  const handleRemoveImage = () => {
    formInputs.image = "noImage";
    setSelectedImage(null);
    setImageUrl(null);
  };

  const [showUserPassword, setShowUserPassword] = useState(false);

  // handleClickShowUserPassword is a function that toggles the value of showUserPassword state between true and false.
  const handleClickShowUserPassword = () => {
    setShowUserPassword((show) => !show);
  };

  return (
    <ScrollToTop pathname={pathname}>
      {error && (
        <SnackBarResult onDuration={6000} error={error} onClear={clearError} />
      )}
      {showSuccess && (
        <SnackBarResult
          onSuccess={true}
          onDuration={800}
          message={`${successMessage}`}
        />
      )}
      <CardWrapperLogin onArrangesize={true}>
        <CardContentLogin>
          <Title isLoginMode={isLoginMode} />
          <form
            onSubmit={onSubmitLoginRegisterHandler}
            encType="multipart/form-data"
          >
            <Stack
              direction="column"
              spacing={4}
              justifyContent="space-between"
            >
              {!isLoginMode && (
                <StyleTextField
                  id="outlined-name-input"
                  disabled={
                    isLoading ? true : false || showSuccess ? true : false
                  }
                  label="Name"
                  type="text"
                  autoComplete="current-name"
                  size="small"
                  name="name"
                  InputLabelProps={{
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "12px",
                        ts: "14px",
                        sls: "14px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    },
                  }}
                  InputProps={{
                    inputProps: {
                      sx: {
                        //* fontSize for different screen sizes
                        fontSize: {
                          sps: "11px",
                          ps: "12px",
                          ts: "14px",
                          sls: "14px",
                          sms: "16px",
                          sc: "16px",
                          nsc: "16px",
                          ns: "16px",
                          msc: "16px",
                          mns: "16px",
                          ms: "16px",
                          lgs: "16px",
                        },
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "9px",
                        ps: "10px",
                        ts: "12px",
                        sls: "12px",
                        sms: "14px",
                        sc: "14px",
                        nsc: "14px",
                        ns: "14px",
                        msc: "14px",
                        mns: "14px",
                        ms: "14px",
                        lgs: "14px",
                      },
                    },
                  }}
                  onChange={(e) => {
                    formInputsHandler(e);
                    nameChangeHandler(e);
                  }}
                  onBlur={nameBlurHandler}
                  value={nameInput}
                  error={nameInputHasError}
                  helperText={
                    nameInputHasError ? "Name must be at least 5 letters" : ""
                  }
                />
              )}
              <StyleTextField
                id="outlined-email-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Email Address"
                type="email"
                autoComplete="current-email"
                size="small"
                name="email"
                InputLabelProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "11px",
                      ps: "12px",
                      ts: "14px",
                      sls: "14px",
                      sms: "16px",
                      sc: "16px",
                      nsc: "16px",
                      ns: "16px",
                      msc: "16px",
                      mns: "16px",
                      ms: "16px",
                      lgs: "16px",
                    },
                  },
                }}
                InputProps={{
                  inputProps: {
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "12px",
                        ts: "14px",
                        sls: "14px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "9px",
                      ps: "10px",
                      ts: "12px",
                      sls: "12px",
                      sms: "14px",
                      sc: "14px",
                      nsc: "14px",
                      ns: "14px",
                      msc: "14px",
                      mns: "14px",
                      ms: "14px",
                      lgs: "14px",
                    },
                  },
                }}
                onChange={(e) => {
                  formInputsHandler(e);
                  emailChangeHandler(e);
                }}
                onBlur={emailBlurHandler}
                value={emailInput}
                error={emailInputHasError}
                helperText={
                  emailInputHasError && isLoginMode
                    ? "Your email cannot be empty"
                    : emailInputHasError && !isLoginMode
                    ? "Incorrect mail"
                    : ""
                }
              />
              <StyleTextField
                id="outlined-password-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Password"
                type={showUserPassword ? "text" : "password"}
                autoComplete="current-password"
                size="small"
                name="password"
                InputLabelProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "11px",
                      ps: "12px",
                      ts: "14px",
                      sls: "14px",
                      sms: "16px",
                      sc: "16px",
                      nsc: "16px",
                      ns: "16px",
                      msc: "16px",
                      mns: "16px",
                      ms: "16px",
                      lgs: "16px",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={isLoading || showSuccess ? true : false}
                        disableRipple={true}
                        sx={{ padding: "0px" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowUserPassword}
                      >
                        {showUserPassword ? (
                          <StyleVisibilityOffIcon
                            sx={{
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
                        ) : (
                          <StyleVisibilityIcon
                            sx={{
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
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "12px",
                        ts: "14px",
                        sls: "14px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    //* fontSize for different screen sizes
                    fontSize: {
                      sps: "9px",
                      ps: "10px",
                      ts: "12px",
                      sls: "12px",
                      sms: "14px",
                      sc: "14px",
                      nsc: "14px",
                      ns: "14px",
                      msc: "14px",
                      mns: "14px",
                      ms: "14px",
                      lgs: "14px",
                    },
                  },
                }}
                onChange={(e) => {
                  formInputsHandler(e);
                  passwordChangeHandler(e);
                }}
                onBlur={!isLoginMode ? passwordBlurHandler : null}
                value={passwordInput}
                error={passwordInputHasError}
                ref={passwordInputRef}
                helperText={
                  passwordInputHasError && isLoginMode
                    ? "Your password cannot be empty"
                    : passwordInputHasError && !isLoginMode
                    ? "Password must be at least 6 characters long"
                    : ""
                }
              />
              {!isLoginMode && (
                <StyleTextField
                  id="outlined-confirmpassword-input"
                  disabled={
                    isLoading ? true : false || showSuccess ? true : false
                  }
                  label="Confirm Password"
                  type={showUserPassword ? "text" : "password"}
                  autoComplete="current-confirmPassword"
                  size="small"
                  name="confirmPassword"
                  InputLabelProps={{
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "12px",
                        ts: "14px",
                        sls: "14px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    },
                  }}
                  InputProps={{
                    inputProps: {
                      sx: {
                        //* fontSize for different screen sizes
                        fontSize: {
                          sps: "11px",
                          ps: "12px",
                          ts: "14px",
                          sls: "14px",
                          sms: "16px",
                          sc: "16px",
                          nsc: "16px",
                          ns: "16px",
                          msc: "16px",
                          mns: "16px",
                          ms: "16px",
                          lgs: "16px",
                        },
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      //* fontSize for different screen sizes
                      fontSize: {
                        sps: "9px",
                        ps: "10px",
                        ts: "12px",
                        sls: "12px",
                        sms: "14px",
                        sc: "14px",
                        nsc: "14px",
                        ns: "14px",
                        msc: "14px",
                        mns: "14px",
                        ms: "14px",
                        lgs: "14px",
                      },
                    },
                  }}
                  onChange={(e) => {
                    formInputsHandler(e);
                    confirmPasswordChangeHandler(e);
                  }}
                  onBlur={confirmPasswordBlurHandler}
                  value={confirmPasswordInput}
                  error={confirmPasswordInputHasError}
                  helperText={
                    confirmPasswordInputHasError ? "Passwords don't match" : ""
                  }
                />
              )}
              {!isLoginMode && (
                <React.Fragment>
                  <ImageUploadButton
                    showSuccess={showSuccess}
                    formInputsHandler={formInputsHandler}
                    isLoading={isLoading}
                  />
                  {!imageUrl && !selectedImage && !isLoading && !showSuccess ? (
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        //* fontSize for different screen sizes
                        fontSize: {
                          sps: "7px",
                          ps: "8px",
                          ts: "10px",
                          sls: "10px",
                          sms: "12px",
                          sc: "12px",
                          nsc: "12px",
                          ns: "12px",
                          msc: "12px",
                          mns: "12px",
                          ms: "12px",
                          lgs: "12px",
                        },
                      }}
                    >
                      "You have not selected a profile picture"
                    </Typography>
                  ) : null}
                  {imageUrl && selectedImage && (
                    <ImagePreviewButton
                      imageUrl={imageUrl}
                      selectedImageName={selectedImage.name}
                      handleRemoveImage={handleRemoveImage}
                      isLoading={isLoading}
                      showSuccess={showSuccess}
                    />
                  )}
                </React.Fragment>
              )}
              {isLoading ? (
                <LoadingSpinnerWrapper onLogin={true}>
                  <LoadingSpinner />
                </LoadingSpinnerWrapper>
              ) : (
                <ButtonsWrapper isLoginMode={isLoginMode}>
                  <LoginRegisterButton
                    formIsValid={formIsValid}
                    isLoginMode={isLoginMode}
                  />
                  <CreateAccountButton
                    showSuccess={showSuccess}
                    switchModeHandler={switchModeHandler}
                    isLoginMode={isLoginMode}
                  />
                </ButtonsWrapper>
              )}
            </Stack>
          </form>
        </CardContentLogin>
      </CardWrapperLogin>
    </ScrollToTop>
  );
};

export default LoginRegister;
