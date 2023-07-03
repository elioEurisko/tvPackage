import React, { forwardRef, useEffect, useCallback, useState, useRef } from "react";
// import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import ReactPlayerLoader from "@brightcove/react-player-loader";

import FocusableItem from "../focusableItem/FocusableItem";
import moment from "moment";

import "./AppVideoPlayer.scss";
import { useHistory } from "react-router";
import videoPauseButton from "../../../public/static/icons/videoPauseButton.svg";
import videoPlayButton from "../../../public/static/icons/videoPlayButton.svg";
import videoUnmutedButton from "../../../public/static/icons/videoUnmutedButton.svg";
import videoMutedButton from "../../../public/static/icons/videoMutedButton.svg";
import videoBackwardButton from "../../../public/static/icons/videoBackwardButton.svg";
import videoForwardButton from "../../../public/static/icons/videoForwardButton.svg";
import back from "../../../public/static/icons/back.svg";
import infoButton from "../../../public/static/icons/info.svg";
import AppImage from "../appImage/AppImage";

const config = {
  file: {
    attributes: {
      controlsList: "nodownload",
      disablePictureInPicture: true,
      autoPlay: false,
    },
  },
};

const AppVideoPlayer = forwardRef(
  (
    {
      controls,
      width,
      height,
      onPlay,
      onPause,
      onProgress,
      onEnded,
      onStart,
      style,
      onReady,
      playing,
      onSeekHandler,
      onDurationHandler,
      onBuffer,
      volume,
      muted,
      light,
      onError,
      playIcon,
      isTrailer,
      track,
      isTracked,
      setTracked,
      isReady,
      onSuccess,
      isFinished,
      isLive,
      isVODdetails,
      videoId,
      isWatchPage,
      onFocus,
      onInfoClick,
      liveVideoTitle,
    },
    ref,
  ) => {
    const [wasPlaying, setWasPlaying] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isSeekingVideo, setIsSeekingVideo] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [currentVideoDuration, setCurrentVideoDuration] = useState(-1);
    // const [videoPlayerSpeed, setVideoPlayerSpeed] = useState(1);
    // const [isMenuHidden, setIsMenuHidden] = useState(true);
    const router = useHistory();
    const onBackHandler = useCallback(() => {
      router.goBack();
    }, [router]);

    useEffect(() => {
      document.querySelector(".allplayerControls")?.classList.remove("fade-animation-class");
    }, [isPlaying, isMuted]);

    if (!isLive && isPlaying && !isSeekingVideo)
      document.querySelector(".allplayerControls")?.classList.add("fade-animation-class");
    if (isPlaying) document.querySelector(".allplayerControls")?.classList.add("fade-animation-class");

    useEffect(() => {
      if (isLive && isPlaying) document.querySelector(".allplayerControls")?.classList.add("fade-animation-class");
    }, [isLive, isPlaying]);

    //This will return the previous value of any state
    function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      }, [value]);
      return ref.current;
    }
    const previousIsMuted = usePrevious(isMuted);

    useEffect(() => {
      if (isLive && isPlaying)
        if (isMuted !== previousIsMuted) {
          document.querySelector(".allplayerControls")?.classList.remove("fade-animation-class");
          setTimeout(() => {
            document.querySelector(".allplayerControls").classList.add("fade-animation-class");
          }, 1000);
        }
    }, [isLive, isMuted, isPlaying, previousIsMuted]);

    useEffect(() => {
      const onMouseMoveHandler = () => {
        document.querySelector(".allplayerControls")?.classList.remove("fade-animation-class");
      };

      document.addEventListener("mousemove", onMouseMoveHandler);

      return () => {
        document.removeEventListener("mousemove", onMouseMoveHandler);
      };
    }, []);

    useEffect(() => {
      if (isTrailer && isReady) {
        document.querySelector("video").muted = muted;
      }
    }, [isTrailer, muted, isReady]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const returnOnArrowPress = () => {
      return onArrowPressHandler();
    };

    const onArrowPressHandler = useCallback(
      async (direction, name) => {
        document.querySelector(".allplayerControls").classList.remove("fade-animation-class");
        if (isLive && isPlaying) {
          setTimeout(() => {
            document.querySelector(".allplayerControls").classList.add("fade-animation-class");
          }, 1000);
        }

        if (name === "progressBarDirections") {
          let updatedTime;
          if (direction === "left") {
            updatedTime = document.querySelector("video").currentTime - 1;
            document.querySelector("video").currentTime -= 1;
          }

          if (direction === "right") {
            updatedTime = document.querySelector("video").currentTime + 1;
            document.querySelector("video").currentTime += 1;
          }
          if (updatedTime) setCurrentVideoTime(() => updatedTime);
        }
        // if (name === 'videoSpeedDirections') {
        //   if (direction === 'left') {
        //   }
        // }
        // if (name === 'videoSpeedDirectionsLast') {
        //   if (direction === 'left' || direction === 'up') {
        //   }
        // }

        return false;
      },
      [isLive, isPlaying],
    );

    const onProgressHandler = useCallback(
      (data) => {
        if (!data?.target?.currentTime) return;
        if (Math.floor(data?.target?.currentTime) === 0 && track > 0 && !isTracked && !isFinished) {
          document.querySelector("video").currentTime = track;
          setTracked();
        }
        onProgress(data);
        setCurrentVideoTime(data?.target?.currentTime);
        if (!data.srcElement.paused) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
        if (currentVideoDuration === -1) setCurrentVideoDuration(data?.target?.duration);
      },
      [track, isTracked, isFinished, onProgress, currentVideoDuration, setTracked],
    );
    useEffect(() => {
      if (isTrailer && isReady) {
        if (!isVODdetails) {
          document.querySelector("video")?.parentElement?.classList?.add("vjs-user-borderRadius");
        }
        document.querySelector("video")?.parentElement?.classList?.add("vjs-user-disable");
        document.querySelector("video")?.parentElement?.classList?.add("vjs-user-pointer-disable");
        document.querySelector("video")?.parentElement?.classList?.add("vjs-controls-disabled");
        document.querySelector("video")?.addEventListener("ended", onEnded);

        return () => {
          document.querySelector("video")?.removeEventListener("ended", onEnded);
        };
      }
    }, [isTrailer, isReady, onEnded, isVODdetails]);

    const videoElement = document.querySelector(`video[data-video-id="${videoId}"]`);

    useEffect(() => {
      if (videoElement) {
        document.querySelector(".vjs-control-bar").style.display = "none";
        document.querySelector(".vjs-dock-text").style.opacity = 0;
      }
    }, [videoElement]);

    useEffect(() => {
      if (isTrailer && isReady && !playing) {
        document.querySelector("video").pause();
        setWasPlaying(true);
      }
    }, [isTrailer, isReady, playing]);

    useEffect(() => {
      if (isTrailer && isReady && playing && wasPlaying) {
        document.querySelector("video").play();
        setWasPlaying(false);
      }
    }, [isTrailer, isReady, playing, wasPlaying]);

    useEffect(() => {
      if (isReady && !isTrailer && ref?.current?.player && !isLive) {
        document.querySelector("video")?.addEventListener("timeupdate", onProgressHandler);
        document.querySelector("video")?.addEventListener("ended", onEnded);

        return () => {
          document.querySelector("video")?.removeEventListener("timeupdate", onProgressHandler);
          document.querySelector("video")?.removeEventListener("ended", onEnded);
        };
      } else return;
    }, [isReady, isTrailer, track, ref, onProgressHandler, isLive, onEnded]);

    const onPlayPausePress = useCallback(() => {
      setIsPlaying(!isPlaying);
      !isPlaying ? videoElement.play() : videoElement.pause();
    }, [isPlaying, videoElement]);

    const focusOnPlayPauseButton = useCallback(() => {
      return (
        <>
          <FocusableItem
            onEnterPress={onPlayPausePress}
            onArrowPress={returnOnArrowPress}
            // shouldFocusOnMount
            classOnFocus="focused-video-player-buttons"
            className="initial-transparent-border controlButtonOnFocus "
            isPlayer
          >
            <div>
              {isPlaying ? (
                <AppImage src={videoPauseButton} width={40} height={40} />
              ) : (
                <AppImage src={videoPlayButton} width={40} height={40} />
              )}
            </div>
          </FocusableItem>
        </>
      );
    }, [isPlaying, onPlayPausePress, returnOnArrowPress]);

    const onMutePress = useCallback(() => {
      videoElement.muted = !videoElement.muted;
      setIsMuted(!videoElement.muted);
    }, [videoElement]);

    const focusOnMuteButton = useCallback(() => {
      return (
        <>
          <FocusableItem
            onEnterPress={onMutePress}
            onArrowPress={returnOnArrowPress}
            // shouldFocusOnMount
            classOnFocus="focused-video-player-buttons"
            className="initial-transparent-border controlButtonOnFocus "
            onFocus={isVODdetails ? onFocus : () => {}}
            isPlayer
          >
            <div>
              {isMuted ? (
                <AppImage src={videoUnmutedButton} width={40} height={40} />
              ) : (
                <AppImage src={videoMutedButton} width={40} height={40} />
              )}
            </div>
          </FocusableItem>
        </>
      );
    }, [isMuted, isVODdetails, onFocus, onMutePress, returnOnArrowPress]);

    const videoTimeView = useCallback(() => {
      return (
        <>
          {currentVideoDuration && currentVideoTime && (
            <div className="video-time">
              {moment
                .utc(currentVideoTime > 0 ? currentVideoTime * 1000 : 0)
                .locale("en")
                .format(currentVideoTime > 3600 ? "HH:mm:ss" : "mm:ss")}{" "}
              /{" "}
              {moment
                .utc(currentVideoDuration * 1000)
                .locale("en")
                .format(currentVideoDuration > 3600 ? "HH:mm:ss" : "mm:ss")}
            </div>
          )}
        </>
      );
    }, [currentVideoDuration, currentVideoTime]);

    const onProgressArrowPressWithDirection = useCallback(
      (direction) => {
        if (currentVideoDuration > 0) return onArrowPressHandler(direction, "progressBarDirections");
      },
      [currentVideoDuration, onArrowPressHandler],
    );

    const progressBarView = useCallback(() => {
      return (
        <>
          <FocusableItem
            // shouldFocusOnMount
            onArrowPress={onProgressArrowPressWithDirection}
            classOnFocus="focused-video-player-buttons"
            classOnNotFocus="videoBarNotFocused"
            isPlayer
          >
            <progress id="videoProgressBar" value={currentVideoTime} max={currentVideoDuration} />
          </FocusableItem>
        </>
      );
    }, [currentVideoDuration, currentVideoTime, onProgressArrowPressWithDirection]);

    const onFastBackPress = useCallback(() => {
      if (currentVideoDuration > 0) {
        if (isPlaying) {
          setIsPlaying(!isPlaying);
          setIsPlaying(!isPlaying);
        }
        document.querySelector("video").currentTime -= 15;
        document.querySelector(".allplayerControls").classList.remove("fade-animation-class");
        setCurrentVideoTime(document.querySelector("video").currentTime);
      }
    }, [currentVideoDuration, isPlaying]);

    const fastBackView = useCallback(() => {
      return (
        <>
          <FocusableItem
            className="initial-transparent-border controlButtonOnFocus"
            onArrowPress={returnOnArrowPress}
            // shouldFocusOnMount
            classOnFocus="focused-video-player-buttons"
            onEnterPress={onFastBackPress}
            isPlayer
          >
            <AppImage src={videoBackwardButton} width={40} height={40} />
          </FocusableItem>
        </>
      );
    }, [onFastBackPress, returnOnArrowPress]);

    const onFastForwardPress = useCallback(() => {
      if (currentVideoDuration > 0) {
        if (isPlaying) {
          setIsPlaying(!isPlaying);
          setIsPlaying(!isPlaying);
        }
        document.querySelector("video").currentTime += 15;
        document.querySelector(".allplayerControls").classList.remove("fade-animation-class");
        setCurrentVideoTime(document.querySelector("video").currentTime);
      }
    }, [currentVideoDuration, isPlaying]);

    const fastForwardView = useCallback(() => {
      return (
        <>
          <FocusableItem
            className="initial-transparent-border controlButtonOnFocus"
            // shouldFocusOnMount
            classOnFocus="focused-video-player-buttons"
            onArrowPress={returnOnArrowPress}
            onEnterPress={onFastForwardPress}
            isPlayer
          >
            <AppImage src={videoForwardButton} width={40} height={40} />
          </FocusableItem>
        </>
      );
    }, [onFastForwardPress, returnOnArrowPress]);

    const videoTitleView = useCallback(() => {
      return (
        <div className="videoTitleView">
          <div className="title-text-container">
            <div className="maintitleText">
              {isLive ? liveVideoTitle : document.querySelector(".vjs-dock-title")?.innerHTML}
            </div>
          </div>
        </div>
      );
    }, [isLive, liveVideoTitle]);

    const infoButtonView = useCallback(() => {
      return (
        <FocusableItem
          onEnterPress={onInfoClick()}
          classOnFocus="focused-video-player-buttons"
          className="initial-transparent-border controlButtonOnFocus "
          onArrowPress={returnOnArrowPress}
          isPlayer
        >
          <AppImage src={infoButton} width={40} height={40} />
        </FocusableItem>
      );
    }, [onInfoClick, returnOnArrowPress]);

    const backButtonView = useCallback(() => {
      return (
        <FocusableItem
          onEnterPress={onBackHandler}
          shouldFocusOnMount
          classOnFocus="focused-video-player-buttons"
          className="initial-transparent-border controlButtonOnFocus "
          onArrowPress={returnOnArrowPress}
          isPlayer
        >
          <AppImage src={back} width={40} height={40} />
        </FocusableItem>
      );
    }, [onBackHandler, returnOnArrowPress]);

    //Tv Keys
    useEffect(() => {
      const onKeyDown = (event) => {
        if (event.keyCode === 10252) {
          onPlayPausePress();
        }
        if (event.keyCode === 415 && !isPlaying) {
          videoElement.play();
          setIsPlaying(true);
        }
        if (event.keyCode === 19 && isPlaying) {
          videoElement.pause();
          setIsPlaying(false);
        }
        if (event.keyCode === 417) {
          onProgressArrowPressWithDirection("right");
          if (!isSeekingVideo) setIsSeekingVideo(true);
        }
        if (event.keyCode === 412) {
          onProgressArrowPressWithDirection("left");
          if (!isSeekingVideo) setIsSeekingVideo(true);
        }
      };
      const onKeyUp = (event) => {
        if (event.keyCode === 417 || event.keyCode === 412) {
          setIsSeekingVideo(false);
        }
      };
      if (currentVideoDuration > 0) document.addEventListener("keydown", onKeyDown, false);
      document.addEventListener("keyup", onKeyUp, false);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyUp);
      };
    }, [
      currentVideoDuration,
      isPlaying,
      isSeekingVideo,
      onFastBackPress,
      onFastForwardPress,
      onPlayPausePress,
      onProgressArrowPressWithDirection,
      videoElement,
    ]);

    useEffect(() => {
      function onVideoProgressBarHander(e) {
        var x = e.pageX - this.offsetLeft,
          clickedValue = (x * this.max) / this.offsetWidth;

        setCurrentVideoTime(clickedValue);
        videoElement.currentTime = clickedValue;
      }

      document?.getElementById("videoProgressBar")?.addEventListener("click", onVideoProgressBarHander);
      return () => {
        document.removeEventListener("click", onVideoProgressBarHander);
      };
    }, [videoElement]);

    return (
      <>
        <ReactPlayerLoader
          // TO-DO get accountID and videoId from the backend
          accountId="6313884884001" //old: 6312913186001
          manualReloadFromPropChanges={isTrailer || isLive}
          videoId={videoId} //"6309272700112"
          onSuccess={onSuccess}
          ref={ref}
          style={style}
          controls={controls}
          width={width}
          height={height}
          volume={volume}
          onPlay={onPlay}
          onPause={onPause}
          onStart={onStart}
          onProgress={onProgress}
          onDuration={onDurationHandler}
          onSeek={onSeekHandler}
          onBuffer={onBuffer}
          config={config}
          onEnded={onEnded}
          onReady={onReady}
          playing={playing}
          muted={muted}
          onError={onError}
          light={light}
          playIcon={playIcon}
        />
        {Math.floor(currentVideoTime) !== Math.floor(currentVideoDuration) && (
          <div className="allplayerControls">
            <div className="i-button-style">{isWatchPage && videoElement && infoButtonView()}</div>
            <div className="back-button-style">{(isWatchPage || isLive) && videoElement && backButtonView()}</div>
            <div className="videoTitle">{(isWatchPage || isLive) && videoElement && videoTitleView()}</div>
            <div className="player-control-buttons-custom">
              <div className="player-control-buttons-custom-top">
                {isWatchPage && videoElement && progressBarView()}
              </div>
              <div className="player-control-buttons-custom-bottom">
                <div className="flexed-buttons">
                  {videoElement && (isWatchPage || isLive) && focusOnPlayPauseButton()}

                  {isWatchPage && videoElement && fastBackView()}

                  {isWatchPage && videoElement && fastForwardView()}

                  {(isWatchPage || isLive) && videoElement && focusOnMuteButton()}
                </div>
                {isWatchPage && videoElement && videoTimeView()}
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);

AppVideoPlayer.displayName = "AppVideoPlayer";

AppVideoPlayer.defaultProps = {
  controls: false,
  width: "100%",
  height: "100%",
  style: { display: "block", cursor: "pointer", width: "100%", margin: "0" },
  onReady: undefined,
  onStart: undefined,
  onPlay: undefined,
  onPause: undefined,
  onProgress: null,
  onEnded: undefined,
  playing: false,
  onSeekHandler: undefined,
  onDurationHandler: undefined,
  onBuffer: undefined,
  setTracked: undefined,
  volume: 0,
  muted: true,
  onError: undefined,
  light: false,
  playIcon: "",
  isTrailer: false,
  track: null,
  isTracked: true,
  isReady: false,
  onSuccess: () => {},
  isFinished: false,
  isLive: false,
  isVODdetails: false,
  onFocus: () => {},
  onInfoClick: () => {},
  liveVideoTitle: "",
  videoId: "",
  isWatchPage: true,
};

AppVideoPlayer.propTypes = {
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onProgress: PropTypes.func,
  onEnded: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  playing: PropTypes.bool,
  onSeekHandler: PropTypes.func,
  onDurationHandler: PropTypes.func,
  onBuffer: PropTypes.func,
  setTracked: PropTypes.func,
  volume: PropTypes.number,
  muted: PropTypes.bool,
  onError: PropTypes.func,
  light: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  playIcon: PropTypes.string,
  isTrailer: PropTypes.bool,
  track: PropTypes.number,
  isTracked: PropTypes.bool,
  isReady: PropTypes.bool,
  onSuccess: PropTypes.func,
  isFinished: PropTypes.bool,
  isLive: PropTypes.bool,
  isVODdetails: PropTypes.bool,
  onFocus: PropTypes.func,
  onInfoClick: PropTypes.func,
  liveVideoTitle: PropTypes.string,
  videoId: PropTypes.string,
  isWatchPage: PropTypes.bool,
};

export default AppVideoPlayer;
