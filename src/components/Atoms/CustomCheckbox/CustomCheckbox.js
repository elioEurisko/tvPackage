import React from "react";
import PropTypes from "prop-types";
import "./CustomCheckbox.scss";

const CustomCheckbox = ({ type, label, checked, handleChange, name, disabled, ...props }) => {
  const { value } = props;
  const id = value?.toString() || name;
  return (
    <label className="custom-checkbox" htmlFor={id} role="presentation" onClick={(e) => e.stopPropagation()}>
      <span className="check-label">{label}</span>
      <input disabled={disabled} type={type} id={id} checked={checked} onChange={handleChange} name={name} {...props} />
      <span className={`checkMark ${disabled ? "checkMarkedTrue" : ""} `} />
    </label>
  );
};

CustomCheckbox.defaultProps = {
  label: "",
  type: "checkbox",
  checked: false,
  disabled: false,
};

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["checkbox", "radio", "switch"]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default React.memo(CustomCheckbox);
