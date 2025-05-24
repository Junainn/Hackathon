import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getToken, getUser, setUser, removeToken, removeUser } from '../utils/localStorage';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUserState(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
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
      const registeredUser = await authService.register(name, email, password, role);
      setUserState(registeredUser);
      return registeredUser;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
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
