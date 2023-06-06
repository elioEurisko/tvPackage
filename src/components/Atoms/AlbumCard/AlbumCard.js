import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AlbumCard.scss";
import Col from "react-bootstrap/Col";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import ImageWithPlaceHolder from "../ImageWithPlaceHolder/ImageWithPlaceHolder";

const AlbumCard = ({ images, imagesCount, title, id, onClick, featured }) => {
  const { t } = useTranslation("Media");
  const [height, setHeight] = useState(150);
  const checkSize = (width) => {
    const diff = (width * 75) / 100 - height;
    if (diff > 5 || diff < -5) {
      setHeight((width * 75) / 100);
    }
  };
  return (
    <ReactResizeDetector refreshRate={300} refreshMode="debounce" handleHeight={false} onResize={checkSize}>
      <Col xs={12} md={6} lg={3}>
        <div className="album-card" onClick={() => onClick(id)} tabIndex={0} role="button" aria-label="image">
          <div className="images" style={{ height }}>
            <ImageWithPlaceHolder height="100%" src={images[0]?.link} className="left" />
            <div className="right">
              <ImageWithPlaceHolder height="100%" src={images[1]?.link} className="first" />
              <ImageWithPlaceHolder height="100%" src={images[2]?.link} className="second" />
            </div>
          </div>
          <div className="top">
            <p className="count">{imagesCount} Photos</p>
            {featured && <p className="featured">{t("featured")}</p>}
          </div>
          <p className="title">{title}</p>
        </div>
      </Col>
    </ReactResizeDetector>
  );
};

AlbumCard.defaultProps = {
  images: [],
  imagesCount: 0,
  featured: false,
  title: "",
  id: "",
  onClick: () => {},
};

AlbumCard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ link: PropTypes.string })),
  imagesCount: PropTypes.number,
  featured: PropTypes.bool,
  title: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(AlbumCard);
