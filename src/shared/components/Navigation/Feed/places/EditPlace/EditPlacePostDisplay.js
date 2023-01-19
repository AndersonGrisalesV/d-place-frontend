import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import CardWrapperEditPlacePostDisplay from "./components/CardWrapperEditPlacePostDisplay";
import CardContentEditPlacePost from "./components/CardContentEditPlacePost";
import TitleEditPlacePost from "./components/TitleEditPlacePost";
// import CardContentNewPlacePost from "./components/CardContentNewPlacePost";
// import CardWrapperNewPlacePostDisplay from "./components/CardWrapperNewPlacePostDisplay";
// import TitleNewPlacePost from "./components/TitleNewPlacePost";
// import ButtonCancelPostPlace from "./components/Buttons/ButtonCancelPostPlace";
// import ImageUploadPlaceButton from "./components/Buttons/ImageUploadPlaceButton";
// import ImagePreviewPlaceButton from "./components/Buttons/ImagePreviewPlaceButton";
// import ButtonPostPlace from "./components/Buttons/ButtonPostPlace";

import useFocusBlurHook from "../../../../../../shared/hooks/use-my-input";

import { LoginContext } from "../../../../../context/login-context";

import styled from "@emotion/styled";
import ImageUploadEditPlaceButton from "./components/Buttons/ImageUploadEditPlaceButton";
import ImagePreviewEditPlaceButton from "./components/Buttons/ImagePreviewEditPlaceButton";
import ButtonEditPlace from "./components/Buttons/ButtonEditPlace";
import ButtonCancelEditPlace from "./components/Buttons/ButtonCancelEditPlace";

import ScrollToTop from "../../../../../util/ScollTop/ScrollToTop";
import SnackBarResultLogin from "../../../../LoginRegister/components/SnackBarResultLogin";
import LoadingSpinnerWrapper from "../../../../LoadingSpinner/LoadingSpinnerWrapper";

