import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedRoute from './components/layouts/protected-route.tsx';
import Dashboard from './pages/dashboard';
import AdminUsers from './pages/admin/admin-users.tsx';
import AdminMedications from './pages/admin/admin-medications.tsx';
import DoctorPatients from './pages/doctor/patient-record';
import PatientRecord from './pages/doctor/patients.tsx';
import NotFound from './components/layouts/not-found.tsx';
import AdminDashboard from './pages/admin/admin-dashboard.tsx';
import DoctorDashboard from './pages/doctor/doctor-dashboard.tsx';
import PatientDashboard from './pages/patient/patient-dashboard.tsx';
import Unauthorized from './components/layouts/unauthorized.tsx';
import PatientDetails from './pages/patient/patient-details.tsx';
import Doctors from './pages/doctor/doctors.tsx';
import Booked from './pages/doctor/booked.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'unauthorized', element: <Unauthorized /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'patient/dashboard',
        element: (
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'patient/details',
        element: <PatientDetails />,
      },
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
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
        path: 'doctor/dashboard',
        element: (
          <ProtectedRoute>
            <DoctorDashboard />
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
      { path: 'doctors/list', element: <Doctors /> },
      { path: 'doctors/booked', element: <Booked /> },
    ],
  },
]);
