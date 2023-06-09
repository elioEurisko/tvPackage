import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.scss";
import Button from "react-bootstrap/Button";

const CustomButton = React.forwardRef(({ label, onClick, leftIconSource, rightIconSource, variant }, ref) => {
  const hasLeftIcon = leftIconSource !== "";
  const hasRightIcon = rightIconSource !== "";

  return (
    <Button ref={ref} variant={variant} className="button-font d-flex align-items-center" onClick={onClick}>
      {hasLeftIcon && <img src={leftIconSource} alt="leftIcon" className="leftIcon" />}
      {label}
      {hasRightIcon && <img src={rightIconSource} alt="rightIcon" className="rightIcon" />}
    </Button>
  );
});

CustomButton.displayName = "CustomButton";

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  leftIconSource: PropTypes.string,
  rightIconSource: PropTypes.string,
  variant: PropTypes.string,
};

CustomButton.defaultProps = {
  leftIconSource: "",
  rightIconSource: "",
  variant: "outline-primary",
};

export default CustomButton;
