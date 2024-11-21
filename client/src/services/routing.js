import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App, { AppLoader } from "../App";
import Login, { LoginLoader } from "../auth/Login";

import UserAccess from "../pages/CM/GLCMA100200/UserAccess";
import CommonCode from "../pages/CM/GLCMA100300/CommonCode";
import GLAMT100100 from "../pages/AM/GLAMT100100";
import GLCMA100100 from "../pages/CM/GLCMA100100";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: AppLoader,
        children: [
            {
                path: '',
                element: <Dashboard />
            },

            {
                path: 'GLAMT100100',
                element: <GLAMT100100/>
            },
            {
                path: 'UserCreation',
                element: <GLCMA100100/>
            },
            {
                path: 'UserAccess',
                element: <UserAccess/>
            },
            {
                path: 'CommonCode',
                element: <CommonCode/>
            },
               

        ]
    },
    {
        path: '/login',
        element: <Login />,
        loader: LoginLoader
    }
])

export default router