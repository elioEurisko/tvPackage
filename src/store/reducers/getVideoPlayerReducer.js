/* eslint-disable default-param-last */
import {
  GET_VIDEO_PLAYER,
  GET_VIDEO_PLAYER_SUCCESS,
  GET_VIDEO_PLAYER_FAIL,
  CLEAR_VIDEO_PLAYER,
} from "../constants/getVideoPlayerConstants";

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const videoPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO_PLAYER: {
      return {
        ...state,
        error: null,
        loading: true,
        result: null,
      };
    }
    case GET_VIDEO_PLAYER_SUCCESS: {
      const { result } = action.payload.data.data;

      return {
        ...state,
        loading: false,
        result,
      };
    }
    case GET_VIDEO_PLAYER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case CLEAR_VIDEO_PLAYER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default videoPlayerReducer;
