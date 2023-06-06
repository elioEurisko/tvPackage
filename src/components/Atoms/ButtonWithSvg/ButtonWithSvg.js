import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./ButtonWithSvg.scss";
import { Spinner } from "react-bootstrap";

const ButtonWithSvg = React.forwardRef(
  ({ label, onClick, ComponentSvg, variant, href, isLoading, styles, disabled, type, className }, ref) => {
    const classes = `${
      label ? "" : "no-margin"
    } svg-button d-flex align-items-center justify-content-center modifier ${className}`;
    const renderChild = () => (
      <>
        {ComponentSvg && !isLoading && (
          <span>
            <ComponentSvg />
          </span>
        )}
        {isLoading && (
          <span>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          </span>
        )}
        {label}
      </>
    );
    return href ? (
      <Link to={href} className={`${classes} btn btn-${variant} ${className}`}>
        {renderChild()}
      </Link>
    ) : (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        variant={variant}
        style={styles}
        type={type}
        className={classes}
        onClick={onClick}
      >
        {renderChild()}
      </Button>
    );
  },
);

ButtonWithSvg.defaultProps = {
  variant: "outline-primary",
  isLoading: false,
  onClick: null,
  href: null,
  ComponentSvg: null,
  label: null,
  disabled: false,
  type: "button",
  className: "",
};

ButtonWithSvg.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  ComponentSvg: PropTypes.func,
  href: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  styles: PropTypes.object,
};

ButtonWithSvg.displayName = "ButtonWithSvg";

export default React.memo(ButtonWithSvg);
