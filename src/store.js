import { configureStore } from '@reduxjs/toolkit';
import UiSlice from './features/uiSlice';
import seatSelect from './features/seatSlice';
export const store = configureStore({
  reducer: {
    Ui: UiSlice,
    seat: seatSelect,
  },
});
