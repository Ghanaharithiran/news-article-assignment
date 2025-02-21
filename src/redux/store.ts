import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice"; //  Ensure correct reducer import

const store = configureStore({
  reducer: {
    articles: articleReducer, // Key must match state.articles in useSelector
  },
});

export default store; // Default export for Redux Provider
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
