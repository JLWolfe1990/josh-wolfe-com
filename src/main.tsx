import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import { HomePage, SkillsPage } from './pages/index';
import {ExperiencePage} from "./pages/ExperiencePage.tsx";
import {FaqPage} from "./pages/faq.tsx";

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/experience', element: <ExperiencePage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/skills', element: <SkillsPage /> },
    { path: '/faq', element: <FaqPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
