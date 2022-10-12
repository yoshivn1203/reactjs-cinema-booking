import { configureStore } from '@reduxjs/toolkit';
import UiSlice from './features/UiSlice';
export const store = configureStore({
  reducer: {
    Ui: UiSlice,
  },
});
