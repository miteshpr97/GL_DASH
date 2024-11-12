// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import userCreationReducer from '../features/userCreationSlice';


const store = configureStore({
    reducer: {
        alerts: alertReducer,
        userCreation: userCreationReducer,
       
       },
});

export default store;