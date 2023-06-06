import React from "react";
import PropTypes from "prop-types";
import ImagWithPlaceholder from "../ImageWithPlaceHolder/ImageWithPlaceHolder";

import "./ArticleTitleTable.scss";

const ArticleTitleTable = ({ image, title, subTitle, placeholderSrc, isExternalProvider }) => {
  return (
    <span className="article-title">
      {!isExternalProvider && (
        <ImagWithPlaceholder src={image} placeholderSrc={placeholderSrc} className="img" alt={title} />
      )}
      <span className="info">
        {title && (
          <span className="title">
            {title?.length > 50 && !isExternalProvider ? `${title.substr(0, 50)}...` : title}
          </span>
        )}
        {subTitle && <span className="subTitle">{subTitle}</span>}
      </span>
    </span>
  );
};

ArticleTitleTable.defaultProps = {
  image: null,
  title: null,
  subTitle: null,
  placeholderSrc: undefined,
  isExternalProvider: false,
};
ArticleTitleTable.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholderSrc: PropTypes.string,
  isExternalProvider: PropTypes.bool,
};

export default React.memo(ArticleTitleTable);
