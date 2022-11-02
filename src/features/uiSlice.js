import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalOpen: false,
  isSideBarOpen: false,
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
    openSideBar: (state) => {
      state.isSideBarOpen = true;
    },
    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  openModal,
  closeModal,
  openSideBar,
  closeSideBar,
  loading,
  finishLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
