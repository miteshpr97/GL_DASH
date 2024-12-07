// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import userCreationReducer from '../features/userCreationSlice';
import userAccessReducer from '../features/userAccessSlice'
import commonCodeReducer from '../features/commonCodeSlice';
import TransCreationReducer from '../features/tranSlice'

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        userCreation: userCreationReducer,
        userAccess: userAccessReducer,
        commonCode: commonCodeReducer,
        TransCreation: TransCreationReducer,
       },
});

export default store;