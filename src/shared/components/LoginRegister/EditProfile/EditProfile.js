import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Stack, TextField } from "@mui/material";

import styled from "@emotion/styled";

import Title from "./components/Title";
import CardWrapperLogin from "../components/CardWrapperLogin";
import CardContentLogin from "../components/CardContentLogin";
import LoadingSpinnerWrapper from "../../LoadingSpinner/LoadingSpinnerWrapper";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ImageEditProfileButton from "./Buttons/ImageEditProfileButton";
import ImagePreviewEditProfileButton from "./Buttons/ImagePreviewEditProfileButton";
import SnackBarResultLogin from "../components/SnackBarResultLogin";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";

import { LoginContext } from "../../../context/login-context";
import { useHttpClient } from "../../../hooks/http-hook";
import useFocusBlurHook from "../../../../shared/hooks/use-my-input";
import { useForm } from "../../../hooks/form-hook";
import ButtonEditProfile from "./Buttons/ButtonEditProfile";
import ButtonCancelEditProfile from "./Buttons/ButtonCancelEditProfile";
import ButtonDeleteProfile from "./Buttons/ButtonDeleteProfile";
import ModalDeleteProfile from "./Buttons/Modals/ModalDeleteProfile";

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

const EditProfile = () => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();
  let navigate = useNavigate();

  const [loadedUser, setLoadedUser] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [successMessage, setSuccessMessage] = useState(null);

  const [formInputs, setFormInputs] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const params = useParams();

  const { uid } = params;

  const passwordInputRef = useRef();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const handleOpenDeletePlace = () => setOpenDeleteProfile(true);
  const handleCloseDeletePlace = () => setOpenDeleteProfile(false);

  const handleOpenModalDeleteProfile = () => {
    // handleCloseDeletePlace();
    // setDeletePlace((ePlace) => !ePlace);
    if (login.isLoggedIn) {
      handleOpenDeletePlace();
    }
  };

  const handleConfirmDeleteProfile = async (e) => {
    e.preventDefault();
    // try {
    //   await sendRequest(
    //     `http://localhost:4000/api/places/deleteplace/${uid}`,
    //     "DELETE"
    //   );

    //   setShowSuccess("The place was deleted successfully");
    //   setTimeout(() => {
    //     navigate("/homepage");
    //   }, "1000");
    //   setTimeout(() => {
    //     // navigate("/homepage");
    //     setShowSuccess(false);
    //   }, "2000");
    // } catch (err) {}

    handleCloseDeletePlace();
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/profile/${uid}`
        );
        setLoadedUser(responseData.user);
        console.log(responseData.user);
        // console.log(responseData.place);

        setFormInputs(
          {
            name: {
              value: responseData.user.name,
              // isValid: true,
            },
            email: {
              value: responseData.user.email,
              // isValid: true,
            },
            password: {
              value: responseData.user.password,
              // isValid: true,
            },
            confirmPassword: {
              value: responseData.user.confirmPassword,
              // isValid: true,
            },
            image: {
              value: responseData.user.imageUrl,
              // isValid: true,
            },
          },
          true
        );
        setImageUrl(responseData.user.imageUrl);
        setSelectedImage(responseData.user.imageUrl);
        // console.log(formInputs.title);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, uid, setFormData, setImageUrl, setSelectedImage]);

  const onSubmitLoginRegisterHandler = async (e) => {
    e.preventDefault();

    // console.log(formInputs.image);
    if (!formInputs.image) {
      formInputs.image = "";
    }

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

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
    setImageUrl(null);
    setSelectedImage(null);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!imageUrl) {
      if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
      }
    }
  }, [selectedImage, imageUrl]);

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

  const [showBlurName, setShowBlurName] = useState(true);
  const [showBlurEmail, setShowBlurEmail] = useState(true);
  const [showBlurPassword, setShowPassword] = useState(true);
  const [showBlurConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showBlurImage, setShowImage] = useState(true);

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

  const handleDeleteProfileModal = () => {
    if (login.isLoggedIn) {
      handleOpenDeletePlace();
    }
  };

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

  // if (
  //   (isLoginMode && emailIsValid && passwordIsValid) ||
  //   (!isLoginMode &&
  //     nameIsValid &&
  //     emailIsValid &&
  //     passwordIsValid &&
  //     confirmPasswordIsValid)
  // ) {
  //   formIsValid = true;
  // }

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
      <React.Fragment>
        {!isLoading && loadedUser && !showSuccess && (
          <CardWrapperLogin>
            <CardContentLogin>
              <Title />
              <form onSubmit={onSubmitLoginRegisterHandler}>
                <Stack
                  direction="column"
                  spacing={4}
                  justifyContent="space-between"
                >
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
                    defaultValue={`${loadedUser.name}`}
                    onChange={(e) => {
                      formInputsHandler(e);
                      nameChangeHandler(e);
                    }}
                    onBlur={showBlurName ? "" : nameBlurHandler}
                    // value={nameInput}
                    error={nameInputHasError}
                    helperText={
                      nameInputHasError ? "Name must be at least 5 letters" : ""
                    }
                  />

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
                    defaultValue={`${loadedUser.email}`}
                    onChange={(e) => {
                      formInputsHandler(e);
                      emailChangeHandler(e);
                    }}
                    onBlur={showBlurEmail ? "" : emailBlurHandler}
                    // value={emailInput}
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
                    defaultValue={`${loadedUser.password}`}
                    onChange={(e) => {
                      formInputsHandler(e);
                      passwordChangeHandler(e);
                    }}
                    onBlur={showBlurPassword ? "" : passwordBlurHandler}
                    // value={passwordInput}
                    error={passwordInputHasError}
                    ref={passwordInputRef}
                    helperText={
                      passwordInputHasError
                        ? "Password must be at least 6 characters long"
                        : ""
                    }
                  />
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
                    defaultValue={`${loadedUser.confirmPassword}`}
                    onChange={(e) => {
                      formInputsHandler(e);
                      confirmPasswordChangeHandler(e);
                    }}
                    onBlur={
                      showBlurConfirmPassword ? "" : confirmPasswordBlurHandler
                    }
                    // value={confirmPasswordInput}
                    error={confirmPasswordInputHasError}
                    helperText={
                      confirmPasswordInputHasError
                        ? "Passwords don't match"
                        : ""
                    }
                  />
                  <React.Fragment>
                    {isLoading || showSuccess ? (
                      <LoadingSpinnerWrapper onNewPlace={true}>
                        <LoadingSpinner />
                      </LoadingSpinnerWrapper>
                    ) : (
                      <React.Fragment>
                        <React.Fragment>
                          <ImageEditProfileButton
                            formInputsHandler={formInputsHandler}
                            isLoading={isLoading}
                            showSuccess={showSuccess}
                            setImageUrl={setImageUrl}
                            showBlurImage={showBlurImage}
                          />
                          {imageUrl && selectedImage && (
                            <ImagePreviewEditProfileButton
                              imageUrl={imageUrl}
                              selectedImageName={selectedImage.name}
                              handleRemoveImage={handleRemoveImage}
                            />
                          )}
                        </React.Fragment>

                        <Stack
                          spacing={2}
                          direction="column"
                          sx={{
                            margin: "0px",
                            padding: "0px",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="center"
                          >
                            <ButtonEditProfile formIsValid={formIsValid} />
                            <ButtonCancelEditProfile
                              open={open}
                              close={handleClose}
                              onHandleOpen={handleOpen}
                              onHandleClose={handleClose}
                            />
                          </Stack>
                          <ButtonDeleteProfile
                            onDelete={handleDeleteProfileModal}
                          />
                        </Stack>
                      </React.Fragment>
                    )}
                  </React.Fragment>

                  {/* {isLoading ? (
                <LoadingSpinnerWrapper onLogin={true}>
                  <LoadingSpinner />
                </LoadingSpinnerWrapper>
              ) : (
                <p> </p>
                // <ButtonsWrapper isLoginMode={isLoginMode}>
              
                // </ButtonsWrapper>
              )} */}
                </Stack>
              </form>
              {openDeleteProfile ? (
                <ModalDeleteProfile
                  open={handleOpenModalDeleteProfile}
                  handleClose={handleCloseDeletePlace}
                  handleConfirmDelete={handleConfirmDeleteProfile}
                />
              ) : null}
            </CardContentLogin>
          </CardWrapperLogin>
        )}
      </React.Fragment>
    </ScrollToTop>
  );
};

export default EditProfile;
