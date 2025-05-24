import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getUser, setUser, removeUser } from '../utils/localStorage';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // With backend now sending user data on login/register,
    // we simply rely on localStorage for initial load.
    const storedUser = getUser();
    setUserState(storedUser);
    setLoading(false); // No need for async call here anymore
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // authService.login now returns the user object directly
      const loggedInUser = await authService.login(email, password);
      setUserState(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    try {
      // authService.register now returns the user object directly
      const registeredUser = await authService.register(name, email, password, role);
      setUserState(registeredUser);
      return registeredUser;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