import { useForm } from "../../../../../hooks/form-hook";
import { useHttpClient } from "../../../../../hooks/http-hook";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import ButtonDeletePlace from "./components/Buttons/ButtonDeletePlace";
import ModalDeletePlace from "./components/Buttons/Modals/ModalDeletePlace";

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

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlace, setLoadedPlace] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  //   const initialFormInputs = {
  //   title: "",
  //   description: "",
  //   address: "",
  //   image: "",
  //   // imageUrl: "",
  // };

  const [formInputs, setFormInputs] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const params = useParams();

  const { pid } = params;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      // location: {
      //   value: "",
      //   isValid: false,
      // },
      postDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //   const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const handleDeleteComment = () => {
  //   // if(login && userowncomment){ deleete comment
  //   if (login.isLoggedIn) {
  //     handleOpen();
  //   }
  // };

  const [openDeletePlace, setOpenDeletePlace] = useState(false);
  const handleOpenDeletePlace = () => setOpenDeletePlace(true);
  const handleCloseDeletePlace = () => setOpenDeletePlace(false);

  const [deletePlace, setDeletePlace] = useState(false);

  const handleOpenModalDeletePlace = () => {
    // handleCloseDeletePlace();
    // setDeletePlace((ePlace) => !ePlace);
    if (login.isLoggedIn) {
      handleOpenDeletePlace();
    }
  };

  const handleConfirmDeletePlace = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/places/deleteplace/${pid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + login.token,
        }
      );

      setShowSuccess("The place was deleted successfully");
      setTimeout(() => {
        navigate("/homepage");
      }, "1000");
      setTimeout(() => {
        // navigate("/homepage");
        setShowSuccess(false);
      }, "2000");
    } catch (err) {
      // setTimeout(() => {
      //   onErrorDeleteComment(
      //     err,
      //     "errorDelete",
      //     null,
      //     "Something went wrong, try again"
      //   );
      //   onRefreshPlaceComments(onPlaceComments.placeId);
      // }, "910");
    }

    handleCloseDeletePlace();
  };

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:4000/api/places/${pid}`
  //       );
  //       setLoadedPlace(responseData.place);

  //       console.log(responseData.place);
  //     } catch (err) {}
  //   };
  //   fetchPlaces();
  // }, [sendRequest, pid]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/${pid}`
        );
        setLoadedPlace(responseData.place);
        // console.log("down here");
        // console.log(responseData.place);

        setFormInputs(
          {
            title: {
              value: responseData.place.title,
              // isValid: true,
            },
            description: {
              value: responseData.place.description,
              // isValid: true,
            },
            image: {
              value: responseData.place.imageUrl.url,
              // isValid: true,
            },
            address: {
              value: responseData.place.address,
              // isValid: true,
            },
            postDate: {
              value: responseData.place.postDate,
              // isValid: true,
            },
          },
          true
        );
        setImageUrl(responseData.place.imageUrl.url);
        setSelectedImage(responseData.place.imageUrl.url);
        // console.log(formInputs.title);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, pid, setFormData, setImageUrl, setSelectedImage]);

  //   const result = DUMMY_PLACES[0].map((place) => place.placeId === PlaceId);

  // console.log(result);

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
    // console.log(e.target.name);
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

    // console.log("aqui" + e.target.value);
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

  const [showBlurTitle, setShowBlurTitle] = useState(true);
  const [showBlurDescription, setShowBlurDescription] = useState(true);
  const [showBlurAddress, setShowAddress] = useState(true);
  const [showBlurImage, setShowImage] = useState(true);

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

  const handleDeletePlaceModal = () => {
    if (login.isLoggedIn) {
      setOpenDeletePlace(true);
    }
  };

  const onSubmitPostPlaceHandler = async (e) => {
    e.preventDefault();

    let date = new Date().toJSON();
    if (login.isLoggedIn && formInputs) {
      // console.log(formInputs);

      if (!formInputs.image) {
        formInputs.image = {
          //Replace for a placeholder image
          public_id: "1234",
          url: "",
        };
      }

      if (showBlurTitle) {
        formInputs.title = "same";
      }
      if (showBlurDescription) {
        formInputs.description = "same";
      }
      if (showBlurImage) {
        formInputs.image = "same";
      }
      if (showBlurAddress) {
        formInputs.address = "same";
      }

      // console.log(formInputs.image);
      try {
        const myForm = new FormData();
        myForm.append("title", formInputs.title);
        myForm.append("description", formInputs.description);
        myForm.append("image", formInputs.image);
        myForm.append("postDate", date);
        myForm.append("address", formInputs.address);
        await sendRequest(
          `http://localhost:4000/api/places/editplace/${pid}`,
          "PATCH",
          myForm,
          {
            Authorization: "Bearer " + login.token,
          }
        );

        // await sendRequest(
        //   `http://localhost:4000/api/places/editplace/${pid}`,
        //   "PATCH",
        //   JSON.stringify({
        //     title: formInputs.title,
        //     description: formInputs.description,
        //     address: formInputs.address,
        //     image: formInputs.image,
        //     postDate: date,
        //   }),
        //   {
        //     "Content-Type": "Application/json",
        //   }
        // );

        // navigate(`/api/places/${pid}`, { state: { editPlace: "edited" } });

        setShowSuccess("The place was updated successfully");
        setTimeout(() => {
          setShowSuccess(false);
          navigate(`/api/places/${pid}`);
        }, "2000");
      } catch (err) {}
    }
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();
  };

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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  let spinner = "";
  if (isLoading) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          marginBottom: "100%",
          // marginTop: "24%",
          // marginLeft: "40%",
          // marginRight: "46%",
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
          {error && <SnackBarResultLogin error={error} onClear={clearError} />}
          {showSuccess && (
            <SnackBarResultLogin
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
                        defaultValue={`${loadedPlace.title}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          titleChangeHandler(e);
                        }}
                        onBlur={showBlurTitle ? null : titleBlurHandler}
                        // value={titleInput}
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
                        defaultValue={`${loadedPlace.description}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          descriptionChangeHandler(e);
                        }}
                        onBlur={
                          showBlurDescription ? null : descriptionBlurHandler
                        }
                        // value={descriptionInput}
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
                        defaultValue={`${loadedPlace.address}`}
                        onChange={(e) => {
                          formInputsHandler(e);
                          addressChangeHandler(e);
                        }}
                        onBlur={showBlurAddress ? null : addressBlurHandler}
                        // value={addressInput}
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
                                showBlurImage={showBlurImage}
                              />
                              {!imageUrl && !selectedImage ? (
                                <Typography
                                  sx={{
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
                                <ButtonEditPlace formIsValid={formIsValid} />
                                <ButtonCancelEditPlace
                                  open={open}
                                  close={handleClose}
                                  onHandleOpen={handleOpen}
                                  onHandleClose={handleClose}
                                />
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
