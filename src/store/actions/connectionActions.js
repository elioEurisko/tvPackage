import {
  SET_IS_NO_CONNECTION_MODAL_OPEN,
  SET_CONNECTION_FAILED_REQUESTS,
  SET_IS_CONNECTION_MODAL_ALLOWED_TO_OPEN,
} from "../constants/connectionConstants";

const setIsConnectionModalOpen = (open) => ({
  type: SET_IS_NO_CONNECTION_MODAL_OPEN,
  payload: !!open,
});

const setIsConnectionModalAllowedToOpen = (isAllowed) => ({
  type: SET_IS_CONNECTION_MODAL_ALLOWED_TO_OPEN,
  payload: !!isAllowed,
});

const addToConnectionFailedRequests = (request) => {
  return (dispatch, getState) => {
    const previousFailedConnections = getState()?.connection?.connectionFailedRequests;
    dispatch({
      type: SET_CONNECTION_FAILED_REQUESTS,
      payload: [...previousFailedConnections, request],
    });
  };
};

const clearConnectionFailedRequests = () => ({
  type: SET_CONNECTION_FAILED_REQUESTS,
  payload: [],
});

export {
  clearConnectionFailedRequests,
  addToConnectionFailedRequests,
  setIsConnectionModalAllowedToOpen,
  setIsConnectionModalOpen,
};
