/*********************************************************************************************************************************
notes:
  -clean utils folder and others
  -change index.js (exporting stuff)
  -delete this note

**********************************************************************************************************************************/

import React, { useRef, useCallback, useEffect, useMemo, useState } from "react";
import AppVideoPlayer from "../../components/Atoms/appVideoPlayer/AppVideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { useHistory, useParams } from "react-router";
import { getVideoPlayer } from "../../store/actions/getVideoPlayerActions";
import { Box } from "@material-ui/core";

import { videoPlayer } from "../../utils/constants";
import {
  endContinueWatching,
  updateContinueWatching,
  startContinueWatching,
} from "../../store/actions/videoTracksActions";
import VideoPlayerLoader from "../../components/Atoms/VideoPlayerLoader/VideoPlayerLoader";
import AppImage from "../../components/Atoms/appImage/AppImage";
import firebase from "../../utils/firebase";
import routeNames from "../../utils/routeNames";
import FocusableItem from "../../components/Atoms/focusableItem/FocusableItem";
import replayButton from "../../public/static/icons/replay.svg";
import playBack from "../../public/static/icons/playBack.svg";
import backButton from "../../../src/public/static/icons/back.svg";

import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import AppButton from "../../components/Atoms/appButton/AppButton";
import styles from "./watch.module.scss";
import withFocusable from "@noriginmedia/react-spatial-navigation/dist/withFocusable";
import ErrorPage from "../../components/Atoms/errorPage/ErrorPage";

