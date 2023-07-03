import React from "react";
import PropTypes from "prop-types";
import colors from "../../../utils/colors";
import styles from "./VideoPlayerLoader.module.scss";

function VideoPlayerLoader({ color, size }) {
  return (
    <div className={styles.bufferContainer}>
      <div className={styles.bufferWrapper}>
        <div className={styles.loadingSpinnerEclipse}>
          <div className={styles.innerLoader}>
            <div
              style={{
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: `0 2px 0 0 ${color}`,
                transformOrigin: `${size / 2}px ${size / 2 + 2}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

VideoPlayerLoader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

VideoPlayerLoader.defaultProps = {
  size: 100,
  color: colors.titleBlue,
};

export default VideoPlayerLoader;
