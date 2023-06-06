import React from "react";
import PropTypes from "prop-types";
import "./BorderlessCustomButton.scss";

const BorderlessCustomButton = ({ label, onClick, leftIconSource, rightIconSource }) => {
  const hasLeftIcon = leftIconSource !== "";
  const hasRightIcon = rightIconSource !== "";

  return (
    <div className="borderlessButton-container" onClick={onClick} role="button" tabIndex={0}>
      {hasLeftIcon && <img src={leftIconSource} alt="leftIcon" className="borderlessLeftIcon" />}
      {label}
      {hasRightIcon && <img src={rightIconSource} alt="rightIcon" className="borderlessRightIcon" />}
    </div>
  );
};

BorderlessCustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  leftIconSource: PropTypes.string,
  rightIconSource: PropTypes.string,
};

BorderlessCustomButton.defaultProps = {
  leftIconSource: "",
  rightIconSource: "",
};

export default BorderlessCustomButton;
