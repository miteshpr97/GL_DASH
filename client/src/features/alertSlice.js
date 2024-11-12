import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 

const alertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    setAlert: (state, action) => {
      state.push({
        id: uuidv4(),
        msg: action.payload.msg,
        alertType: action.payload.alertType,
      });
    },
    removeAlert: (state, action) => {
      return state.filter(alert => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;


