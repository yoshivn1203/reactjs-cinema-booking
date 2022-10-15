import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './features/uiSlice';
import seatSelect from './features/seatSlice';
export const store = configureStore({
  reducer: {
    ui: uiSlice,
    seat: seatSelect,
  },
});
