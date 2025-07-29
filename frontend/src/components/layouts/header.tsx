import { useAuth } from '@/context/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'patient':
        return '/patient/dashboard';
      default:
        return '/';
    }
  };

  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    switch (user.role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'doctor':
        return 'Doctor Dashboard';
      case 'patient':
        return 'Patient Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link to={'/'} className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            MedCare
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            className="text-md font-medium text-black hover:text-brand-blue  transition-colors"
            to={'/'}
          >
            Home
          </Link>
          <Link
            className="text-md font-medium text-black hover:text-brand-blue  transition-colors"
            to={'/doctors'}
          >
            Doctors
          </Link>
          <Link
            className="text-md font-medium text-black hover:text-brand-blue  transition-colors"
            to={'/services'}
          >
            Services
          </Link>
          <Link
            className="text-md font-medium text-black hover:text-brand-blue  transition-colors"
            to={'/about'}
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              className="text-md font-medium text-black hover:text-brand-blue  transition-colors"
              to={getDashboardLink()}
            >
              {getDashboardLabel()}
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium">{user?.name}</span>
              <Button
                variant={'outline'}
                className="text-black"
                size={'sm'}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant={'ghost'} size={'sm'} asChild>
                <Link to={'/login'}>Login</Link>
              </Button>
              <Button size={'sm'} asChild>
                <Link to={'/register'}>Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
