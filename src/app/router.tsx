import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from '../pages/HomePage'
import { SessionPage } from '../pages/SessionPage'
import { SessionsPage } from '../pages/SessionsPage'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { NewSessionPage } from '../pages/admin/NewSessionPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'session/:id', element: <SessionPage /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/session/new', element: <NewSessionPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
