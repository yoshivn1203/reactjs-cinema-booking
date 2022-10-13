import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  trailer: '',
};

const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isModalOpen = true;
      state.trailer = payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.trailer = '';
    },
  },
});
export const { openModal, closeModal } = UiSlice.actions;
export default UiSlice.reducer;
