import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { profileReducer } from "./profile";
import { getPublicGistsApi, searchGistsByNameApi } from "../api/gists";
import { getConversationsApi } from "../api/conversations";
import { getMessagesApi, sendMessageApi } from "../api/messages";
import { conversationsReducer } from "./conversations";
import { messagesReducer } from "./messages";
import { gistsReducer } from "./gists";
import { logger, timeScheduler, botMessage } from "./middlewares";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
};

export const reducer = combineReducers({
  profile: profileReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
  gists: gistsReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      logger,
      timeScheduler,
      botMessage,
      thunk.withExtraArgument({
        getPublicGistsApi,
        searchGistsByNameApi,
        getConversationsApi,
        getMessagesApi,
        sendMessageApi,
      })
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args
  )
);

export const persistor = persistStore(store);
