import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { LoginContext } from "../../../../../context/login-context";

import useFocusBlurHook from "../../../../../../shared/hooks/use-my-input";
import { useHttpClient } from "../../../../../hooks/http-hook";

import CardContentEditPlacePost from "./components/CardContentEditPlacePost";
import CardWrapperEditPlacePostDisplay from "./components/CardWrapperEditPlacePostDisplay";
import TitleEditPlacePost from "./components/TitleEditPlacePost";
import ScrollToTop from "../../../../../util/ScollTop/ScrollToTop";
import LoadingSpinnerWrapper from "../../../../LoadingSpinner/LoadingSpinnerWrapper";
import SnackBarResult from "../../../../LoginRegister/components/SnackBarResult";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import ModalDeletePlace from "./components/Buttons/Modals/ModalDeletePlace";

import ButtonCancelEditPlace from "./components/Buttons/ButtonCancelEditPlace";
import ButtonEditPlace from "./components/Buttons/ButtonEditPlace";
import ImagePreviewEditPlaceButton from "./components/Buttons/ImagePreviewEditPlaceButton";
import ImageUploadEditPlaceButton from "./components/Buttons/ImageUploadEditPlaceButton";
import ButtonDeletePlace from "./components/Buttons/ButtonDeletePlace";

import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
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

