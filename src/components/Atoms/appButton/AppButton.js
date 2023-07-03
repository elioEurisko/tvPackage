import FocusableItem from "../focusableItem/FocusableItem";

import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppLoader from "../appLoader/AppLoader";

function AppButton({
  size,
  color,
  style,
  onClick,
  disabled,
  variant,
  children,
  className,
  fullWidth,
  component,
  labelPosition,
  removeTextPadding,
  loading,
  type,
  onArrowPress,
  focusKey,
  shouldScrollIntoView,
  onEnterPress,
  shouldFocusOnMount,
  focusable,
  scrollRef,
  onFocus,
  classNameContainer,
  classOnFocus,
  classOnNotFocus,
}) {
  const getLabelJustify = useMemo(() => {
    if (labelPosition === "right") {
      return "flex-end";
    }
    if (labelPosition === "left") {
      return "flex-start";
    }

    return "center";
  }, [labelPosition]);

  const useStyles = makeStyles(() => ({
    textRemovePadding: { padding: "0" },
    textRemoveXPadding: { padding: "8px 0" },
    textRemoveYPadding: { padding: "0 8px" },
    root: {
      textTransform: "initial",
      minWidth: "unset",
      "&$disabled": {
        cursor: "not-allowed",
        pointerEvents: "auto",
        opacity: 0.5,
      },
    },
    label: { justifyContent: getLabelJustify },
    disabled: {},
  }));

  const classes = useStyles();

  const getTextStyle = () => {
    if (removeTextPadding === "xy") {
      return classes.textRemovePadding;
    }

    if (removeTextPadding === "x") {
      return classes.textRemoveXPadding;
    }

    if (removeTextPadding === "y") {
      return classes.textRemoveYPadding;
    }

    return "";
  };

  const body = loading ? <AppLoader size="small" color="inherit" /> : children;

  return (
    <FocusableItem
      className={classNameContainer}
      onFocus={onFocus}
      scrollRef={scrollRef}
      focusKey={focusKey}
      onArrowPress={onArrowPress}
      focusable={focusable}
      onEnterPress={onEnterPress || onClick}
      shouldFocusOnMount={shouldFocusOnMount}
      classOnFocus={classOnFocus}
      classOnNotFocus={classOnNotFocus}
      shouldScrollIntoView={shouldScrollIntoView}
    >
      <Button
        size={size}
        style={style}
        color={color}
        variant={variant}
        disabled={disabled || loading}
        className={className}
        type={type}
        fullWidth={fullWidth}
        component={component}
        classes={{
          root: classes.root,
          label: classes.label,
          disabled: classes.disabled,
          text: getTextStyle(),
        }}
      >
        {body}
      </Button>
    </FocusableItem>
  );
}

AppButton.defaultProps = {
  style: null,
  onClick: null,
  className: "",
  size: "medium",
  color: "default",
  disabled: false,
  fullWidth: false,
  labelPosition: "center",
  component: "button",
  variant: "outlined",
  removeTextPadding: "",
  loading: false,
  type: "button",
  onArrowPress: () => {},
  focusKey: "",
  shouldScrollIntoView: false,
  onEnterPress: () => {},
  shouldFocusOnMount: false,
  focusable: true,
  // eslint-disable-next-line react/forbid-prop-types
  scrollRef: null,
  onFocus: () => {},
  classNameContainer: "",
  classOnFocus: "",
  classOnNotFocus: "",
};
AppButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.string,
  labelPosition: PropTypes.oneOf(["left", "center", "right"]),
  removeTextPadding: PropTypes.oneOf(["", "x", "y", "xy"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  loading: PropTypes.bool,
  onArrowPress: PropTypes.func,
  focusKey: PropTypes.string,
  shouldScrollIntoView: PropTypes.bool,
  onEnterPress: PropTypes.func,
  shouldFocusOnMount: PropTypes.bool,
  focusable: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  scrollRef: PropTypes.object,
  onFocus: PropTypes.func,
  classNameContainer: PropTypes.string,
  classOnFocus: PropTypes.string,
  classOnNotFocus: PropTypes.string,
};

export default memo(AppButton);
