import React from "react";
import PropTypes from "prop-types";

const alignItemsToTheRight = { textAlign: "right", direction: "rtl" };

const TitleWithSubTitle = ({ title, subTitle, children, className, downloader, isExternalProviderTitle }) => {
  return (
    <div className={`${!downloader ? "title-subtitle" : "title-subtitle-custom"}${className}`}>
      {title && <p className="title">{title}</p>}
      {subTitle && (
        <p className="subTitle" style={isExternalProviderTitle ? alignItemsToTheRight : {}}>
          {subTitle}
        </p>
      )}
      {children}
    </div>
  );
};

TitleWithSubTitle.defaultProps = {
  subTitle: undefined,
  children: null,
  className: "",
  title: undefined,
};
TitleWithSubTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.element,
  className: PropTypes.string,
  downloader: PropTypes.any,
  isExternalProviderTitle: PropTypes.bool,
};
export default TitleWithSubTitle;
