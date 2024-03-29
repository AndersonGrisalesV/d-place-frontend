import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../context/login-context";

import useFocusBlurHook from "../../../../../../shared/hooks/use-my-input";
import { useHttpClient } from "../../../../../hooks/http-hook";

import CardWrapperNewPlacePostDisplay from "./components/CardWrapperNewPlacePostDisplay";
import ScrollToTop from "../../../../../util/ScollTop/ScrollToTop";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import LoadingSpinnerWrapper from "../../../../LoadingSpinner/LoadingSpinnerWrapper";
import SnackBarResult from "../../../../LoginRegister/components/SnackBarResult";
import TitleNewPlacePost from "./components/TitleNewPlacePost";

import ButtonCancelPostPlace from "./components/Buttons/ButtonCancelPostPlace";
import ButtonPostPlace from "./components/Buttons/ButtonPostPlace";
import ImagePreviewPlaceButton from "./components/Buttons/ImagePreviewPlaceButton";
import ImageUploadPlaceButton from "./components/Buttons/ImageUploadPlaceButton";
import CardContentNewPlacePost from "./components/CardContentNewPlacePost";

import { Divider, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for TextField
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

const NewPlacePostDisplay = () => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();
  let navigate = useNavigate();

  // Import the `isLoading`, `error`, `sendRequest`, and `clearError` functions from the `useHttpClient` hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // State variable to store the success message visibility status
  const [showSuccess, setShowSuccess] = useState(false);

  // Initial form inputs state
  const initialFormInputs = {
    title: "",
    description: "",
    address: "",
    image: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  // State variable to store the selected image
  // State variable to store the image URL
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Define state and functions for controlling the opening/closing of a modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect hook to update the `imageUrl` state if `selectedImage` changes
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // formInputsHandler function to handle changes to form inputs
  const formInputsHandler = (e) => {
    if (e.target.name === "image") {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
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
  // Use the custom hook 'useFocusBlurHook' with input name 'titleInput'
  const {
    value: titleInput,
    isValid: titleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useFocusBlurHook((value) => validateTitle(value));

  function validateTitle(text) {
    if (text.trim() !== "" && text.length < 68) {
      return true;
    }
    return false;
  }
  // Use the custom hook 'useFocusBlurHook' with input name 'descriptionInput'
  const {
    value: descriptionInput,
    isValid: descriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useFocusBlurHook((value) => validateDescription(value));

  function validateDescription(text) {
    if (text.trim() !== "" && text.length < 378) {
      return true;
    }
    return false;
  }
  // Use the custom hook 'useFocusBlurHook' with input name 'addressInput'
  const {
    value: addressInput,
    isValid: addressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useFocusBlurHook((value) => validateAddress(value));

  function validateAddress(text) {
    if (text.trim() !== "" && text.length < 100) {
      return true;
    }
    return false;
  }

  // onSubmitPostPlaceHandler function handles submit event for the creation of a new place
  const onSubmitPostPlaceHandler = async (e) => {
    e.preventDefault();

    // Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);

    if (login.isLoggedIn && formIsValid) {
      let date = new Date().toJSON();

      if (!formInputs.image) {
        formInputs.image = {
          public_id: "1234",
          url: "",
        };
      }

      // Creates the FormData object and appends the form inputs to be send to the backend API point
      try {
        const myForm = new FormData();
        myForm.append("title", formInputs.title);
        myForm.append("description", formInputs.description);
        myForm.append("image", formInputs.image);
        myForm.append("postDate", date);
        myForm.append("address", formInputs.address);
        myForm.append("creatorId", login.userId);
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/newplace`,
          "POST",
          myForm,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        // Setting success message and show success flag
        setShowSuccess(true);

        // Timeout to change the succes messages, redirect and send a new notification
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/api/homepage");
          login.notification();
        }, "2000");
      } catch (err) {
        //! If there's an error the user must be redirected for the new attempt to be made in order to not cause conflict
        setFormInputs(
          {
            name: {
              value: formInputs.name,
            },
            email: {
              value: formInputs.email,
            },
            password: {
              value: formInputs.password,
            },
            confirmPassword: {
              value: formInputs.confirmPassword,
            },
            image: {
              value: formInputs.imageUrl.url,
            },
          },
          true
        );

        setImageUrl(formInputs.imageUrl.url);
        setSelectedImage(formInputs.imageUrl.url);
      }

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/updateusernotification`,
          "PATCH",
          null,
          {
            Authorization: "Bearer " + login.token,
            "Content-Type": "Application/json",
          }
        );
      } catch (err) {
        //! If there's an error updating the new notification for it to be shown to all users the error can be set to be displayed in the backend
      }
    }

    // Resets inputs
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();
    setImageUrl(null);
    setSelectedImage(null);
  };

  //* formIsValid is a boolean indicating whether the form is valid to enable the button send to create a new place
  let formIsValid = false;
  if (
    login.isLoggedIn &&
    titleIsValid &&
    descriptionIsValid &&
    addressIsValid &&
    imageUrl &&
    selectedImage
  ) {
    formIsValid = true;
  }

  // handleRemoveImage is a function toremove the image and set to null the values
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  return (
    <ScrollToTop pathname={pathname}>
      {error && <SnackBarResult error={error} onClear={clearError} />}
      {showSuccess && (
        <SnackBarResult
          onSuccess={true}
          onDuration={2000}
          message={"The place was created successfully"}
        />
      )}
      <CardWrapperNewPlacePostDisplay>
        <CardContentNewPlacePost>
          <TitleNewPlacePost />
          <Divider variant="middle" sx={{ marginTop: "2px" }} />
          <br />
          <br />
          <form
            onSubmit={onSubmitPostPlaceHandler}
            encType="multipart/form-data"
          >
            <Stack
              direction="column"
              spacing={4}
              justifyContent="space-between"
            >
              <StyleTextField
                id="outlined-title-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Title"
                type="text"
                autoComplete="title-text"
                size="small"
                name="title"
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
                  titleChangeHandler(e);
                }}
                onBlur={titleBlurHandler}
                value={titleInput}
                error={titleInputHasError}
                helperText={
                  titleInputHasError ? "Title cannot be empty or too long." : ""
                }
              />
              <StyleTextField
                id="outlined-description-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Description"
                multiline
                rows={4}
                autoComplete="description-text"
                size="small"
                name="description"
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
                  descriptionChangeHandler(e);
                }}
                onBlur={descriptionBlurHandler}
                value={descriptionInput}
                error={descriptionInputHasError}
                helperText={
                  descriptionInputHasError
                    ? "Description cannot be empty or too long."
                    : ""
                }
              />
              <StyleTextField
                id="outlined-address-input"
                disabled={
                  isLoading ? true : false || showSuccess ? true : false
                }
                label="Address"
                type="text"
                autoComplete="address-text"
                size="small"
                name="address"
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
                  addressChangeHandler(e);
                }}
                onBlur={addressBlurHandler}
                value={addressInput}
                error={addressInputHasError}
                helperText={
                  addressInputHasError
                    ? "Address cannot be empty or too long."
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
                      <ImageUploadPlaceButton
                        formInputsHandler={formInputsHandler}
                        isLoading={isLoading}
                        showSuccess={showSuccess}
                      />
                      {!imageUrl && !selectedImage ? (
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
                          "You have not selected a picture yet"
                        </Typography>
                      ) : null}
                      {imageUrl && selectedImage && (
                        <ImagePreviewPlaceButton
                          imageUrl={imageUrl}
                          selectedImageName={selectedImage.name}
                          handleRemoveImage={handleRemoveImage}
                        />
                      )}
                    </React.Fragment>

                    <Stack direction="row" spacing={0} justifyContent="center">
                      <ButtonCancelPostPlace
                        showSuccess={showSuccess}
                        open={open}
                        close={handleClose}
                        onHandleOpen={handleOpen}
                        onHandleClose={handleClose}
                      />
                      <ButtonPostPlace formIsValid={formIsValid} />
                    </Stack>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Stack>
          </form>
        </CardContentNewPlacePost>
      </CardWrapperNewPlacePostDisplay>
    </ScrollToTop>
  );
};

export default NewPlacePostDisplay;
