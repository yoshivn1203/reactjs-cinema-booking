import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalOpen: false,
  trailer: '',
};

const uiSlice = createSlice({
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
    loading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { openModal, closeModal, loading, finishLoading } = uiSlice.actions;
export default uiSlice.reducer;
