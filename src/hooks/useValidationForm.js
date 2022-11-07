import React from 'react';

export function useValidationForm() {
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);


function handleErrors(e) {
  const {name, value} = e.target;
  setErrors({...errors, [name]: e.target.validationMessage});
  setValues({...values, [name]: value});
  setIsValid(e.target.closest('form').checkValidity());
}

  return {values, errors, isValid, handleErrors};
}