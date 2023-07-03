import {
  SET_IS_NO_CONNECTION_MODAL_OPEN,
  SET_CONNECTION_FAILED_REQUESTS,
  SET_IS_CONNECTION_MODAL_ALLOWED_TO_OPEN,
} from "../constants/connectionConstants";

const initialState = {
  isConnectionModalAllowedToOpen: true,
  isConnectionModalOpen: false,
  connectionFailedRequests: [],
};

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_NO_CONNECTION_MODAL_OPEN:
      return { ...state, isConnectionModalOpen: action?.payload };

    case SET_IS_CONNECTION_MODAL_ALLOWED_TO_OPEN:
      return { ...state, isConnectionModalAllowedToOpen: action?.payload };

    case SET_CONNECTION_FAILED_REQUESTS:
      return { ...state, connectionFailedRequests: action?.payload };

    default:
      return state;
  }
};

export default connectionReducer;
