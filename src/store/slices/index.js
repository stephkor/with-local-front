import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import languageReducer from "./languageSlice";
import locationReducer from "./locationSlice";
import contentReducer from "./contentSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import localStorage from "redux-persist/es/storage";

const PERSIST_CONFIG = {
  key: "root",
  storage: localStorage,
};

const reducers = combineReducers({
  user: userReducer,
  lang: languageReducer,
  location: locationReducer,
  content: contentReducer,
});

const persistedReducer = persistReducer(PERSIST_CONFIG, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
