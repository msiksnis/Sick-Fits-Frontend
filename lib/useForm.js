import { number } from "prop-types";
import { useState } from "react";

export default function useForm(initial = {}) {
  // Create a state object for inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      // Copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  //  Return the things that need to be surfaced from the custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
