import { videoPlayerApi } from "../../utils/api";
import { GET_VIDEO_PLAYER, CLEAR_VIDEO_PLAYER } from "../constants/getVideoPlayerConstants";

const getVideoPlayer = (id) => ({
  type: GET_VIDEO_PLAYER,
  payload: {
    request: {
      url: `${videoPlayerApi}/${id}`,
    },
  },
});

const clearVideoPLayer = () => ({
  type: CLEAR_VIDEO_PLAYER,
});

export { clearVideoPLayer, getVideoPlayer };
