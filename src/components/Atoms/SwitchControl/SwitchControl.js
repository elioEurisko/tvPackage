import React from "react";
import PropTypes from "prop-types";
import "./SwitchControl.scss";

const SwitchControl = ({ type, label, checked, handleChange, name, value, ...props }) => {
  const id = value || name;
  return (
    <label className="switch" htmlFor={id}>
      {label && <span className="switch-label">{label}</span>}
      <input type={type} id={id} checked={checked} onChange={handleChange} name={name} {...props} />
      <span className="slider" />
    </label>
  );
};

SwitchControl.defaultProps = {
  label: "",
  type: "checkbox",
  checked: false,
};

SwitchControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(["checkbox", "radio", "switch"]),
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

export default React.memo(SwitchControl);
