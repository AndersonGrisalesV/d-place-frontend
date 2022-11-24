import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const EditPlacePostDisplay = ({ DUMMY_PLACES }) => {
  const login = useContext(LoginContext);
  const params = useParams();

  const { pid } = params;

  //   const result = DUMMY_PLACES[0].map((place) => place.placeId === PlaceId);

  // console.log(result);

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

  const onSubmitPostPlaceHandler = (e) => {
    e.preventDefault();

    if (formIsValid) {
      console.log(formInputs);
      // send comment here
    }
    resetTitleInput();
    resetDescriptionInput();
    resetAddressInput();

    // const currentYear = new Date().getFullYear();

    // const currentMonth = new Date().getMonth() + 1;

    // const currentDay = new Date().getDate();
    // const monthAndDay = [currentMonth, currentDay].join(" ");
    // const completeDAte = [monthAndDay, currentYear].join(",");

    // onAddComment();
    // Math.random().toString(),
    // completeDAte,
    // commentText,
    // placeId,
    // title,
    // creatorId,
    // creatorName,
    // creatorImageUrl

    // setTimeout(navigate("/"), 8000);
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
    <CardWrapperEditPlacePostDisplay>
      <CardContentEditPlacePost>
        <TitleEditPlacePost />
        <Divider variant="middle" sx={{ marginTop: "2px" }} />
        <br />
        <br />
        <form onSubmit={onSubmitPostPlaceHandler}>
          <Stack direction="column" spacing={4} justifyContent="space-between">
            <StyleTextField
              id="outlined-title-input"
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
              <ImageUploadEditPlaceButton
                formInputsHandler={formInputsHandler}
              />
              {imageUrl && selectedImage && (
                <ImagePreviewEditPlaceButton
                  imageUrl={imageUrl}
                  selectedImageName={selectedImage.name}
                  handleRemoveImage={handleRemoveImage}
                />
              )}
            </React.Fragment>
            <Stack direction="row" spacing={0} justifyContent="center">
              <ButtonEditPlace formIsValid={formIsValid} />
              <ButtonCancelEditPlace
                open={open}
                close={handleClose}
                onHandleOpen={handleOpen}
                onHandleClose={handleClose}
              />
            </Stack>
          </Stack>
        </form>
      </CardContentEditPlacePost>
      {/* {successMessage ? showMessage : ""} */}
    </CardWrapperEditPlacePostDisplay>
  );
};

export default EditPlacePostDisplay;
