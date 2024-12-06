// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import userCreationReducer from '../features/userCreationSlice';
import userAccessReducer from '../features/userAccessSlice'
import commonCodeReducer from '../features/commonCodeSlice';
import tranReducer from '../features/tranSlice';

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        trans: tranReducer,
        userCreation: userCreationReducer,
        userAccess: userAccessReducer,
        commonCode: commonCodeReducer,
       },
});

export default store;