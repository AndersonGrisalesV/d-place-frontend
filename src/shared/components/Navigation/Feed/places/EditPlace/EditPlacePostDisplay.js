import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Divider, Stack, TextField, Typography } from "@mui/material";
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
        console.log("down here");
        console.log(responseData.place);

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
            imageUrl: {
              value: responseData.place.imageUrl,
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
        setImageUrl(responseData.place.imageUrl);
        setSelectedImage(responseData.place.imageUrl);
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

  const {
    value: defaultValue,
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

  const onSubmitPostPlaceHandler = async (e) => {
    e.preventDefault();

    let date = new Date().toJSON();
    if (login.isLoggedIn && formInputs) {
      console.log(formInputs);
      try {
        await sendRequest(
          `http://localhost:4000/api/places/editplace/${pid}`,
          "PATCH",
          JSON.stringify({
            title: formInputs.title.value,
            description: formInputs.description.value,
            address: formInputs.address,
            // image: formInputs.image,
            postDate: date,
          }),
          {
            "Content-Type": "Application/json",
          }
        );
        navigate("/api/places/profile");
      } catch (err) {}
    }
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();
  };

  let formIsValid = false;

  if (
    login.isLoggedIn &&
    titleIsValid &&
    descriptionIsValid &&
    addressIsValid
  ) {
    formIsValid = true;
  }

  // const [removeImage, setRemoveImage] = useState(false);

  // useEffect(() => {
  //   setRemoveImage(false);
  // }, [imageUrl]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <ScrollToTop pathname={pathname}>
      {error && <SnackBarResultLogin error={error} onClear={clearError} />}
      <React.Fragment>
        {!isLoading && loadedPlace && (
          // {showSuccess && (
          //   <SnackBarResultLogin
          //     onSuccess={true}
          //     message={"Place was created Successfully"}
          //   />
          // )}

          <CardWrapperEditPlacePostDisplay>
            <CardContentEditPlacePost>
              <TitleEditPlacePost />
              <Divider variant="middle" sx={{ marginTop: "2px" }} />
              <br />
              <br />
              <form onSubmit={onSubmitPostPlaceHandler}>
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
                    onBlur={titleBlurHandler}
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
                    onBlur={descriptionBlurHandler}
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
                    onBlur={addressBlurHandler}
                    // value={addressInput}
                    error={addressInputHasError}
                    helperText={
                      addressInputHasError
                        ? "Address cannot be empty or too long."
                        : ""
                    }
                  />
                  <React.Fragment>
                    <ImageUploadEditPlaceButton
                      formInputsHandler={formInputsHandler}
                      isLoading={isLoading}
                      showSuccess={showSuccess}
                      setImageUrl={setImageUrl}
                    />
                    {imageUrl && selectedImage && (
                      <ImagePreviewEditPlaceButton
                        imageUrl={imageUrl}
                        selectedImageName={selectedImage.name}
                        handleRemoveImage={handleRemoveImage}
                      />
                    )}
                  </React.Fragment>
                  {isLoading ? (
                    <LoadingSpinnerWrapper onNewPlace={true}>
                      <LoadingSpinner />
                    </LoadingSpinnerWrapper>
                  ) : (
                    <Stack direction="row" spacing={0} justifyContent="center">
                      <ButtonEditPlace formState={formState} />
                      <ButtonCancelEditPlace
                        open={open}
                        close={handleClose}
                        onHandleOpen={handleOpen}
                        onHandleClose={handleClose}
                      />
                    </Stack>
                  )}
                </Stack>
              </form>
            </CardContentEditPlacePost>
          </CardWrapperEditPlacePostDisplay>
        )}
      </React.Fragment>
    </ScrollToTop>
  );
};

export default EditPlacePostDisplay;
