import { configureStore } from "@reduxjs/toolkit";
import { domainApi } from "../features/domains/api/domainApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [domainApi.reducerPath]: domainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainApi.middleware),
});
setupListeners(store.dispatch);
