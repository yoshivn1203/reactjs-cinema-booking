import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  addUserToLocalStorage,
} from '../utils/localStorage';
import { signInApi, signUpApi } from '../services/user';
import { loading, finishLoading } from './uiSlice';

const initialState = {
  userInfo: getUserFromLocalStorage(),
  isRegistered: false,
};

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
  try {
    thunkAPI.dispatch(loading());
    const result = await signInApi(user);
    thunkAPI.dispatch(finishLoading());
    return result.data.content;
  } catch (error) {
    thunkAPI.dispatch(finishLoading());
    return thunkAPI.rejectWithValue(
      'Tài khoản không tồn tại, vui lòng kiểm tra lại tên và mật khẩu'
    );
  }
});
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      thunkAPI.dispatch(loading());
      const result = await signUpApi(user);
      // console.log(result.data.content);
      thunkAPI.dispatch(finishLoading());
      return result.data.content;
    } catch (error) {
      thunkAPI.dispatch(finishLoading());
      return thunkAPI.rejectWithValue('Tài Khoản đã tồn tại');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      removeUserFromLocalStorage();
      toast.success('Bạn đã đăng xuất');
    },
    toggleRegister: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {},
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isRegistered = false;
      addUserToLocalStorage(payload);
      toast.success(`Đăng nhập thành công`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [registerUser.pending]: (state) => {},
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isRegistered = true;
      toast.success(`Đăng ký tài khoản thành công, xin vui lòng đăng nhập`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});
export const { logoutUser, toggleRegister } = userSlice.actions;
export default userSlice.reducer;
