import React, { useContext, useEffect, useState, useRef } from "react";
import { Stack, TextField } from "@mui/material";
import { LoginContext } from "../shared/context/login-context";
import useFocusBlurHook from "../shared/hooks/use-my-input";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Title from "../shared/components/LoginRegister/components/Title";
import CardContentLogin from "../shared/components/LoginRegister/components/CardContentLogin";
import CardWrapperLogin from "../shared/components/LoginRegister/components/CardWrapperLogin";
import CreateAccountButton from "../shared/components/LoginRegister/Buttons/CreateAccountButton";
import LoginRegisterButton from "../shared/components/LoginRegister/Buttons/LoginRegisterButton";
import ButtonsWrapper from "../shared/components/LoginRegister/Buttons/ButtonsWrapper";
import ImageUploadButton from "../shared/components/LoginRegister/Buttons/ImageUploadButton";
import ImagePreviewButton from "../shared/components/LoginRegister/Buttons/ImagePreviewButton";

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
  const passwordInputRef = useRef();
  let navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [successMessage, setSuccessMessage] = useState(false);

  const initialFormInputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const onSubmitLoginRegisterHandler = (e) => {
    e.preventDefault();

    console.log(formInputs);
    if (isLoginMode) {
      login.login();
    } else {
      login.createAccount();
    }
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
    navigate("/");
    // setTimeout(navigate("/"), 8000);
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

  return (
    <CardWrapperLogin>
      <CardContentLogin>
        <Title isLoginMode={isLoginMode} />
        <form onSubmit={onSubmitLoginRegisterHandler}>
          <Stack direction="column" spacing={4} justifyContent="space-between">
            {!isLoginMode && (
              <StyleTextField
                id="outlined-name-input"
                label="Name"
                type="text"
                autoComplete="current-name"
                size="small"
                name="name"
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
              label="Email Address"
              type="email"
              autoComplete="current-email"
              size="small"
              name="email"
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
              label="Password"
              type="password"
              autoComplete="current-password"
              size="small"
              name="password"
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
                label="Confirm Password"
                type="password"
                autoComplete="current-confirmPassword"
                size="small"
                name="confirmPassword"
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
                <ImageUploadButton formInputsHandler={formInputsHandler} />
                {imageUrl && selectedImage && (
                  <ImagePreviewButton
                    imageUrl={imageUrl}
                    selectedImageName={selectedImage.name}
                  />
                )}
              </React.Fragment>
            )}
            <ButtonsWrapper>
              <LoginRegisterButton
                formIsValid={formIsValid}
                isLoginMode={isLoginMode}
              />
              <CreateAccountButton
                switchModeHandler={switchModeHandler}
                isLoginMode={isLoginMode}
              />
            </ButtonsWrapper>
          </Stack>
        </form>
      </CardContentLogin>
      {/* {successMessage ? showMessage : ""} */}
    </CardWrapperLogin>
  );
};

export default LoginRegister;
