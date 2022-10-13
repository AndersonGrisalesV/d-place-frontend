import React, { useContext, useEffect, useState, useRef } from "react";
import { Typography, Stack, TextField, Divider } from "@mui/material";

import useFocusBlurHook from "../../../../../../../shared/hooks/use-my-input";

import TitleComments from "./components/TitleComments";
import CardWrapperCommentsDisplay from "./components/CardWrapperCommentsDisplay";
import CardContentComments from "./components/CardContentComments";
import CommentShow from "./components/CommentShow";
import LeaveComment from "./LeaveComment";
import ButtonSendComment from "./components/Buttons/ButtonSendComment";
import styled from "@emotion/styled";
import { LoginContext } from "../../../../../../context/login-context";

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

const CommentsDisplay = ({ DUMMY_COMMENTS }) => {
  const login = useContext(LoginContext);
  //   const passwordInputRef = useRef();
  //   let navigate = useNavigate();

  //   const [isLoginMode, setIsLoginMode] = useState(true);
  //   // const [successMessage, setSuccessMessage] = useState(false);

  //   const initialFormInputs = {
  //     name: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     image: "",
  //   };

  //   const [formInputs, setFormInputs] = useState(initialFormInputs);

  //   const onSubmitLoginRegisterHandler = (e) => {
  //     e.preventDefault();

  //     console.log(formInputs);
  //     if (isLoginMode) {
  //       login.login();
  //     } else {
  //       login.createAccount();
  //     }
  //     resetNameInput();
  //     resetEmailInput();
  //     resetPasswordInput();
  //     resetconfirmPasswordInput();
  //     navigate("/");
  //     // setTimeout(navigate("/"), 8000);
  //   };

  //   const switchModeHandler = () => {
  //     // if (!isLoginMode) {
  //     //   // setFormData(
  //     //   //   {
  //     //   //     ...formState.inputs,
  //     //   //     name: undefined,
  //     //   //   },
  //     //   //   formState.inputs.email.isValid && formState.inputs.password.isValid
  //     //   // );
  //     // } else {
  //     //   // setFormData(
  //     //   //   {
  //     //   //     ...formState.inputs,
  //     //   //     name: {
  //     //   //       value: "",
  //     //   //       isValid: false,
  //     //   //     },
  //     //   //   },
  //     //   //   false
  //     //   // );
  //     // }
  //     setIsLoginMode((prevMode) => !prevMode);
  //   };

  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [imageUrl, setImageUrl] = useState(null);

  //   useEffect(() => {
  //     if (selectedImage) {
  //       setImageUrl(URL.createObjectURL(selectedImage));
  //     }
  //   }, [selectedImage]);

  //   const formInputsHandler = (e) => {
  //     console.log(e.target.value);
  //     if (e.target.name === "image") {
  //       setSelectedImage(e.target.files[0]);
  //       let reader = new FileReader();
  //       reader.readAsDataURL(e.target.files[0]);
  //       reader.onload = () => {
  //         // console.log(reader.result); //base64encoded string
  //         setFormInputs({
  //           ...formInputs,
  //           [e.target.name]: reader.result,
  //         });
  //       };
  //     } else {
  //       setFormInputs({
  //         ...formInputs,
  //         [e.target.name]: e.target.value,
  //       });
  //     }
  //   };

  //   const {
  //     value: nameInput,
  //     isValid: nameIsValid,
  //     hasError: nameInputHasError,
  //     valueChangeHandler: nameChangeHandler,
  //     valueBlurHandler: nameBlurHandler,
  //     reset: resetNameInput,
  //   } = useFocusBlurHook((value) => validateNameAndLastName(value));

  //   const {
  //     value: emailInput,
  //     isValid: emailIsValid,
  //     hasError: emailInputHasError,
  //     valueChangeHandler: emailChangeHandler,
  //     valueBlurHandler: emailBlurHandler,
  //     reset: resetEmailInput,
  //   } = useFocusBlurHook((value) => ValidateEmail(value));

  //   const {
  //     value: passwordInput,
  //     isValid: passwordIsValid,
  //     hasError: passwordInputHasError,
  //     valueChangeHandler: passwordChangeHandler,
  //     valueBlurHandler: passwordBlurHandler,
  //     reset: resetPasswordInput,
  //   } = useFocusBlurHook((value) => ValidatePassword(value));

  //   const {
  //     value: confirmPasswordInput,
  //     isValid: confirmPasswordIsValid,
  //     hasError: confirmPasswordInputHasError,
  //     valueChangeHandler: confirmPasswordChangeHandler,
  //     valueBlurHandler: confirmPasswordBlurHandler,
  //     reset: resetconfirmPasswordInput,
  //   } = useFocusBlurHook((value) => ValidatePasswordAndConfirmPassword(value));

  //   function validateNameAndLastName(text) {
  //     if (text.trim() !== "" && text.length > 4) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   function ValidateEmail(mail) {
  //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   function ValidatePassword(password) {
  //     if (password.trim() !== "" && password.length > 5) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   function ValidatePasswordAndConfirmPassword(password) {
  //     if (
  //       password.trim() !== "" &&
  //       password.length > 5 &&
  //       passwordInput.length > 5 &&
  //       passwordInput === password.trim()
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   let formIsValid = false;

  //   if (
  //     (isLoginMode && emailIsValid && passwordIsValid) ||
  //     (!isLoginMode &&
  //       nameIsValid &&
  //       emailIsValid &&
  //       passwordIsValid &&
  //       confirmPasswordIsValid)
  //   ) {
  //     formIsValid = true;
  //   }

  const comments = (
    <React.Fragment>
      {DUMMY_COMMENTS.map((comment) => (
        <React.Fragment key={comment.commentId}>
          <CommentShow
            DUMMY_COMMENTS={comment}
            key={comment.commentId}
            id={comment.commentId}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <CardWrapperCommentsDisplay>
      <CardContentComments>
        <TitleComments />
        <LeaveComment />
        {comments}
        <Divider sx={{ marginTop: "2px" }} />
        <Typography
          variant="subtitle1"
          fontWeight={400}
          mt={2}
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Leave a comment
        </Typography>
        {login.isLoggedIn ? (
          <form>
            <Stack
              direction="column"
              spacing={4}
              justifyContent="space-between"
            >
              <StyleTextField
                id="outlined-commentText-input"
                multiline
                placeholder="Type here..."
                autoComplete="current-name"
                size="small"
                name="name"
                // onChange={(e) => {
                //    formInputsHandler(e);
                //    nameChangeHandler(e);
                // }}
                // onBlur={nameBlurHandler}
                // value={nameInput}
                // error={nameInputHasError}
                // helperText={
                //   nameInputHasError ? "Name must be at least 5 letters" : ""
              />

              {/* <ButtonsWrapper> */}
              {/* <LoginRegisterButton

              // formIsValid={formIsValid}
              // isLoginMode={isLoginMode}
              /> */}
              {/* <CreateAccountButton
                switchModeHandler={switchModeHandler}
                isLoginMode={isLoginMode}
              /> */}
              {/* </ButtonsWrapper> */}
              <Stack direction="row" spacing={0} justifyContent="center">
                <ButtonSendComment />
              </Stack>
            </Stack>
          </form>
        ) : (
          <Typography
            variant="h6"
            fontWeight={400}
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "24px",
              fontSize: {
                sps: "8px",
                ps: "9px",
                ts: "11px",
                sls: "11px",
                sms: "13px",
                sc: "13px",
                nsc: "13px",
                ns: "13px",
                msc: "13px",
                mns: "13px",
                ms: "13px",
                lgs: "13px",
              },
            }}
          >
            You must be logged in to leave a comment
          </Typography>
        )}
      </CardContentComments>
      {/* {successMessage ? showMessage : ""} */}
    </CardWrapperCommentsDisplay>
  );
};

export default CommentsDisplay;
