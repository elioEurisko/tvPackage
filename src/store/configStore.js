import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";

import config from "../utils/config";
import httpMiddleware from "../middlewares/http";

import videoPlayerReducer from "./reducers/getVideoPlayerReducer";
import connectionReducer from "./reducers/connectionReducer";

const rootReducer = combineReducers({
  videoPlayer: videoPlayerReducer,
  connection: connectionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

if (config.env === config.environments.dev) {
  middlewares.push(logger);
}

middlewares.push(httpMiddleware);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
const persistor = persistStore(store);

export { persistor, store };
