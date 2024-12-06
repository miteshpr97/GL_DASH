import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App, { AppLoader } from "../App";
import Login, { LoginLoader } from "../auth/Login";
import GLAMT100100 from "../pages/AM/GLAMT100100";
import GLCMA100100 from "../pages/CM/GLCMA100100";
import GLCMA100200 from "../pages/CM/GLCMA100200";
import GLCMA100300 from "../pages/CM/GLCMA100300";


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
                element: <GLCMA100200/>
            },
            {
                path: 'GLCMA100300',
                element: <GLCMA100300/>
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






// import React, { Suspense,  } from "react";
// import { createBrowserRouter } from "react-router-dom";

// const Dashboard = React.lazy(() => import("../pages/Dashboard"));
// const App = React.lazy(() => import("../App"));
// const Login = React.lazy(() => import("../auth/Login"));

// const GLAMT100100 = React.lazy(() => import("../pages/AM/GLAMT100100"));
// const GLCMA100100 = React.lazy(() => import("../pages/CM/GLCMA100100"));
// const GLCMA100200 = React.lazy(() => import("../pages/CM/GLCMA100200"));
// const GLCMA100300 = React.lazy(() => import("../pages/CM/GLCMA100300"));

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: (
//           <Suspense fallback={null}>
//             <App />
//           </Suspense>
//         ),
//         children: [
//             {
//                 path: '',
//                 element: (
//                   <Suspense fallback={null}>
//                     <Dashboard />
//                   </Suspense>
//                 )
//             },
//             {
//                 path: 'GLAMT100100',
//                 element: (
//                   <Suspense fallback={null}>
//                     <GLAMT100100 />
//                   </Suspense>
//                 )
//             },
//             {
//                 path: 'UserCreation',
//                 element: (
//                   <Suspense fallback={null}>
//                     <GLCMA100100 />
//                   </Suspense>
//                 )
//             },
//             {
//                 path: 'UserAccess',
//                 element: (
//                   <Suspense fallback={null}>
//                     <GLCMA100200 />
//                   </Suspense>
//                 )
//             },
//             {
//                 path: 'GLCMA100300',
//                 element: (
//                   <Suspense fallback={null}>
//                     <GLCMA100300 />
//                   </Suspense>
//                 )
//             },
//         ]
//     },
//     {
//         path: '/login',
//         element: (
//           <Suspense fallback={null}>
//             <Login />
//           </Suspense>
//         )
//     }
// ]);

// export default router;
