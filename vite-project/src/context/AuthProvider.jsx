import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext.jsx';
import { getCurrentUser } from '../api/User_api.js'; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const userDataFetched = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && token.split('.').length === 3) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
        if (!userDataFetched.current) {
          fetchAndUpdateUserData();
          userDataFetched.current = true;
        }
      } catch (error) {
        console.error("Invalid token in localStorage:", error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (token) => {
    if (!token || token.split('.').length !== 3) {
      console.error("Invalid token format during login:", token);
      return;
    }

    try {
      localStorage.setItem('access_token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      
      if (!userDataFetched.current) {
        await fetchAndUpdateUserData();
        userDataFetched.current = true;
      }
    } catch (error) {
      console.error("Failed to decode or store token:", error);
      localStorage.removeItem('access_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const fetchAndUpdateUserData = async () => {
    try {
      const res = await getCurrentUser();
      if (res && res.data) {
        setUser((prev) => ({
          ...prev,
          ...res.data,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch current user data:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        fetchAndUpdateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
