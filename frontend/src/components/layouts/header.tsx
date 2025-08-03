import { useAuth } from '@/context/auth-context';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import MenuDropDown from '../dropdowns/header-dropdown';
import type { MenuItem } from '@/types/MenuItemType';

export function Header() {
  const { user, isAuthenticated } = useAuth();

  const getMenuItems = (): MenuItem[] => {
    if (!user) return [{ label: 'Home', link: '/' }];
    switch (user.role) {
      case 'admin':
        return [{ label: 'Admin Dashboard', link: '/admin/dashboard' }];
      case 'doctor':
        return [{ label: 'Doctors Dashboard', link: '/doctor/dashboard' }];
      case 'patient':
        return [
          { label: 'Patient Dashboard', link: '/patient/dashboard' },
          { label: 'Your Details', link: '/patient/details' },
        ];
      case 'receptionist':
        return [];
      default:
        return [];
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
            to={'/doctors/list'}
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
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium">Welcome, {user?.name}</span>

              <MenuDropDown menuItem={getMenuItems()} />
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
