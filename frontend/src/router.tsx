import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AdminUsers from './pages/AdminUsers';
import AdminMedications from './pages/AdminMedications';
import DoctorPatients from './pages/DoctorPatients';
import PatientRecord from './pages/PatientRecord';
import NotFound from './components/layouts/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/medications',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminMedications />
          </ProtectedRoute>
        ),
      },
      {
        path: 'doctor/patients',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
            <DoctorPatients />
          </ProtectedRoute>
        ),
      },
      {
        path: 'doctor/patient/:id',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
            <PatientRecord />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
