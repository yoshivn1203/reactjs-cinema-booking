import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  manageUser: '',
  isEditing: false,
};

const manageUserSlice = createSlice({
  name: 'manageUser',
  initialState,
  reducers: {
    createUser: (state) => {
      state.manageUser = null;
      toast('✔️ Bạn đã đăng xuất');
    },
  },
});
export const { createUser } = manageUserSlice.actions;
export default manageUserSlice.reducer;
