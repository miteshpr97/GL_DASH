import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';

// Async thunk to fetch common data
export const fetchCommonCodeData = createAsyncThunk(
  'commonCode/fetchCommonCodeData',
  async () => {
    const response = await axios.get('api/UserCreation');
    return response.data.reverse();
  }
);

// export const createUserData = createAsyncThunk(
//   'userCreation/createUserData',
//   async (userData, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.post('api/UserCreation', userData);
//       dispatch(setAlert({ msg: 'User created successfully!', alertType: 'success' }));
//       return response.data;
//     } catch (error) {
//       dispatch(setAlert({ msg: 'An unexpected error occurred.', alertType: 'danger' }));
//       return rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   }
// );

const commonCodeSlice = createSlice({
  name: 'commonCode',
  initialState: {
    commonCodeData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonCodeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommonCodeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchCommonCodeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    //   .addCase(createUserData.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(createUserData.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.userData.push(action.payload);
    //   })
    //   .addCase(createUserData.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
  },
});

export default commonCodeSlice.reducer;