const EditPlacePostDisplay = () => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();
  let navigate = useNavigate();

  // Import the `isLoading`, `error`, `sendRequest`, and `clearError` functions from the `useHttpClient` hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // State variable to store the loaded user
  const [loadedPlace, setLoadedPlace] = useState();

  // State variable to store the success message visibility status
  const [showSuccess, setShowSuccess] = useState(false);

  // State variable to store the form inputs
  const [formInputs, setFormInputs] = useState(null);

  // State variable to store the selected image
  // State variable to store the image URL
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const params = useParams();

  const { pid } = params;

  // Define state and functions for controlling the opening/closing of a modal to delete place
  const [openDeletePlace, setOpenDeletePlace] = useState(false);
  const handleOpenDeletePlace = () => setOpenDeletePlace(true);
  const handleCloseDeletePlace = () => setOpenDeletePlace(false);

  // handleOpenModalDeletePlace function to open the modal deletePlace
  const handleOpenModalDeletePlace = () => {
    if (login.isLoggedIn) {
      handleOpenDeletePlace();
    }
  };

  // handleConfirmDeletePlace is a function to handle the delete place event
  const handleConfirmDeletePlace = async (e) => {
    e.preventDefault();
    //Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/deleteplace/${pid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );

      // send a new notification
      login.notification();

      // Setting success message and show success flag and refirects
      setShowSuccess("The place was deleted successfully");
      setTimeout(() => {
        navigate("/api/homepage");
      }, "1000");
      // Timeout to change the succes messages and spinner back to default state
      setTimeout(() => {
        setShowSuccess(false);
      }, "2000");
    } catch (err) {
      //! If there's an error deleting the place it woill be trigger and shown on the same page
    }

    // Closes the modal warning the user is about to delete the place
    handleCloseDeletePlace();
  };

  //useEffect hook to fetch the place data from the backednAPI point
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${pid}`
        );
        setLoadedPlace(responseData.place);
        // set the form inputs to the retrieved place
        setFormInputs(
          {
            title: {
              value: responseData.place.title,
            },
            description: {
              value: responseData.place.description,
            },
            image: {
              value: responseData.place.imageUrl.url,
            },
            address: {
              value: responseData.place.address,
            },
            postDate: {
              value: responseData.place.postDate,
            },
          },
          true
        );
        // set the image URL and selected image data
        setImageUrl(responseData.place.imageUrl.url);
        setSelectedImage(responseData.place.imageUrl.url);
      } catch (err) {
        //! Error shown to user when something goes wrong fetching the places's info
      }
    };
    fetchPlace();
  }, [sendRequest, pid, setImageUrl, setSelectedImage]);

  // Define state and functions for controlling the opening/closing of a modal GObACK
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
    if (e.target.name === "title" && showBlurTitle) {
      setShowBlurTitle(false);
    }
    if (e.target.name === "description" && showBlurDescription) {
      setShowBlurDescription(false);
    }
    if (e.target.name === "image" && showBlurImage) {
      setShowImage(false);
    }

    if (e.target.name === "address" && showBlurAddress) {
      setShowAddress(false);
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
  const [showBlurTitle, setShowBlurTitle] = useState(true);
  const [showBlurDescription, setShowBlurDescription] = useState(true);
  const [showBlurAddress, setShowAddress] = useState(true);
  const [showBlurImage, setShowImage] = useState(true);

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

  // handleDeletePlaceModal function to handle opening the delete place modal
  const handleDeletePlaceModal = () => {
    if (login.isLoggedIn) {
      setOpenDeletePlace(true);
    }
  };

  // onSubmitPostPlaceHandler function handles submit event for edition of a place
  const onSubmitPostPlaceHandler = async (e) => {
    e.preventDefault();
    // Scrolls to the top of the page when the siibmit button is clicked
    window.scrollTo(0, 0);

    let date = new Date().toJSON();
    //! Checks if there are no images selected in order to be formated correctly in the backend (not used anymore, an image must be selected)
    if (login.isLoggedIn && formInputs) {
      if (!formInputs.image) {
        formInputs.image = {
          public_id: "1234",
          url: "",
        };
      }

      //if the blur of the title is shown set the title input to "same"
      if (showBlurTitle) {
        formInputs.title = "same";
      }
      //if the blur of the description is shown set the description input to "same"
      if (showBlurDescription) {
        formInputs.description = "same";
      }
      //if the blur of the image is shown set the image input to "same"
      if (showBlurImage) {
        formInputs.image = "same";
      }
      //if the blur of the address is shown set the address input to "same"
      if (showBlurAddress) {
        formInputs.address = "same";
      }

      // Creates the FormData object and appends the form inputs to be send to the backend API point
      try {
        const myForm = new FormData();
        myForm.append("title", formInputs.title);
        myForm.append("description", formInputs.description);
        myForm.append("image", formInputs.image);
        myForm.append("postDate", date);
        myForm.append("address", formInputs.address);
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/editplace/${pid}`,
          "PATCH",
          myForm,
          {
            Authorization: "Bearer " + login.token,
          }
        );
        // Setting success message and show success flag
        setShowSuccess("The place was updated successfully");
        // Timeout to redirect
        setTimeout(() => {
          setShowSuccess(false);
          navigate(`/api/places/${pid}`);
        }, "2000");
      } catch (err) {
        //! Error shown to user when something goes wrong editing the place
      }
    }
    // Reset inputs
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();
  };

  //* formIsValid is a boolean indicating whether the form is valid to enable the button send to edit the place
  let formIsValid = false;

  if (login.isLoggedIn) {
    if (!showBlurTitle && titleIsValid) {
      formIsValid = true;
    } else if (!showBlurDescription && descriptionIsValid) {
      formIsValid = true;
    } else if (!showBlurAddress && addressIsValid) {
      formIsValid = true;
    } else if (!showBlurImage) {
      formIsValid = true;
    }

    if (!selectedImage && !imageUrl) {
      formIsValid = false;
    }
  }

  // handleRemoveImage is a function toremove the image and set to null the values
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  //* A spinner contained within a long margin to keep light/dark themes consistent (if this is not added when a page is loading the background will be shown incorrectly)
  let spinner = "";
  if (isLoading) {
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

  return (
    <Box
      flex={5.6}
      p={0}
      style={{
        marginBottom: "100%",
      }}
    >
      {isLoading ? (
        spinner
      ) : (
        <ScrollToTop pathname={pathname}>
          {error && <SnackBarResult error={error} onClear={clearError} />}
          {showSuccess && (
            <SnackBarResult
              onSuccess={true}
              onDuration={800}
              message={showSuccess}
            />
          )}
          <React.Fragment>
            {!isLoading && loadedPlace && !showSuccess && (
              <CardWrapperEditPlacePostDisplay>
                <CardContentEditPlacePost>
                  <TitleEditPlacePost />
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
                        defaultValue={`${loadedPlace.title}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          titleChangeHandler(e);
                        }}
                        onBlur={showBlurTitle ? null : titleBlurHandler}
                        error={titleInputHasError}
                        helperText={
                          titleInputHasError
                            ? "Title cannot be empty or too long."
                            : ""
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
                        defaultValue={`${loadedPlace.description}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          descriptionChangeHandler(e);
                        }}
                        onBlur={
                          showBlurDescription ? null : descriptionBlurHandler
                        }
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
                        defaultValue={`${loadedPlace.address}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          addressChangeHandler(e);
                        }}
                        onBlur={showBlurAddress ? null : addressBlurHandler}
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
                              <ImageUploadEditPlaceButton
                                formInputsHandler={formInputsHandler}
                                isLoading={isLoading}
                                showSuccess={showSuccess}
                                setImageUrl={setImageUrl}
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
                                  "You must upload a picture"
                                </Typography>
                              ) : null}
                              {imageUrl && selectedImage && (
                                <ImagePreviewEditPlaceButton
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
                                <ButtonCancelEditPlace
                                  open={open}
                                  close={handleClose}
                                  onHandleOpen={handleOpen}
                                  onHandleClose={handleClose}
                                />
                                <ButtonEditPlace formIsValid={formIsValid} />
                              </Stack>
                              <ButtonDeletePlace
                                onDelete={handleDeletePlaceModal}
                              />
                            </Stack>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </Stack>
                  </form>
                  {openDeletePlace ? (
                    <ModalDeletePlace
                      open={handleOpenModalDeletePlace}
                      handleClose={handleCloseDeletePlace}
                      handleConfirmDelete={handleConfirmDeletePlace}
                    />
                  ) : null}
                </CardContentEditPlacePost>
              </CardWrapperEditPlacePostDisplay>
            )}
          </React.Fragment>
        </ScrollToTop>
      )}
    </Box>
  );
};

export default EditPlacePostDisplay;
