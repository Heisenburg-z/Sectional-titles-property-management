import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './Admin';
import SignUp from './SignUp';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>
    },
    {
    path:"admin",
    element: <Admin/>
    },
    {
    path:"signup",
    element: <SignUp/>
    }

]);

ReactDOM.render(< RouterProvider router={router} />, document.getElementById('root'));
