/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withFocusable from "@noriginmedia/react-spatial-navigation/dist/withFocusable";

function scrollToElement(element, offset = 0) {
  try {
    const bounding = element?.getBoundingClientRect();
    if (!bounding?.top) return;
    const top = window.pageYOffset + bounding.top - window.innerHeight / 3 + offset;
    window.scrollTo(0, top); // passing the second argument as an object will not work on webOS
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
function FocusableItem({
  children,
  className = "",
  style,
  onBlur,
  classOnFocus = "",
  onEnterPress,
  focused: isFocused,
  setFocus,
  shouldFocusOnMount,
  shouldScrollIntoView = false,
  scrollRef,
  focusable = true,
  onMouseEnter,
  isSeek,
  onFocus,
  isPlayer,
  classOnNotFocus,
  isPortraitVodCard,
}) {
  const ref = useRef();

  useEffect(() => {
    if (shouldScrollIntoView && isFocused && ref.current) {
      if (scrollRef?.current?.children[2]) {
        scrollRef.current.children[2].scrollTop = ref.current.offsetTop - 400;
      } else scrollToElement(ref.current, isPortraitVodCard ? 200 : 0);
    }
  }, [shouldScrollIntoView, isFocused, ref, scrollRef, isPortraitVodCard]);

  useEffect(() => {
    if (shouldFocusOnMount) {
      setFocus();
    }
  }, [shouldFocusOnMount, setFocus]);

  useEffect(() => {
    if (isFocused && isSeek) {
      document.getElementsByClassName("track")[0].classList.add("active");
      document.getElementsByClassName("thumb")[0].classList.add("active");
    }
  }, [isFocused, isSeek]);

  useEffect(() => {
    if (isFocused && onFocus) onFocus();
  }, [isFocused, onFocus]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        focusable && setFocus();
        if (onMouseEnter) {
          onMouseEnter();
        }
      }}
      role="button"
      tabIndex={0}
      onClick={onEnterPress}
      className={`${
        isFocused
          ? `${classOnFocus || "focused"} `
          : isPlayer
          ? classOnNotFocus || "playerNotFocused"
          : classOnNotFocus || "notFocused"
      } ${className}`}
      style={style}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}

FocusableItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  onEnterPress: PropTypes.func.isRequired,
  isPlayerEpisode: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  episodesScrollableContainerRef: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  playerEpisodeRef: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  isSeek: PropTypes.object,
};

FocusableItem.defaultProps = {
  isPlayerEpisode: null,
  episodesScrollableContainerRef: null,
  playerEpisodeRef: null,
  isSeek: null,
};

export default withFocusable()(FocusableItem);
