import { useCallback, useReducer } from "react";

//* This is the reducer for the form state, which handles changes to the form data
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // *Iterate over each input in the state, checking if they are valid
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        //* Check if the input being changed is valid, and update the form validity accordingly
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      //* Update the form state with the new input value and validity, and the overall form validity
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      //* Set the entire form data and validity at once
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

//* This is the custom hook that manages the form state using the form reducer
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // *This function is used to update the state of a specific input in the form
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  //* This function is used to set the entire form data and validity at once
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  // Return the form state, the input handler, and the set form data function
  return [formState, inputHandler, setFormData];
};
