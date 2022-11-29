import React, { useContext, useEffect, useState } from "react";

import { Divider, Stack, TextField, Typography } from "@mui/material";
import CardContentNewPlacePost from "./components/CardContentNewPlacePost";
import CardWrapperNewPlacePostDisplay from "./components/CardWrapperNewPlacePostDisplay";
import TitleNewPlacePost from "./components/TitleNewPlacePost";
import ButtonCancelPostPlace from "./components/Buttons/ButtonCancelPostPlace";
import ImageUploadPlaceButton from "./components/Buttons/ImageUploadPlaceButton";
import ImagePreviewPlaceButton from "./components/Buttons/ImagePreviewPlaceButton";
import ButtonPostPlace from "./components/Buttons/ButtonPostPlace";

import useFocusBlurHook from "../../../../../../shared/hooks/use-my-input";

import { LoginContext } from "../../../../../context/login-context";

import styled from "@emotion/styled";
import { useHttpClient } from "../../../../../hooks/http-hook";
import LoadingSpinnerWrapper from "../../../../LoadingSpinner/LoadingSpinnerWrapper";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import ScrollToTop from "../../../../../util/ScollTop/ScrollToTop";
import { useLocation, useNavigate } from "react-router-dom";
import SnackBarResultLogin from "../../../../LoginRegister/components/SnackBarResultLogin";

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

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showSuccess, setShowSuccess] = useState(false);

  const initialFormInputs = {
    title: "",
    description: "",
    address: "",
    image: "",
    // imageUrl: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const formInputsHandler = (e) => {
    console.log("aqui" + e.target.value);
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

  const onSubmitPostPlaceHandler = async (e) => {
    e.preventDefault();

    if (login.isLoggedIn && formIsValid) {
      let date = new Date().toJSON();

      if (!formInputs.image) {
        formInputs.image =
          //Replace for a placeholder image
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
      }

      console.log(date);
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/places/newplace",
          "POST",
          JSON.stringify({
            title: formInputs.title,
            description: formInputs.description,
            image: formInputs.image,
            postDate: date,
            address: formInputs.address,
            creatorId: login.userId,
          }),
          {
            "Content-Type": "Application/json",
          }
        );

        // login.login(responseData.user.id);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/homepage");
        }, "910");
      } catch (err) {}
    }
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();
    setImageUrl(null);
    setSelectedImage(null);
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

  return (
    <ScrollToTop pathname={pathname}>
      {error && <SnackBarResultLogin error={error} onClear={clearError} />}
      {showSuccess && (
        <SnackBarResultLogin
          onSuccess={true}
          message={"Place was created Successfully"}
        />
      )}
      <CardWrapperNewPlacePostDisplay>
        <CardContentNewPlacePost>
          <TitleNewPlacePost />
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
                <ImageUploadPlaceButton
                  formInputsHandler={formInputsHandler}
                  isLoading={isLoading}
                  showSuccess={showSuccess}
                />
                {imageUrl && selectedImage && (
                  <ImagePreviewPlaceButton
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
                  <ButtonPostPlace formIsValid={formIsValid} />
                  <ButtonCancelPostPlace
                    showSuccess={showSuccess}
                    open={open}
                    close={handleClose}
                    onHandleOpen={handleOpen}
                    onHandleClose={handleClose}
                  />
                </Stack>
              )}
            </Stack>
          </form>
        </CardContentNewPlacePost>
      </CardWrapperNewPlacePostDisplay>
    </ScrollToTop>
  );
};

export default NewPlacePostDisplay;
