
import { configureStore } from '@reduxjs/toolkit';
import ExplanationsReducer from './explanationsSlice';
import  ExcersiceReducer from './excersiceSlice';
export const store = configureStore({
  reducer: {
    explanations: ExplanationsReducer,
    excersice: ExcersiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;