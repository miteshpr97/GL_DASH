import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App, { AppLoader } from "../App";
import Login, { LoginLoader } from "../auth/Login";
import RegTrans from "../pages/AM/GLAMT100100/RegTrans";
import UserCreation from "../pages/CM/GLCMA100100/UserCreation";
import UserAccess from "../pages/CM/GLCMA100200/UserAccess";
import CommonCode from "../pages/CM/GLCMA100300/CommonCode";


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
                element: <RegTrans/>
            },
            {
                path: 'UserCreation',
                element: <UserCreation/>
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