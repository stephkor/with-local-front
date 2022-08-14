import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import languageReducer from "./slices/languageSlice";
import locationReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lang: languageReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
