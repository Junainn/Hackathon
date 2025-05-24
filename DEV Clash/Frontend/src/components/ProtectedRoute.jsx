import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner'; // Adjusted path

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // User is not logged in, redirect to login page, preserving current path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the required role
    // Redirect to their respective dashboard or a forbidden page
    return <Navigate to={user.role === 'student' ? '/' : '/vendor/dashboard'} replace />;
  }

  // User is logged in and has the correct role, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
