import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import AppTooltip from "../appTooltip/AppTooltip";
import styles from "./AppText.module.scss";

function AppText({
  align,
  color,
  style,
  isBold,
  noWrap,
  display,
  children,
  className,
  paragraph,
  maxOneRow,
  maxTwoRows,
  maxThreeRows,
  typography,
  tooltipTitle,
  tooltipPlacement,
  isDangerouslyInnerHTML,
}) {
  const body = isDangerouslyInnerHTML ? null : children;

  return (
    <AppTooltip title={tooltipTitle} placement={tooltipPlacement}>
      <Typography
        style={style}
        align={align}
        color={color}
        noWrap={noWrap}
        display={display}
        variant={typography}
        paragraph={paragraph}
        dangerouslySetInnerHTML={isDangerouslyInnerHTML ? { __html: children } : null}
        className={classNames(className, {
          [styles.bold]: isBold,
          [styles.maxOneRow]: maxOneRow,
          [styles.maxTwoRows]: maxTwoRows,
          [styles.maxThreeRows]: maxThreeRows,
          [styles.appTextContainer]: true,
        })}
      >
        {body}
      </Typography>
    </AppTooltip>
  );
}

AppText.defaultProps = {
  style: null,
  isBold: false,
  className: "",
  noWrap: false,
  tooltipTitle: "",
  maxOneRow: false,
  color: "initial",
  paragraph: false,
  align: "inherit",
  maxTwoRows: false,
  display: "initial",
  typography: null,
  tooltipPlacement: "bottom",
  isDangerouslyInnerHTML: false,
  children: null,
  maxThreeRows: false,
};

AppText.propTypes = {
  isBold: PropTypes.bool,
  noWrap: PropTypes.bool,
  maxOneRow: PropTypes.bool,
  paragraph: PropTypes.bool,
  maxTwoRows: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  isDangerouslyInnerHTML: PropTypes.bool,
  display: PropTypes.oneOf(["initial", "block", "inline"]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  align: PropTypes.oneOf(["inherit", "left", "center", "right", "justify"]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.node, PropTypes.bool]),
  maxThreeRows: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  tooltipPlacement: PropTypes.oneOf([
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
  color: PropTypes.oneOf(["error", "initial", "inherit", "primary", "secondary", "textPrimary", "textSecondary"]),
  typography: PropTypes.oneOf([
    null,
    "h1",
    "h2",
    "h3",
    "h4",
    "h5", // 23.98px //1.4993rem
    "h6", // 20px //1.25rem
    "body1", // 16px
    "body2", // 14px
    "button",
    "subtitle1",
    "subtitle2",
    "caption",
    "overline",
  ]),
};

export default AppText;
