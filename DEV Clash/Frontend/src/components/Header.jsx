import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // FIX: Changed import path to .jsx
import Button from './Button';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <Link to={'/'} className="text-2xl font-bold">
          Smart Campus Ordering
        </Link>
        <nav>
          {user ? (
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-lg">Welcome, {user.name} ({user.role})</span>
              <Button onClick={()=> handleLogout()} variant="danger" className="w-full sm:w-auto">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
