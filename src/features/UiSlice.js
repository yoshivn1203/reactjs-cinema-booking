import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalId: '',
};

const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isModalOpen = true;
      state.modalId = payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});
export const { openModal, closeModal } = UiSlice.actions;
export default UiSlice.reducer;
