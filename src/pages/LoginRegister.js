import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Stack, TextField } from "@mui/material";
import Title from "../shared/components/LoginRegister/components/Title";
import CardContentLogin from "../shared/components/LoginRegister/components/CardContentLogin";
import CardWrapperLogin from "../shared/components/LoginRegister/components/CardWrapperLogin";
import CreateAccountButton from "../shared/components/LoginRegister/Buttons/CreateAccountButton";
import LoginRegisterButton from "../shared/components/LoginRegister/Buttons/LoginRegisterButton";
import ButtonsWrapper from "../shared/components/LoginRegister/Buttons/ButtonsWrapper";
import ImageUploadButton from "../shared/components/LoginRegister/Buttons/ImageUploadButton";
import ImagePreviewButton from "../shared/components/LoginRegister/Buttons/ImagePreviewButton";

import ScrollToTop from "../shared/util/ScollTop/ScrollToTop";

import { LoginContext } from "../shared/context/login-context";

import useFocusBlurHook from "../shared/hooks/use-my-input";
import { useHttpClient } from "../shared/hooks/http-hook";

import styled from "@emotion/styled";
import CardSkeletonLogin from "../shared/components/LoginRegister/components/CardSkeletonLogin";
import LoadingSpinner from "../shared/components/LoadingSpinner/LoadingSpinner";
import SnackBarResultLogin from "../shared/components/LoginRegister/components/SnackBarResultLogin";
import LoadingSpinnerWrapper from "../shared/components/LoadingSpinner/LoadingSpinnerWrapper";

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

const LoginRegister = () => {
  const login = useContext(LoginContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // let location = useLocation();
  // const from =
  //   location.pathname === "/api/users/loginregister" ? "/homepage" : -1;
  const { pathname } = useLocation();

  let navigate = useNavigate();

  // const [successMessage, setSuccessMessage] = useState(false);

  const passwordInputRef = useRef();

  const initialFormInputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const onSubmitLoginRegisterHandler = async (e) => {
    e.preventDefault();

    // console.log(formInputs.image);
    if (!formInputs.image) {
      formInputs.image = "";
    }
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users/login",
          "POST",
          JSON.stringify({
            email: formInputs.email,
            password: formInputs.password,
          }),
          {
            "Content-Type": "Application/json",
          }
        );

        // console.log(window.history.state.usr);

        // if (window.history.state.usr != null) {
        //   navigate("/homepage", { replace: true });
        // } else {
        //   window.history.go(-1);
        // }

        setSuccessMessage(`Welcome back ${responseData.user.name}`);
        setShowSuccess(true);
        setTimeout(() => {
          login.login(responseData.user.id);
          navigate("/homepage");
        }, "910");
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
        }, "930");
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users/register",
          "POST",
          JSON.stringify({
            name: formInputs.name,
            email: formInputs.email,
            password: formInputs.password,
            confirmPassword: formInputs.confirmPassword,
            image: formInputs.image,
          }),
          {
            "Content-Type": "Application/json",
          }
        );

        setSuccessMessage(`Welcome to Dplace ${responseData.user.name}`);
        setShowSuccess(true);
        setTimeout(() => {
          login.createAccount(responseData.user.id);
          navigate("/homepage");
        }, "910");
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
        }, "930");

        // navigate("/homepage", {
        //   state: {
        //     onSuccess: true,
        //     response: responseData.message,
        //     user: responseData.user,
        //   },
        // });
      } catch (err) {}
    }
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
    setImageUrl(null);
    setSelectedImage(null);
  };

  const switchModeHandler = () => {
    // if (!isLoginMode) {
    //   // setFormData(
    //   //   {
    //   //     ...formState.inputs,
    //   //     name: undefined,
    //   //   },
    //   //   formState.inputs.email.isValid && formState.inputs.password.isValid
    //   // );
    // } else {
    //   // setFormData(
    //   //   {
    //   //     ...formState.inputs,
    //   //     name: {
    //   //       value: "",
    //   //       isValid: false,
    //   //     },
    //   //   },
    //   //   false
    //   // );
    // }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const formInputsHandler = (e) => {
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
      };
    } else {
      setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useFocusBlurHook((value) => validateNameAndLastName(value));

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useFocusBlurHook((value) => ValidateEmail(value));

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useFocusBlurHook((value) => ValidatePassword(value));

  const {
    value: confirmPasswordInput,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPasswordInput,
  } = useFocusBlurHook((value) => ValidatePasswordAndConfirmPassword(value));

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

  let formIsValid = false;

  if (
    (isLoginMode && emailIsValid && passwordIsValid) ||
    (!isLoginMode &&
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid)
  ) {
    formIsValid = true;
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  return (
    <ScrollToTop pathname={pathname}>
      {error && (
        <SnackBarResultLogin
          onDuration={6000}
          error={error}
          onClear={clearError}
        />
      )}
      {showSuccess && (
        <SnackBarResultLogin
          onSuccess={true}
          onDuration={800}
          message={`${successMessage}`}
        />
      )}
      <CardWrapperLogin>
        <CardContentLogin>
          <Title isLoginMode={isLoginMode} />
          <form onSubmit={onSubmitLoginRegisterHandler}>
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
                helperText={emailInputHasError ? "Incorrect mail" : ""}
              />
              <StyleTextField
                id="outlined-password-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Password"
                type="password"
                autoComplete="current-password"
                size="small"
                name="password"
                InputLabelProps={{
                  sx: {
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
                onBlur={passwordBlurHandler}
                value={passwordInput}
                error={passwordInputHasError}
                ref={passwordInputRef}
                helperText={
                  passwordInputHasError
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
                  type="password"
                  autoComplete="current-confirmPassword"
                  size="small"
                  name="confirmPassword"
                  InputLabelProps={{
                    sx: {
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
                  {imageUrl && selectedImage && (
                    <ImagePreviewButton
                      imageUrl={imageUrl}
                      selectedImageName={selectedImage.name}
                      handleRemoveImage={handleRemoveImage}
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
