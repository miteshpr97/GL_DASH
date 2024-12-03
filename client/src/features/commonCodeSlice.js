import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from './alertSlice';


// Async thunk to fetch module data
export const fetchmoduleData = createAsyncThunk(
    'commonCode/fetchmoduleData',
    async (selectedModule, { rejectWithValue }) => {
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


export const updateModuleData = createAsyncThunk(
    'commonCode/updateModuleData',
  
    
    async (moduleData, { rejectWithValue, dispatch }) => {
        console.log(moduleData, "mitesh");
        try {
            const response = await axios.post('/api/GLCMA100300/', moduleData);
            dispatch(setAlert({ msg: 'Update common code successfully!', alertType: 'success' }));
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update module data'
            );
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
                state.error = action.payload; 
            })
            // Update module data
            .addCase(updateModuleData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateModuleData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.commonModuleData = action.payload;
            })
            .addCase(updateModuleData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});





export default commonCodeSlice.reducer;
