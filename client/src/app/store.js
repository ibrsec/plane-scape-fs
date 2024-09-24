import flightSlice from "./features/flightSlice";
import destinationSlice from "./features/destinationSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./features/authSlice";
import bookingSlice from "./features/bookingSlice";
import airlineSlice from "./features/airlineSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  flight: flightSlice,
  destination: destinationSlice,
  airline: airlineSlice,
  booking: bookingSlice,
});

const persistConfig = {
  key: "rootPlaneScape",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

  devTools: process.env.NODE_ENV !== "prod",
});


export const persistor = persistStore(store);