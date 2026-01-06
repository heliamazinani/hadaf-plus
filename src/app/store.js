import { configureStore } from "@reduxjs/toolkit";
import { domainApi } from "../features/domains/domainApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [domainApi.reducerPath]: domainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainApi.middleware),
});
setupListeners(store.dispatch)
