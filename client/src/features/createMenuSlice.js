import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from './alertSlice';

// Async thunk to update/create menu data
export const updateCreateMenu = createAsyncThunk(
    'createMenu/updateCreateMenu',
    async (newRows, { rejectWithValue, dispatch }) => {
        console.log('Payload being sent:', newRows);  // Debugging payload

        try {
            const response = await axios.post('/api/GLCMA100400/', newRows);
            console.log('API Response:', response);

            dispatch(setAlert({ msg: 'Menu added successfully!', alertType: 'success' }));

            // Assuming the API returns only a message
            return {
                message: response.data.message,  // Store success message
            };
        } catch (error) {
            console.error('API Error:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create Menu data'
            );
        }
    }
);

// Slice to manage menu data
const createMenuSlice = createSlice({
    name: "createMenu",
    initialState: {
        createMenuData: [],  // Store the menu data (if available)
        message: '',  // Store the success message
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCreateMenu.pending, (state) => {
                state.status = "loading";  // Set loading state
            })
            .addCase(updateCreateMenu.fulfilled, (state, action) => {
                state.status = "succeeded";  // Set success state
                state.message = action.payload.message;  // Store the success message
            })
            .addCase(updateCreateMenu.rejected, (state, action) => {
                state.status = "failed";  // Set failed state
                state.error = action.payload;  // Store the error message
            });
    }
});

export default createMenuSlice.reducer;
