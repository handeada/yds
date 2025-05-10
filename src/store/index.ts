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
import { CityStatisticsService } from "@/services/city-statistics";
import authSlice from "./auth";

const reducers = {
  auth: authSlice.reducer,
};

const services = {
  [CityStatisticsService.reducerPath]: CityStatisticsService.reducer,
};

const combinedReducers = combineReducers({
  ...reducers,
  ...services,
});

const middlewares = [CityStatisticsService.middleware];

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
