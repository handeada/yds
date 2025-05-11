import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { REDUX_KEY } from "@/constants/constants";
import authSlice from "./auth";
import mapSlice from "./map";
import { Department } from "@/services/department";
import { DocumentApplication } from "@/services/document-application";

const reducers = {
  auth: authSlice.reducer,
  map: mapSlice.reducer,
};

const services = {
  [Department.reducerPath]: Department.reducer,
  [DocumentApplication.reducerPath]: DocumentApplication.reducer,
};

const combinedReducers = combineReducers({
  ...reducers,
  ...services,
});

const middlewares = [Department.middleware, DocumentApplication.middleware];

const persistedReducer = persistReducer(
  {
    key: REDUX_KEY,
    version: 1,
    storage,
    whitelist: [authSlice.name],
  },
  combinedReducers
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
