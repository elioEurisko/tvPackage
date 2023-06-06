import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

import "./ButtonWithLoading.scss";
import useMountedState from "../../Utils/Hooks/useMountedState";

const ButtonWithLoading = ({
  label,
  onClick,
  ComponentSvg,
  variant,
  styles,
  disabled,
  type,
  className,
  setIsBeingPublished,
}) => {
  const classes = `${
    label ? "" : "no-margin"
  } svg-button d-flex align-items-center justify-content-center modifier ${className}`;
  const [loading, setLoading] = useMountedState(false);
  const clickAction = () => {
    if (setIsBeingPublished !== undefined) setIsBeingPublished(true);
    setLoading(true);
    onClick().finally(() => setLoading(false));
  };
  const renderChild = () => (
    <>
      {ComponentSvg && !loading && (
        <span>
          <ComponentSvg />
        </span>
      )}
      {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
      {label}
    </>
  );
  return (
    <Button
      disabled={loading || disabled}
      variant={variant}
      style={styles}
      type={type}
      className={classes}
      onClick={clickAction}
    >
      {renderChild()}
    </Button>
  );
};

ButtonWithLoading.defaultProps = {
  variant: "outline-primary",
  onClick: null,
  ComponentSvg: null,
  label: null,
  disabled: false,
  type: "button",
  className: "",
};

ButtonWithLoading.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  ComponentSvg: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  styles: PropTypes.object,
  setIsBeingPublished: PropTypes.any,
};

export default ButtonWithLoading;
