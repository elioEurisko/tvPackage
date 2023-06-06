import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
// import Img from 'react-cool-img';

const ImageWithPlaceHolder = ({ src, className, height, placeholderSrc, articlePlaceholder, style, ...props }) => {
  const [error, setError] = useState(!!(src === "" || !src));
  const { inView, ref } = useInView({ triggerOnce: true });
  const loadStyle = { height, maxWidth: "100%" };
  const errorStyle = error
    ? {
        backgroundImage: `url(${placeholderSrc || articlePlaceholder})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }
    : {};

  useEffect(() => {
    setError(!!(src === "" || !src));
  }, [src]);
  return (
    <span className={`${className || ""} d-flex`} ref={ref}>
      {inView && (
        <div style={errorStyle} className="h-100 w-100 align-items-center justify-content-center d-flex ">
          {!error && (
            <img
              src={src}
              onLoad={() => setError(false)}
              {...props}
              style={{ ...loadStyle, ...style }}
              alt=""
              className="no-rotate"
              onError={() => setError(true)}
            />
          )}
        </div>
      )}
    </span>
  );
};
ImageWithPlaceHolder.defaultProps = {
  src: null,
  className: null,
  placeholderSrc: "",
  articlePlaceholder: "",
  height: "auto",
  style: {},
};
ImageWithPlaceHolder.propTypes = {
  src: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholderSrc: PropTypes.string,
  articlePlaceholder: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(ImageWithPlaceHolder);
