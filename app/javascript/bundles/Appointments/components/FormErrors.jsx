import React from 'react';

const FormErrors = ({ formErrors }) =>
  <div>
    {Object.keys(formErrors).map((formErrorField) => {
      return (
        formErrors[formErrorField].map((error) => {
          return (
            <p>{formErrorField} {error}</p>
          )
        })
      )
    })}
  </div>

export default FormErrors;
