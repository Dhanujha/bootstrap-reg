import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
  error?: boolean;
  errorMessage?: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  type: HTMLInputTypeAttribute;
  helperText?: string;
  value: any;
}

function Input(props: InputProps): JSX.Element {
  const {
    error = false,
    errorMessage = "",
    label,
    onChange,
    id,
    type,
    helperText,
    value,
  } = props;
  return (
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className={`form-control ${error && "is-invalid"}`}
        onChange={onChange}
        aria-describedby={label + "help"}
      />
      {helperText && <div className="valid-feedback">{helperText}</div>}
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
}

export default Input;
