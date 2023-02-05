import { useState } from "react";

/**
 * Custom hook to manage input values and its validation.
 *
 * @param {function} validateValue - Function to validate the input value.
 * @returns {Object} - An object containing the current input value, its validity, an error flag, event handlers for change and blur, and a reset function.
 */

function useMyInput(validateValue) {
  // State to hold the current input value
  const [valueInput, setValueInput] = useState("");
  // State to check if the input has been touched (blurred)
  const [valueIsTouch, setValueIsTouch] = useState(false);

  // Check if the input has an error (not valid and touched)
  const valueIsValid = validateValue(valueInput);
  // Check if the input has an error (not valid and touched)
  const hasError = !valueIsValid && valueIsTouch;

  // Event handler for when the input value changes
  const valueChangeHandler = (e) => {
    setValueInput(e.target.value);
  };

  // Event handler for when the input loses focus (blur)
  const valueBlurHandler = (e) => {
    setValueIsTouch(true);
  };

  // Reset the input value and touch state
  const reset = () => {
    setValueInput("");
    setValueIsTouch(false);
  };

  // Return an object containing the current input value, its validity,
  // an error flag, event handlers for change and blur, and a reset function.
  return {
    value: valueInput,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
}

export default useMyInput;
