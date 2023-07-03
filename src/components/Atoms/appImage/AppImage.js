import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
// import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "./AppImage.module.scss";

import almashhadPlaceholder from "../../../public/static/icons/mashhadph.svg";
import storyPlaceholder from "../../../public/static/icons/storyPlaceholder.svg";
import profilePlaceHolder from "../../../public/static/icons/AuthorPlaceholder.svg";
import profilePlaceholderMedium from "../../../public/static/icons/AuthorPlaceholder2.svg";

const PLACE_HOLDER_PATH = almashhadPlaceholder;
const PROFILE_PLACE_HOLDER = profilePlaceHolder;
const PORTRAIT_PLACE_HOLDER = storyPlaceholder;
const PROFILE_PLACE_HOLDER_MEDIUM = profilePlaceholderMedium;

function AppImage({
  src,
  alt,
  width,
  height,
  rotate,
  isCenter,
  className,
  objectFit,
  classNameContainer,
  isPortrait,
  isProfile,
  isProfileMedium,
}) {
  let image;

  const isCover = objectFit === "cover";

  const [finalSrc, setFinalSrc] = useState("");

  useEffect(() => {
    if (!src && isProfile) {
      setFinalSrc(PROFILE_PLACE_HOLDER);
    } else if (!src && isProfileMedium) {
      setFinalSrc(PROFILE_PLACE_HOLDER_MEDIUM);
    } else if (!src && isPortrait) {
      setFinalSrc(PORTRAIT_PLACE_HOLDER);
    } else if (!src) {
      setFinalSrc(PLACE_HOLDER_PATH);
    } else {
      setFinalSrc(src);
    }
  }, [isPortrait, isProfile, isProfileMedium, src]);

  const afterLoad = (e) => {
    if (e && e.type === "error" && isProfile) {
      setFinalSrc(PROFILE_PLACE_HOLDER);
    } else if (!src && isProfileMedium) {
      setFinalSrc(PROFILE_PLACE_HOLDER_MEDIUM);
    } else if (e && e.type === "error" && isPortrait) {
      setFinalSrc(PORTRAIT_PLACE_HOLDER);
    } else if (e && e.type === "error") {
      setFinalSrc(PLACE_HOLDER_PATH);
    }
  };

  image = (
    <img
      alt={alt}
      width={width}
      src={src || finalSrc}
      height={height}
      onError={afterLoad}
      className={classNames(className, {
        [styles.imageCover]: isCover,
        [styles.rotate]: rotate,
      })}
    />
  );

  return (
    <Box
      width={1}
      height={1}
      display="flex"
      position="relative"
      justifyContent={isCenter ? "center" : "initial"}
      alignItems="inherit"
      className={classNames(classNameContainer, {
        [styles.appImageContainer]: true,
      })}
    >
      {image}
    </Box>
  );
}

export default memo(AppImage);

AppImage.propTypes = {
  rotate: PropTypes.bool,
  isCenter: PropTypes.bool,
  className: PropTypes.string,
  alt: PropTypes.string,
  classNameContainer: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  objectFit: PropTypes.oneOf(["fill", "contain", "cover", "none", "scale-down"]),
  isPortrait: PropTypes.bool,
  isProfile: PropTypes.bool,
  isProfileMedium: PropTypes.bool,
};

AppImage.defaultProps = {
  src: null,
  width: 300,
  height: 300,
  rotate: false,
  className: "",
  isCenter: false,
  objectFit: "contain",
  classNameContainer: "",
  isPortrait: false,
  alt: "alt",
  isProfile: false,
  isProfileMedium: false,
};
