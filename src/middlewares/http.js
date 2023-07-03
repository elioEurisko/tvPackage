/* eslint-disable camelcase */
import axiosMiddleware from "redux-axios-middleware";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { clearAuthentication, setAuthentication } from "../store/actions/authenticationActions";
// import routeNames from "../utils/routeNames";
import { getAppClient } from "../utils/client";
import { refreshTokenApi } from "../utils/api";
// import history from "../utils/history";
import {
  setIsConnectionModalAllowedToOpen,
  setIsConnectionModalOpen,
  addToConnectionFailedRequests,
  clearConnectionFailedRequests,
} from "../store/actions/connectionActions";

const appClient = getAppClient();
// eslint-disable-next-line react-hooks/rules-of-hooks
// const router = useNavigate();

const refreshAuthLogic = (res) => {
  const body = {
    refresh_token: "",
  };

  if (res?.response?.status === 401 && res?.config?.url === refreshTokenApi) {
    return Promise.resolve(res);
  }

  return appClient.post(refreshTokenApi, body);
};

createAuthRefreshInterceptor(appClient, refreshAuthLogic);

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success(store, req) {
          const {
            authentication: { access_token, refresh_token, refresh_token_header },
          } = store.getState();

          req.headers["Accept-Language"] = "ar";

          if (access_token) {
            req.headers.authorization = access_token;
          }

          if (req.url === refreshTokenApi) {
            if (refresh_token && refresh_token_header) {
              req.data.refresh_token = refresh_token;
              req.headers.authorization = "";
              req.headers.authorization = refresh_token_header;
            } else {
              return Promise.resolve();
            }
          }

          return req;
        },
      },
    ],
    response: [
      {
        success(store, res) {
          const { isConnectionModalAllowedToOpen, connectionFailedRequests, isConnectionModalOpen } =
            store.getState().connection;
          if (!isConnectionModalAllowedToOpen) {
            store.dispatch(setIsConnectionModalAllowedToOpen(true));
          }
          if (connectionFailedRequests.length > 0) {
            store.dispatch(clearConnectionFailedRequests());
          }
          if (isConnectionModalOpen) {
            store.dispatch(setIsConnectionModalOpen(false));
          }
          if (res?.config?.url === refreshTokenApi) {
            const { refresh_token, access_token } = res.data.data.result;
            store.dispatch(
              setAuthentication({
                refreshToken: refresh_token,
                accessToken: access_token,
              }),
            );
          }

          return Promise.resolve(res);
        },
        error(store, res) {
          store.dispatch(addToConnectionFailedRequests(res.config));
          const { isConnectionModalAllowedToOpen } = store.getState().connection;
          if (isConnectionModalAllowedToOpen) {
            store.dispatch(setIsConnectionModalAllowedToOpen(false));
            store.dispatch(setIsConnectionModalOpen(true));
          }
          if (res?.response?.status === 409 && res?.config?.url === refreshTokenApi) {
            // history.push(routeNames.home).then(() => {
            store.dispatch(clearAuthentication());
            sessionStorage.clear();
            localStorage.clear();
            // });
            window.location.reload();
          }

          return Promise.reject(res);
        },
      },
    ],
  },
};

export default axiosMiddleware(appClient, middlewareConfig);
