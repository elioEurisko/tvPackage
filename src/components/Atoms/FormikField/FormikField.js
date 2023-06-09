import React from "react";

import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { FastField, useFormikContext } from "formik";
import CustomError from "../CustomError/CustomError";

const FormikField = ({ type, label, placeholder, name, disabled, required, autoComplete, ...props }) => {
  const { errors, touched } = useFormikContext();
  const requiredField = required ? <span className="text-danger">*</span> : null;

  return (
    <Form.Group controlId={label}>
      {label && (
        <Form.Label>
          {label}
          {requiredField}
        </Form.Label>
      )}
      <FastField
        {...props}
        autoComplete={autoComplete}
        className={`form-control ${errors[name] && touched[name] ? "errorBorder" : ""}`}
        disabled={disabled}
        name={name}
        type={type}
        placeholder={placeholder || label}
      />
      <CustomError name={name} />
    </Form.Group>
  );
};

FormikField.defaultProps = {
  label: null,
  type: "text",
  disabled: false,
  placeholder: null,
  required: false,
  autoComplete: "off",
};

FormikField.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password", "date", "number"]),
};

export default FormikField;
