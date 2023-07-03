import React, { memo } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const sizes = {
  small: 20,
  medium: 40,
  large: 60,
};

function AppLoader({ size, value, color }) {
  const finalSize = sizes[size] || 20;

  return <CircularProgress size={finalSize} value={value} color={color} />;
}

export default memo(AppLoader);

AppLoader.propTypes = {
  value: PropTypes.number,
  size: PropTypes.oneOf(["medium", "small", "large"]),
  color: PropTypes.string,
};

AppLoader.defaultProps = {
  value: 0,
  size: "medium",
  color: "secondary",
};
