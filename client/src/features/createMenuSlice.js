import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from './alertSlice';


// // Async thunk to fetch module data
// export const fetchmoduleData = createAsyncThunk(
//     'createMenu/fetchmoduleData',
//     async (selectedModule, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('api/GLCMA100300/data', {
//                 MODULE_CD: selectedModule.M_DVN,
//                 CODE_NO: selectedModule.CODE_NO,
//                 REG_BY: "GL000001", // Ensure this value is dynamic or static as per your needs
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );


export const updateCreateMenu = createAsyncThunk(
    'createMenu/updateCreateMenu',
  
    async (tableData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('/api/GLCMA100400/', tableData);
            dispatch(setAlert({ msg: 'Update Create Menu successfully!', alertType: 'success' }));
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update Create Menu data'
            );
        }
    }
);


// Slice to manage common code data
const createMenuSlice = createSlice({
    name: "createMenu",
    initialState: {
        createMenuData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCreateMenu.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCreateMenu.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.createMenuData = action.payload;
            })
            .addCase(updateCreateMenu.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});





export default createMenuSlice.reducer;
