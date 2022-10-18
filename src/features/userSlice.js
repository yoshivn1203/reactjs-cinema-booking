import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  addUserToLocalStorage,
} from '../utils/localStorage';
import { signInApi } from '../services/user';
import { loading, finishLoading } from './uiSlice';

const initialState = {
  userInfo: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      thunkAPI.dispatch(loading());
      const result = await signInApi(user);
      thunkAPI.dispatch(finishLoading());
      return result.data.content;
    } catch (error) {
      thunkAPI.dispatch(finishLoading());
      return thunkAPI.rejectWithValue('no user found');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      // toast.success('Logging out...');
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {},
    [registerUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      addUserToLocalStorage(payload);
      // toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
