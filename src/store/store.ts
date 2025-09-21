
import { configureStore } from '@reduxjs/toolkit';
import ExplanationsReducer from './explanationsSlice';

export const store = configureStore({
  reducer: {
    explanations: ExplanationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;