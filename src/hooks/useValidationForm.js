import { useState } from 'react';

export function useValidationForm() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

function handleErrors(e) {
  
  const {name, value} = e.target;
  
  setErrors({...errors, [name]: e.target.validationMessage});
  setValues({...values, [name]: value});
  setIsValid(e.target.closest('form').checkValidity());
}

  return {values, errors, isValid, handleErrors, setValues, setIsValid};
}