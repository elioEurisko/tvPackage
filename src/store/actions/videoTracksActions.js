/* eslint-disable import/prefer-default-export */
import { videoTracksApi } from "../../utils/api";
import {
  UPDATE_CONTINUE_WATCHING,
  END_CONTINUE_WATCHING,
  START_CONTINUE_WATCHING,
} from "../constants/videoTracksConstants";

const startContinueWatching = (id) => ({
  type: START_CONTINUE_WATCHING,
  payload: {
    request: {
      url: `${videoTracksApi}/start/${id}`,
      method: "POST",
      authenticated: true,
    },
  },
});

const updateContinueWatching = (video, time) => ({
  type: UPDATE_CONTINUE_WATCHING,
  payload: {
    request: {
      url: videoTracksApi,
      method: "POST",
      authenticated: true,
      data: {
        video,
        time,
      },
    },
  },
});

const endContinueWatching = (video) => ({
  type: END_CONTINUE_WATCHING,
  payload: {
    request: {
      url: `${videoTracksApi}/end`,
      method: "POST",
      authenticated: true,
      data: {
        video,
      },
    },
  },
});
export { startContinueWatching, updateContinueWatching, endContinueWatching };
