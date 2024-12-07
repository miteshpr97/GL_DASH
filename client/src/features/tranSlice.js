import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch transaction data using POST method
export const fetchTransData = createAsyncThunk('TransCreation/fetchTransData',
  async () => {
    try {
      // Example of sending an empty body in the POST request
      const response = await axios.post('/api/GLAMT100100/details', {});

      // If there's data to be sent in the body, you can add it here, like:
      // const response = await axios.post('/api/GLAMT100100/details', { key: 'value' });

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
);

const TransCreationSlice = createSlice({
  name: 'TransCreation',
  initialState: {
    TransData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.TransData = action.payload;
      })
      .addCase(fetchTransData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default TransCreationSlice.reducer;
