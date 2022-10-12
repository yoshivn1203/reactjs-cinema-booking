import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
  },
});
export const { openModal } = UiSlice.actions;
export default UiSlice.reducer;
