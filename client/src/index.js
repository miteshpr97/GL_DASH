// index.js


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './services/routing';
import UserContextProvider from './context/userContext/UserContextProvider';
import { Provider } from "react-redux";
import store from "./app/store.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    </Provider>
);

reportWebVitals();
