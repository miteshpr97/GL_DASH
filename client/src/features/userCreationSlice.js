import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';


export const createUserData = createAsyncThunk(
  'userCreation/createUserData',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('api/UserCreation', userData);
      dispatch(setAlert({ msg: 'User created successfully!', alertType: 'success' }));
      return response.data;
    } catch (error) {
      dispatch(setAlert({ msg: 'An unexpected error occurred.', alertType: 'danger' }));
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
// Async thunk to fetch user creation data
export const fetchUserCreationData = createAsyncThunk(
  'userCreation/fetchUserCreationData',
  async () => {
    const response = await axios.get('api/UserCreation');
    return response.data.reverse();
  }
);

const userCreationSlice = createSlice({
  name: 'userCreation',
  initialState: {
    userData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCreationData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCreationData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserCreationData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData.push(action.payload);
      })
      .addCase(createUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userCreationSlice.reducer;
