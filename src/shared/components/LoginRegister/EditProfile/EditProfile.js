import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import {
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";

import Title from "./components/Title";
import CardWrapperLogin from "../components/CardWrapperLogin";
import CardContentLogin from "../components/CardContentLogin";

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
import ButtonChangePassword from "./Buttons/ButtonChangePassword";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LoadingSpinnerWrapper from "../../LoadingSpinner/LoadingSpinnerWrapper";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

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

const StyleVisibilityOffIcon = styled(VisibilityOff)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#ffffff5c" : "#0000005e",
  },
}));

const StyleVisibilityIcon = styled(Visibility)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#ffffff5c" : "#0000005e",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#da4453c7",
  },
}));

const EditProfile = () => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();
  let navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUser, setLoadedUser] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const [showpassMatchError, setShowpassMatchError] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  const [formInputs, setFormInputs] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const params = useParams();

  const { uid } = params;

  const oldPasswordInputRef = useRef();

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
  const handleOpenDeleteProfile = () => handleOpenDeleteProfile(true);
  const handleCloseDeleteProfile = () => setOpenDeleteProfile(false);

  const [loadingSpinnerButtons, setLoadingSpinnerButtons] = useState(false);

  const handleOpenModalDeleteProfile = () => {
    // handleCloseDeletePlace();
    // setDeletePlace((ePlace) => !ePlace);
    if (login.isLoggedIn) {
      handleOpenDeleteProfile();
    }
  };

  const handleConfirmDeleteProfile = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/users/profile/deleteprofile/${uid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );

      setShowSuccess(true);
      setSuccessMessage(
        `${loadedUser.name}'s profile was successfully deleted`
      );
      setTimeout(() => {
        login.logout();
        navigate("/homepage");
      }, "200");
      setTimeout(() => {
        // navigate("/homepage");
        setShowSuccess(false);
      }, "2000");
    } catch (err) {
      console.log(err);
    }

    handleCloseDeleteProfile();
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/profile/${uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        setLoadedUser(responseData.user);
        // console.log(responseData.user);
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
              value: responseData.user.imageUrl.url,
              // isValid: true,
            },
          },
          true
        );

        setImageUrl(responseData.user.imageUrl.url);
        setSelectedImage(responseData.user.imageUrl.url);
        // console.log(formInputs.title);
      } catch (err) {}
    };
    fetchPlace();
  }, [
    sendRequest,
    uid,
    setFormData,
    setImageUrl,
    setSelectedImage,
    login.token,
  ]);

  // console.log(formInputs);

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
    if (e.target.name === "name" && showBlurName) {
      setShowBlurName(false);
    }

    if (e.target.name === "email" && showBlurEmail) {
      setShowBlurEmail(false);
    }

    if (e.target.name === "oldPassword" && showBlurPassword) {
      setShowOldPassword(false);
    }

    if (e.target.name === "password" && showBlurPassword) {
      setShowPassword(false);
    }

    if (e.target.name === "confirmPassword" && showBlurConfirmPassword) {
      setShowConfirmPassword(false);
    }

    if (e.target.name === "image" && showBlurImage) {
      setShowBlurImage(false);
    }

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
  const [showBlurOldPassword, setShowOldPassword] = useState(true);
  const [showBlurPassword, setShowPassword] = useState(true);
  const [showBlurConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showBlurImage, setShowBlurImage] = useState(true);

  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useFocusBlurHook((value) => validateNameAndLastName(value));

  function validateNameAndLastName(text) {
    if (text.trim() !== "" && text.length > 4) {
      return true;
    }
    return false;
  }

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useFocusBlurHook((value) => ValidateEmail(value));

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const {
    value: oldPasswordInput,
    isValid: oldPasswordIsValid,
    hasError: oldPasswordInputHasError,
    valueChangeHandler: oldPasswordChangeHandler,
    valueBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPasswordInput,
  } = useFocusBlurHook((value) => ValidatePassword(value));

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useFocusBlurHook((value) => ValidatePassword(value));

  function ValidatePassword(password) {
    if (password.trim() !== "" && password.length > 5) {
      return true;
    }
    return false;
  }

  const {
    value: confirmPasswordInput,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPasswordInput,
  } = useFocusBlurHook((value) => ValidatePasswordAndConfirmPassword(value));

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

  const handleDeleteProfileModal = () => {
    if (login.isLoggedIn) {
      setOpenDeleteProfile(true);
    }
  };

  const cleanListItemsHandler = () => {
    login.listItemsNotListed();
  };

  const onSubmitLoginRegisterHandler = async (e) => {
    e.preventDefault();
    setLoadingSpinnerButtons(true);
    if (changePassword && loadedUser.password !== oldPasswordInput) {
      setShowpassMatchError(true);
      setShowErrorPassword(`Your old password didn't match, please try again.`);
      resetOldPasswordInput();
      resetPasswordInput();
      resetconfirmPasswordInput();

      setTimeout(() => {
        setShowpassMatchError(false);
        setShowErrorPassword(null);
      }, "5090");
      return;
    }
    if (login.isLoggedIn && formInputs) {
      if (!formInputs.image && formInputs.image !== "noImage") {
        formInputs.image = {
          //Replace for a placeholder image
          public_id: "1234",
          url: "",
        };
      }

      if (showBlurName) {
        formInputs.name = "same";
      }
      if (showBlurEmail) {
        formInputs.email = "same";
      }
      if (showBlurPassword) {
        formInputs.password = "same";
      }
      if (showBlurConfirmPassword) {
        formInputs.confirmPassword = "same";
      }
      if (formInputs.image !== "noImage") {
        if (showBlurImage) {
          formInputs.image = "same";
        }
      }

      try {
        const myForm = new FormData();
        myForm.append("name", formInputs.name);
        myForm.append("email", formInputs.email);
        if (changePassword) {
          myForm.append("password", formInputs.password);
          myForm.append("confirmPassword", formInputs.confirmPassword);
        } else {
          myForm.append("password", "same");
          myForm.append("confirmPassword", "same");
        }

        myForm.append("image", formInputs.image);
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/profile/editprofile/${uid}`,
          "PATCH",
          myForm,
          {
            Authorization: "Bearer " + login.token,
          }
        );

        setSuccessMessage(
          `${responseData.user.name}'s profile was successfully updated`
        );
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/homepage");

          cleanListItemsHandler();

          // refresh page to change avatar in navigation bar
        }, "910");
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
          setLoadingSpinnerButtons(false);
        }, "930");
      } catch (err) {}
      resetNameInput();
      resetEmailInput();
    }

    resetOldPasswordInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
  };

  const [changePassword, setChangePassword] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  let formIsValid = false;

  if (login.isLoggedIn) {
    if (!showBlurName && nameIsValid && !changePassword) {
      formIsValid = true;
    } else if (!showBlurEmail && emailIsValid && !changePassword) {
      formIsValid = true;
    } else if (
      !showBlurPassword &&
      passwordIsValid &&
      !showBlurConfirmPassword &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    } else if (!showBlurImage && !changePassword) {
      formIsValid = true;
    }

    if (!selectedImage && !imageUrl && !changePassword) {
      if (loadedUser) {
        if (formInputs.image.value !== "") {
          formIsValid = false;
        }
      }
    }
    if (deleteImage) {
      if (loadedUser) {
        if (loadedUser.imageUrl.url === "") {
          formIsValid = false;
        } else {
          formIsValid = true;
        }
      }
    }
    // if (showBlurImage && !changePassword && !deleteImage) {
    //   formIsValid = true;
    // }
  }

  const handleRemoveImage = () => {
    formInputs.image = "noImage";

    if (loadedUser) {
      if (loadedUser.imageUrl.url === "") {
        setDeleteImage(false);
      } else {
        setDeleteImage(true);
      }
    }

    setSelectedImage(null);
    setImageUrl(null);
  };

  const changePasswordHandler = () => {
    setChangePassword((prevPassword) => !prevPassword);
    resetOldPasswordInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
  };

  let spinner = "";
  if (isLoading && !loadingSpinnerButtons) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          marginBottom: "100%",
          // marginTop: "24.2%",
          // marginLeft: "39.5%",
          // marginRight: "45%",
        }}
      >
        <LoadingSpinner asOverlay />
      </Box>
    );
  }

  const [showUserOldPassword, setShowUserOldPassword] = useState(false);

  const handleClickShowUserOldPassword = () =>
    setShowUserOldPassword((show) => !show);

  const [showUserNewPassword, setShowUserNewPassword] = useState(false);

  const handleClickShowUserNewPassword = () =>
    setShowUserNewPassword((show) => !show);

  return (
    <Box
      flex={5.6}
      p={0}
      style={{
        marginBottom: "100%",
      }}
    >
      {!loadingSpinnerButtons && isLoading ? (
        spinner
      ) : (
        <ScrollToTop pathname={pathname}>
          {error && (
            <SnackBarResultLogin
              onDuration={6000}
              error={error}
              onClear={clearError}
            />
          )}
          {showpassMatchError && (
            <SnackBarResultLogin
              onDuration={6000}
              onClear={clearError}
              error={`${showErrorPassword}`}
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
            {/* {!isLoading && loadedUser && !showSuccess && ( */}
            {loadedUser && !showSuccess && (
              <CardWrapperLogin>
                <CardContentLogin>
                  <Title />
                  <form
                    onSubmit={onSubmitLoginRegisterHandler}
                    encType="multipart/form-data"
                  >
                    <Stack
                      direction="column"
                      spacing={4}
                      justifyContent="space-between"
                    >
                      <React.Fragment>
                        {formInputs.image.value === "" || deleteImage ? (
                          <Typography
                            sx={{
                              marginTop: "40px",
                              display: "flex",
                              justifyContent: "center",
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
                            {formInputs.image.value === ""
                              ? `"${"You don't have a profile picture"}"`
                              : `"${"You profile picture will be deleted"}"`}
                          </Typography>
                        ) : null}
                        {imageUrl && selectedImage && (
                          <ImagePreviewEditProfileButton
                            imageUrl={imageUrl}
                            selectedImageName={selectedImage.name}
                            handleRemoveImage={handleRemoveImage}
                            isLoading={isLoading}
                            showSuccess={showSuccess}
                          />
                        )}
                        <ImageEditProfileButton
                          formInputsHandler={formInputsHandler}
                          isLoading={isLoading}
                          showSuccess={showSuccess}
                          setImageUrl={setImageUrl}
                          showBlurImage={showBlurImage}
                        />
                      </React.Fragment>

                      <StyleTextField
                        id="outlined-name-input"
                        disabled={
                          isLoading ? true : false || showSuccess ? true : false
                        }
                        label="Name"
                        type="text"
                        autoComplete="name-text"
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
                        onBlur={showBlurName ? null : nameBlurHandler}
                        // value={nameInput}
                        error={nameInputHasError}
                        helperText={
                          nameInputHasError
                            ? "Name must be at least 5 letters"
                            : ""
                        }
                      />

                      <StyleTextField
                        id="outlined-email-input"
                        disabled={
                          isLoading ? true : false || showSuccess ? true : false
                        }
                        label="Email Address"
                        type="email"
                        autoComplete="email-text"
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
                        onBlur={showBlurEmail ? null : emailBlurHandler}
                        // value={emailInput}
                        error={emailInputHasError}
                        helperText={emailInputHasError ? "Incorrect mail" : ""}
                      />
                      <ButtonChangePassword
                        isLoading={isLoading}
                        showSuccess={showSuccess}
                        onChangePassword={changePasswordHandler}
                        onValue={changePassword}
                      />
                      {changePassword ? (
                        <React.Fragment>
                          <Divider variant="middle" />
                          <StyleTextField
                            id="outlined-password-input"
                            disabled={
                              isLoading
                                ? true
                                : false || showSuccess
                                ? true
                                : false
                            }
                            label="Old Password"
                            type={showUserOldPassword ? "text" : "password"}
                            autoComplete="old-password"
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
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    disabled={
                                      isLoading || showSuccess ? true : false
                                    }
                                    disableRipple={true}
                                    sx={{ padding: "0px" }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowUserOldPassword}
                                  >
                                    {showUserOldPassword ? (
                                      <StyleVisibilityOffIcon
                                        sx={{
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
                            // defaultValue={`${loadedUser.password}`}
                            onChange={(e) => {
                              formInputsHandler(e);
                              oldPasswordChangeHandler(e);
                            }}
                            onBlur={
                              showBlurOldPassword
                                ? null
                                : oldPasswordBlurHandler
                            }
                            ref={oldPasswordInputRef}
                            value={oldPasswordInput}
                            error={oldPasswordInputHasError}
                            helperText={
                              oldPasswordInputHasError
                                ? "Password must be at least 6 characters long"
                                : ""
                            }
                          />

                          <StyleTextField
                            id="outlined-new-password-input"
                            disabled={
                              isLoading
                                ? true
                                : false || showSuccess
                                ? true
                                : false
                            }
                            label="New Password"
                            type={showUserNewPassword ? "text" : "password"}
                            autoComplete="new-password"
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
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    disabled={
                                      isLoading || showSuccess ? true : false
                                    }
                                    disableRipple={true}
                                    sx={{ padding: "0px" }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowUserNewPassword}
                                  >
                                    {showUserNewPassword ? (
                                      <StyleVisibilityOffIcon
                                        sx={{
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
                            onBlur={
                              showBlurPassword ? null : passwordBlurHandler
                            }
                            value={passwordInput}
                            error={passwordInputHasError}
                            helperText={
                              passwordInputHasError
                                ? "Password must be at least 6 characters long"
                                : ""
                            }
                          />
                          <StyleTextField
                            id="outlined-confirmpassword-input"
                            disabled={
                              isLoading
                                ? true
                                : false || showSuccess
                                ? true
                                : false
                            }
                            label="Confirm New Password"
                            type={showUserNewPassword ? "text" : "password"}
                            autoComplete="confirm-new-Password"
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
                            // defaultValue={`${loadedUser.confirmPassword}`}
                            onChange={(e) => {
                              formInputsHandler(e);
                              confirmPasswordChangeHandler(e);
                            }}
                            onBlur={
                              showBlurConfirmPassword
                                ? null
                                : confirmPasswordBlurHandler
                            }
                            value={confirmPasswordInput}
                            error={confirmPasswordInputHasError}
                            helperText={
                              confirmPasswordInputHasError
                                ? "Passwords don't match"
                                : ""
                            }
                          />
                        </React.Fragment>
                      ) : null}
                      <React.Fragment>
                        {isLoading || showSuccess ? (
                          <LoadingSpinnerWrapper onLogin={true}>
                            <LoadingSpinner />
                          </LoadingSpinnerWrapper>
                        ) : (
                          <React.Fragment>
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
                      open={openDeleteProfile}
                      handleClose={handleCloseDeleteProfile}
                      handleConfirmDelete={handleConfirmDeleteProfile}
                    />
                  ) : null}
                </CardContentLogin>
              </CardWrapperLogin>
            )}
          </React.Fragment>
        </ScrollToTop>
      )}
    </Box>
  );
};

export default EditProfile;
