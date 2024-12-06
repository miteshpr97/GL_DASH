import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _post_WithoutToken } from "../CommonUtilAPI/GLApiClient";
import { setAlert } from "./alertSlice";

// Async thunk to handle API call
export const addTranData = createAsyncThunk(
  "commonCode/updateModuleData",
  async (regisData, { rejectWithValue, dispatch }) => {
    console.log("nnn");
    
    try {
      const response = await _post_WithoutToken("/api/GLAMT100100/", regisData);
      dispatch(setAlert({ msg: "Update common code successfully!", alertType: "success" }));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update module data"
      );
    }
  }
);

// Slice definition
const tranSlice = createSlice({
  name: "trans",
  initialState: {
    transData: [],
    status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(addTranData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Fulfilled state
      .addCase(addTranData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transData = action.payload; // Assuming the API returns the updated data
      })
      // Rejected state
      .addCase(addTranData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Error message from the rejected thunk
      });
  },
});

// Export the reducer
export default tranSlice.reducer;
