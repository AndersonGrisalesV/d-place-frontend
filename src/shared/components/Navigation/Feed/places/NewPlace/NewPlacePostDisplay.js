import React, { useContext, useEffect, useState } from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import CardContentNewPlacePost from "./components/CardContentNewPlacePost";
import CardWrapperNewPlacePostDisplay from "./components/CardWrapperNewPlacePostDisplay";
import TitleNewPlacePost from "./components/TitleNewPlacePost";
import useFocusBlurHook from "../../../../../../shared/hooks/use-my-input";
import styled from "@emotion/styled";
import { LoginContext } from "../../../../../context/login-context";
import ButtonCancelPostPlace from "./components/Buttons/ButtonCancelPostPlace";
import ImageUploadPlaceButton from "./components/Buttons/ImageUploadPlaceButton";
import ImagePreviewPlaceButton from "./components/Buttons/ImagePreviewPlaceButton";

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

  const initialFormInputs = {
    title: "",
    description: "",
    address: "",
    imageUrl: "",
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
    <CardWrapperNewPlacePostDisplay>
      <CardContentNewPlacePost>
        <TitleNewPlacePost />
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
              inputProps={{
                sx: {
                  fontSize: {
                    sps: "9px",
                    ps: "10pxr",
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
                  fontWeight: "500",
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
              inputProps={{
                sx: {
                  fontSize: {
                    sps: "9px",
                    ps: "10pxr",
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
                  fontWeight: "500",
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
              inputProps={{
                sx: {
                  fontSize: {
                    sps: "9px",
                    ps: "10pxr",
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
                  fontWeight: "500",
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
              <ImageUploadPlaceButton formInputsHandler={formInputsHandler} />
              {imageUrl && selectedImage && (
                <ImagePreviewPlaceButton
                  imageUrl={imageUrl}
                  selectedImageName={selectedImage.name}
                  handleRemoveImage={handleRemoveImage}
                />
              )}
            </React.Fragment>
            <Stack direction="row" spacing={0} justifyContent="center">
              {/* <ButtonPostPlace formIsValid={formIsValid} /> */}
              <ButtonCancelPostPlace
                open={open}
                close={handleClose}
                onHandleOpen={handleOpen}
                onHandleClose={handleClose}
              />
            </Stack>
          </Stack>
        </form>
      </CardContentNewPlacePost>
      {/* {successMessage ? showMessage : ""} */}
    </CardWrapperNewPlacePostDisplay>
  );
};

export default NewPlacePostDisplay;
