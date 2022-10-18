import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './features/uiSlice';
import seatSelect from './features/seatSlice';
import userSlice from './features/userSlice';
export const store = configureStore({
  reducer: {
    ui: uiSlice,
    seat: seatSelect,
    user: userSlice,
  },
});