function Watch({ setFocus }) {
  const router = useHistory();

  const { id } = useParams();
  const videoPlayerRef = useRef(null);
  const backRef = useRef(null);
  const dispatch = useDispatch();
  const { result, loading } = useSelector((state) => state?.videoPlayer);
  const [isTracked, setIsTracked] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [timeTrack, setTimeTrack] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [showNextEpisodeButton, setShowNextEpisodeButton] = useState(false);
  const [videoIdNotFound, setVideoIdNotFound] = useState(false);
  const onBackHandler = useCallback(() => router.goBack(), [router]);

  const onReplayHandler = useCallback(() => {
    setIsEnded(false);
    setFocus("player-back-button");
    document.querySelector("video").play();
  }, [setFocus]);
  const onSuccess = useCallback(() => {
    setIsReady(true);
  }, []);
  const setTracked = useCallback(() => {
    setIsTracked(true);
  }, []);

  const { track, finished, link, videoId, nextEpisode, duration, image } = useMemo(() => {
    return result ?? {};
  }, [result]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (showNextEpisodeButton) {
      setMounted(true);
    } else setMounted(false);
  }, [showNextEpisodeButton]);

  useEffect(() => {
    if (id && isAuthenticated) {
      dispatch(startContinueWatching(id));
      if (backRef?.current?.classList) {
        backRef.current.classList.add("activeVideoControlsBackHandler");
      }
    }
  }, [dispatch, id, isAuthenticated]);

  useEffect(() => {
    if (id) {
      dispatch(getVideoPlayer(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    firebase.analytics().logEvent("watch", {
      firebase_screen: "/watch",
      firebase_screen_class: id,
    });
  }, [id]);

  const updateVideoTime = useCallback(
    (time) => {
      if (time > 0 && isAuthenticated) {
        dispatch(updateContinueWatching(+id, time));
      }
    },
    [isAuthenticated, dispatch, id],
  );

  const onProgressHandler = useCallback(
    (data) => {
      const playedSeconds = Math.floor(data?.target?.currentTime);
      if (timeTrack !== playedSeconds) {
        if (playedSeconds > 0 && playedSeconds % videoPlayer.updateTrackInterval === 0) {
          updateVideoTime(playedSeconds);
          setTimeTrack(playedSeconds);
        }
      }
      if (Math.floor(duration) - playedSeconds <= 10) {
        if (nextEpisode !== null && nextEpisode) {
          setShowNextEpisodeButton(true);
        }
      } else {
        setShowNextEpisodeButton(false);
      }

      const fastBackward = () => {
        let newTime;
        const rewindAmt = 15;
        const videoTime = playedSeconds;
        if (videoTime >= rewindAmt) {
          newTime = videoTime - rewindAmt;
        } else {
          newTime = 0;
        }
        document.querySelector("video").currentTime = newTime;
      };

      if (document.getElementById("backButton")) {
        document.getElementById("backButton").addEventListener("click", fastBackward);
      }

      const fastForward = () => {
        let newTime;
        const forwardAmt = 15;
        const videoTime = playedSeconds;
        const videoDuration = duration;
        if (videoTime + forwardAmt <= videoDuration) {
          newTime = videoTime + forwardAmt;
        } else {
          newTime = videoDuration;
        }
        document.querySelector("video").currentTime = newTime;
      };
      if (document.getElementById("forwardButton")) {
        document.getElementById("forwardButton").addEventListener("click", fastForward);
      }
    },
    [timeTrack, duration, updateVideoTime, nextEpisode],
  );

  const onEnded = useCallback(() => {
    if (!nextEpisode) {
      setIsEnded(true);
    }
    // if (isAuthenticated)
    dispatch(endContinueWatching(+id)).then(() => {
      if (nextEpisode !== null && nextEpisode) router.replace(`${routeNames.watch(nextEpisode?.id).as}`);
      setShowNextEpisodeButton(false);
      setMounted(false);
    });
  }, [dispatch, id, nextEpisode, router]);

  const onShowNextEpisodeButton = useCallback(() => {
    if (nextEpisode !== null && nextEpisode) {
      router.replace(`${routeNames.watch(nextEpisode?.id).as}`);
      setShowNextEpisodeButton(false);
      setMounted(false);
    }
  }, [nextEpisode, router]);

  const onMouseLeave = useCallback(() => {
    if (backRef?.current?.classList) {
      backRef.current.classList.remove("activeVideoControlsBackHandler");
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    if (backRef?.current?.classList) {
      backRef.current.classList.add("activeVideoControlsBackHandler");
      backRef.current.classList.add("activeVideoControlsBackHandler");
    }
  }, []);

  const onInfoClick = useCallback(
    () => () => {
      router.push(`${routeNames.VODDetails(result?.showId || result?.id).as}${result?.showId ? "?type=show" : ""}`);
    },
    [result, router],
  );

  useEffect(() => {
    setTimeout(() => {
      if (isReady && videoPlayerRef?.current?.player?.error_?.code === "VIDEO_CLOUD_ERR_VIDEO_NOT_FOUND") {
        setVideoIdNotFound(true);
        document.getElementById("root").classList.add("rootVODNotFound");
      }
    }, [500]);
  }, [isReady]);

  useEffect(
    () => () => {
      document.getElementById("root").classList.remove("rootVODNotFound");
    },
    [],
  );

  const onNextEpisodeArrowPress = useCallback(() => {
    document.querySelector(".allplayerControls").classList.remove("fade-animation-class");
  }, []);

  if (videoIdNotFound) {
    return <ErrorPage error={{ status: 404 }} />;
  }

  return (
    <div onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Box width={1} height="100vh">
        {showNextEpisodeButton && (
          <Box position="absolute" right={80} bottom={130} zIndex={999} className={styles.nextEpisode}>
            <AppButton
              color="secondary"
              variant="contained"
              className={`videoControlsNextEpisodeHandler mounted ${mounted ? "mountedTrue" : ""}`}
              onEnterPress={onShowNextEpisodeButton}
              shouldFocusOnMount
              onArrowPress={onNextEpisodeArrowPress}
            >
              <AppImage
                src={playBack}
                width={25}
                height={25}
                alt="playBlack"
                classNameContainer="videoControlsNextEpisodeImage"
              />
              <div style={{ minWidth: "max-content" }}>الحلقة القادمة</div>
            </AppButton>
          </Box>
        )}

        {isEnded && (
          <>
            <AppImage src={image} width="100%" height="100%" className={styles.image} alt="Cover Image" />
            <Box position="absolute" left={60} top={60} ref={backRef}>
              <FocusableItem
                onEnterPress={onBackHandler}
                shouldFocusOnMount
                classOnFocus="focused-video-player-buttons"
                className="initial-transparent-border controlButtonOnFocus"
                isPlayer
              >
                <AppImage src={backButton} width={40} height={40} alt="replay" />
              </FocusableItem>
            </Box>
            <Box position="absolute" top="50%" zIndex={99} left="50%" id="backButton">
              <FocusableItem
                onEnterPress={onReplayHandler}
                shouldFocusOnMount
                classOnFocus="focused-video-player-buttons"
                className="initial-transparent-border controlButtonOnFocus"
                isPlayer
              >
                <AppImage src={replayButton} width={40} height={40} alt="replay" />
              </FocusableItem>
            </Box>
          </>
        )}

        {(!isReady || loading) && <VideoPlayerLoader />}
        {result && (
          <AppVideoPlayer
            ref={videoPlayerRef}
            track={track}
            isTracked={isTracked}
            setTracked={setTracked}
            controls
            width="100%"
            height="100%"
            onProgress={onProgressHandler}
            isReady={isReady}
            onSuccess={onSuccess}
            onEnded={onEnded}
            isFinished={finished}
            videoId={link || videoId}
            isWatchPage
            onInfoClick={onInfoClick}
          />
        )}
      </Box>
    </div>
  );
}

export default withFocusable()(Watch);

Watch.defaultProps = {
  setFocus: () => {},
};
Watch.propTypes = {
  setFocus: PropTypes.func,
};
