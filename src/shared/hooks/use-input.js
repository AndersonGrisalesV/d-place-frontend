import { useReducer } from "react";

// Defining the initial state for the input form element
const initialInputState = {
  value: "",
  isTouched: false,
};

// The input state reducer function
const inputStateReducer = (state, action) => {
  // Handling the INPUT action
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  // Handling the BLUR action
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  // Handling the RESET action
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  return initialInputState;
};

// The custom hook for handling focus and blur events on the input element
const useFocusBlurHook = (validateValue) => {
  // Declaring the inputState using the useReducer hook
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // Checking the validity of the input value using the passed validateValue function
  const valueIsValid = validateValue(inputState.value);
  // Checking whether there's an error or not based on the input validity and whether the input has been touched or not
  const hasError = !valueIsValid && inputState.isTouched;

  // Event handler for the change event of the input element
  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  // Event handler for the blur event of the input element
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  // Function to reset the input state
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // Returning the inputState along with the additional properties for handling the focus and blur events
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useFocusBlurHook;
