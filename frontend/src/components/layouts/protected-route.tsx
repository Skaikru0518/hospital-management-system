import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Navigate, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from '@/interface/ProtectedRouteProps';

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    <Navigate to={'/unauthorized'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
