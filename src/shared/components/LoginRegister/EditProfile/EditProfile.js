import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { LoginContext } from "../../../context/login-context";

import { useHttpClient } from "../../../hooks/http-hook";
import useFocusBlurHook from "../../../hooks/use-my-input";

import ScrollToTop from "../../../util/ScollTop/ScrollToTop";

import CardContentLogin from "../components/CardContentLogin";
import CardWrapperLogin from "../components/CardWrapperLogin";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../../LoadingSpinner/LoadingSpinnerWrapper";
import Title from "./components/Title";
import SnackBarResult from "../components/SnackBarResult";

import ImageEditProfileButton from "./Buttons/ImageEditProfileButton";
import ImagePreviewEditProfileButton from "./Buttons/ImagePreviewEditProfileButton";
import ButtonCancelEditProfile from "./Buttons/ButtonCancelEditProfile";
import ButtonChangePassword from "./Buttons/ButtonChangePassword";
import ButtonDeleteProfile from "./Buttons/ButtonDeleteProfile";
import ButtonEditProfile from "./Buttons/ButtonEditProfile";
import ModalDeleteProfile from "./Buttons/Modals/ModalDeleteProfile";

import {
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
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

const EditProfile = () => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();
  let navigate = useNavigate();

  // Import the `isLoading`, `error`, `sendRequest`, and `clearError` functions from the `useHttpClient` hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // State variable to store the loaded user
  const [loadedUser, setLoadedUser] = useState();

  // State variable to store the success message visibility status
  const [showSuccess, setShowSuccess] = useState(false);
  // State variable to store the success message
  const [successMessage, setSuccessMessage] = useState(null);

  // State variable to store the form inputs
  const [formInputs, setFormInputs] = useState(null);

  // State variable to store the selected image
  // State variable to store the image URL
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const params = useParams();

  const { uid } = params;

  // Reference for the old password input field
  const oldPasswordInputRef = useRef();

  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const handleCloseDeleteProfile = () => setOpenDeleteProfile(false);

  const [loadingSpinnerButtons, setLoadingSpinnerButtons] = useState(false);

  // handleConfirmDeleteProfile is a function that is called when the user confirms to delete their profile
  const handleConfirmDeleteProfile = async (e) => {
    e.preventDefault();
    //Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/profile/deleteprofile/${uid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );

      // Setting success message and show success flag
      setShowSuccess(true);
      setSuccessMessage(
        `${loadedUser.name}'s profile was successfully deleted`
      );

      // Timeoout to logout the user after the deletion of the profile and redirect
      setTimeout(() => {
        login.logout();
        navigate("/api/homepage");
      }, "200");
      setTimeout(() => {
        setShowSuccess(false);
      }, "2000");
    } catch (err) {
      //! Error shown to user when something goes wrong deleting the profile
    }

    // Closes the modal warning the user is about to delete the profile
    handleCloseDeleteProfile();
  };

  // fetchPlace is a useEffect hook that fetches the user profile data from the backend API
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile/${uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        setLoadedUser(responseData.user);

        // set the form inputs to the retrieved user profile data
        setFormInputs(
          {
            name: {
              value: responseData.user.name,
            },
            email: {
              value: responseData.user.email,
            },
            password: {
              value: responseData.user.password,
            },
            confirmPassword: {
              value: responseData.user.confirmPassword,
            },
            image: {
              value: responseData.user.imageUrl.url,
            },
          },
          true
        );
        // set the image URL and selected image data
        setImageUrl(responseData.user.imageUrl.url);
        setSelectedImage(responseData.user.imageUrl.url);
      } catch (err) {
        //! Error shown to user when something goes wrong fetching the user's info
      }
    };
    fetchPlace();
  }, [sendRequest, uid, setImageUrl, setSelectedImage, login.token]);

  // Define state and functions for controlling the opening/closing of a modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect hook to update the `imageUrl` state if `selectedImage` changes
  useEffect(() => {
    if (!imageUrl) {
      if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
      }
    }
  }, [selectedImage, imageUrl]);

  // formInputsHandler function to handle changes to form inputs
  const formInputsHandler = (e) => {
    if (e.target.name === "name" && showBlurName) {
      setShowBlurName(false);
    }

    if (e.target.name === "email" && showBlurEmail) {
      setShowBlurEmail(false);
    }

    if (e.target.name === "oldPassword" && showBlurPassword) {
      setShowBlurOldPassword(false);
    }

    if (e.target.name === "password" && showBlurPassword) {
      setShowBlurPassword(false);
    }

    if (e.target.name === "confirmPassword" && showBlurConfirmPassword) {
      setShowBlurConfirmPassword(false);
    }

    if (e.target.name === "image" && showBlurImage) {
      setShowBlurImage(false);
    }

    // If the input is for image, process the image and set it as a base64 encoded string
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
      // Update the form inputs with the new value
      setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Declare the state variables for each input, indicating if it has been blurred
  const [showBlurName, setShowBlurName] = useState(true);
  const [showBlurEmail, setShowBlurEmail] = useState(true);
  const [showBlurOldPassword, setShowBlurOldPassword] = useState(true);
  const [showBlurPassword, setShowBlurPassword] = useState(true);
  const [showBlurConfirmPassword, setShowBlurConfirmPassword] = useState(true);
  const [showBlurImage, setShowBlurImage] = useState(true);

  // Use the custom hook 'useFocusBlurHook' with input name 'nameInput'
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

  // Use the custom hook 'useFocusBlurHook' with input name 'emailInput'
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

  // Use the custom hook 'useFocusBlurHook' with input name 'oldPasswordInput'
  const {
    value: oldPasswordInput,
    isValid: oldPasswordIsValid,
    hasError: oldPasswordInputHasError,
    valueChangeHandler: oldPasswordChangeHandler,
    valueBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPasswordInput,
  } = useFocusBlurHook((value) => ValidatePassword(value));

  // Use the custom hook 'useFocusBlurHook' with input name 'passwordInput'
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
  // handleDeleteProfileModal function to handle opening the delete profile modal
  const handleDeleteProfileModal = () => {
    if (login.isLoggedIn) {
      setOpenDeleteProfile(true);
    }
  };

  // cleanListItemsHandler function to clean the list items on the leftSideBar
  const cleanListItemsHandler = () => {
    login.listItemsNotListed();
  };

  // onSubmitEditProfileHandler function handles submit event for edition of a profile
  const onSubmitEditProfileHandler = async (e) => {
    e.preventDefault();
    // Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);
    // Sets loading spinnerButtons to change them to a loadingSpinner
    setLoadingSpinnerButtons(true);

    //* Checks if there are no images selected in order to be formated correctly in the backend
    if (login.isLoggedIn && formInputs) {
      if (!formInputs.image && formInputs.image !== "noImage") {
        formInputs.image = {
          //Replace for a placeholder image
          public_id: "1234",
          url: "",
        };
      }
      //if the blur of the name is shown set the name input to "same"
      if (showBlurName) {
        formInputs.name = "same";
      }
      //if the blur of the email is shown set the email input to "same"
      if (showBlurEmail) {
        formInputs.email = "same";
      }
      //if the blur of the password is shown set the password input to "same"
      if (showBlurPassword) {
        formInputs.password = "same";
      }
      //if the blur of the confirmPassword is shown set the confirmPassword input to "same"
      if (showBlurConfirmPassword) {
        formInputs.confirmPassword = "same";
      }
      //if the blur of the image is shown set the image input to "same"
      if (formInputs.image !== "noImage") {
        if (showBlurImage) {
          formInputs.image = "same";
        }
      }
      // Creates the FormData object and appends the form inputs to be send to the backend API point
      try {
        const myForm = new FormData();
        myForm.append("name", formInputs.name);
        myForm.append("email", formInputs.email);
        if (changePassword) {
          myForm.append("oldPassword", oldPasswordInput);
          myForm.append("password", formInputs.password);
          myForm.append("confirmPassword", formInputs.confirmPassword);
        } else {
          myForm.append("password", "same");
          myForm.append("confirmPassword", "same");
        }

        myForm.append("image", formInputs.image);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile/editprofile/${uid}`,
          "PATCH",
          myForm,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        // Setting success message and show success flag
        setSuccessMessage(
          `${responseData.user.name}'s profile was successfully updated`
        );
        // Refreshes the avatar in order for changes to be reflected
        login.refreshAvatar();
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/api/homepage");
          cleanListItemsHandler();
        }, "910");
        // Timeout to change the succes messages and spinner back to default state
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage(null);
          setLoadingSpinnerButtons(false);
        }, "930");
      } catch (err) {
        //! If there's an error formInputs must be re-loaded with the user data again in order for it to not have any conflict if the user wants to try again
        setFormInputs(
          {
            name: {
              value: loadedUser.name,
            },
            email: {
              value: loadedUser.email,
            },
            password: {
              value: loadedUser.password,
            },
            confirmPassword: {
              value: loadedUser.confirmPassword,
            },
            image: {
              value: loadedUser.imageUrl.url,
            },
          },
          true
        );

        setImageUrl(loadedUser.imageUrl.url);
        setSelectedImage(loadedUser.imageUrl.url);
      }
      // Resets inputs
      resetNameInput();
      resetEmailInput();
    }
    // Each time the foomr is clicked the passwords fields' reset
    resetOldPasswordInput();
    resetPasswordInput();
    resetconfirmPasswordInput();
  };

  const [changePassword, setChangePassword] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  // handleRemoveImage is a function toremove the image and set to null the values
  const handleRemoveImage = () => {
    formInputs.image = "noImage";

    // Checks if user had an image when the profile was loaded in order to delete this image
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

  let formIsValid = false;

  // changePasswordHandler checks if form is valid based on various conditions, changes the value for a new password and ressets their input values
  const changePasswordHandler = () => {
    setChangePassword((prevPassword) => !prevPassword);

    // reset the old password, password and confirm password inputs
    resetOldPasswordInput();
    resetPasswordInput();
    resetconfirmPasswordInput();

    // Checks if name, email, password and confirm password inputs are valid
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
    // Check if an image is selected
    if (!selectedImage && !imageUrl && !changePassword) {
      if (loadedUser) {
        if (formInputs.image.value !== "") {
          formIsValid = false;
        }
      }
    }
    // Check if an image is deleted
    if (deleteImage) {
      if (loadedUser) {
        if (loadedUser.imageUrl.url === "") {
          formIsValid = false;
        } else {
          formIsValid = true;
        }
      }
    }
  };

  //* A spinner contained within a long margin to keep light/dark themes consistent (if this is not added when a page is loading the background will be shown incorrectly)
  let spinner = "";
  if (isLoading && !loadingSpinnerButtons) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          marginBottom: "100%",
        }}
      >
        <LoadingSpinner asOverlay />
      </Box>
    );
  }

  const [showUserOldPassword, setShowUserOldPassword] = useState(false);
  // handleClickShowUserOldPassword is a function that toggles the value of sshowUserOldPassword state between true and false in order to be shown or not
  const handleClickShowUserOldPassword = () =>
    setShowUserOldPassword((show) => !show);

  const [showUserNewPassword, setShowUserNewPassword] = useState(false);

  // handleClickShowUserNewPassword is a function that toggles the value of showUserPassword state between true and false.
  const handleClickShowUserNewPassword = () => {
    setShowUserNewPassword((show) => !show);
  };

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
  }

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
            <SnackBarResult
              onDuration={6000}
              error={error}
              onClear={clearError}
            />
          )}
          {showSuccess && (
            <SnackBarResult
              onSuccess={true}
              onDuration={800}
              message={`${successMessage}`}
            />
          )}
          <React.Fragment>
            {loadedUser && !showSuccess && (
              <CardWrapperLogin>
                <CardContentLogin>
                  <Title />
                  <form
                    onSubmit={onSubmitEditProfileHandler}
                    encType="multipart/form-data"
                  >
                    <Stack
                      direction="column"
                      spacing={4}
                      justifyContent="space-between"
                    >
                      <React.Fragment>
                        {(formInputs.image.value === "" &&
                          !imageUrl &&
                          !selectedImage) ||
                        (deleteImage && !imageUrl && !selectedImage) ? (
                          <Typography
                            sx={{
                              marginTop: "40px",
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
                        defaultValue={`${loadedUser.name}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          nameChangeHandler(e);
                        }}
                        onBlur={showBlurName ? null : nameBlurHandler}
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
                        defaultValue={`${loadedUser.email}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          emailChangeHandler(e);
                        }}
                        onBlur={showBlurEmail ? null : emailBlurHandler}
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
                                  onOpenModal={handleOpen}
                                />
                              </Stack>
                              <ButtonDeleteProfile
                                onDelete={handleDeleteProfileModal}
                              />
                            </Stack>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </Stack>
                  </form>
                  {openDeleteProfile ? (
                    <ModalDeleteProfile
                      open={openDeleteProfile}
                      close={handleCloseDeleteProfile}
                      onConfirmDelete={handleConfirmDeleteProfile}
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
