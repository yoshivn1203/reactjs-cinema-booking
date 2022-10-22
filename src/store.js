import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './features/uiSlice';
import seatSelect from './features/seatSlice';
import userSlice from './features/userSlice';
import manageUserSlice from './features/Admin/manageUserSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    seat: seatSelect,
    user: userSlice,
    manageUser: manageUserSlice,
  },
});
