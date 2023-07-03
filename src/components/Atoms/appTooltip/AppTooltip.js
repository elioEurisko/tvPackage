import React, { memo } from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

function AppTooltip({ children, placement, title }) {
  return (
    <Tooltip placement={placement} title={title}>
      {children}
    </Tooltip>
  );
}

export default memo(AppTooltip);

AppTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    "top",
    "left",
    "right",
    "bottom",
    "top-end",
    "left-end",
    "top-start",
    "right-end",
    "bottom-end",
    "bottom-start",
  ]),
};

AppTooltip.defaultProps = {
  placement: "bottom",
};
