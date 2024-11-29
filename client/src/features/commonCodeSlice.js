import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch module data
export const fetchmoduleData = createAsyncThunk(
    'commonCode/fetchmoduleData',
    async (selectedModule, { rejectWithValue }) => {

        console.log(selectedModule);
        
        try {
            const response = await axios.post('api/GLCMA100300/data', {
                MODULE_CD: selectedModule.M_DVN,
                CODE_NO: selectedModule.CODE_NO,
                REG_BY: "GL000001", // Ensure this value is dynamic or static as per your needs
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice to manage common code data
const commonCodeSlice = createSlice({
    name: "commonCode",
    initialState: {
        commonModuleData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchmoduleData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchmoduleData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.commonModuleData = action.payload;
            })
            .addCase(fetchmoduleData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Use payload for better error details
            });
    }
});

export default commonCodeSlice.reducer;
