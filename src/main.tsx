import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Hospitals from './pages/Hospitals';
import OnBoarding from './pages/OnBoarding';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hospitals/>,
  },
  {
    path: "/onboarding",
    element: <OnBoarding/>,
  },
  {
    path: "/onboarding/edit",
    element: <OnBoarding/>,
  },
  {
    path: "/profile",
    element: <Profile/>
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
