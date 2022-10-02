import { useState } from "react";

function useMyInput(validateValue) {
  const [valueInput, setValueInput] = useState("");
  const [valueIsTouch, setValueIsTouch] = useState(false);

  const valueIsValid = validateValue(valueInput);
  const hasError = !valueIsValid && valueIsTouch;

  const valueChangeHandler = (e) => {
    setValueInput(e.target.value);
  };

  const valueBlurHandler = (e) => {
    setValueIsTouch(true);
  };

  const reset = () => {
    setValueInput("");
    setValueIsTouch(false);
  };

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
