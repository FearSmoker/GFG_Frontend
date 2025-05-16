import { useState, useEffect, useRef, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext.jsx';
import { getCurrentUser, refreshAccessToken } from '../api/User_api.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const userDataFetched = useRef(false);
  const refreshTimerRef = useRef(null);
  
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    
    setUser(null);
    setIsAuthenticated(false);
    userDataFetched.current = false;
  }, []);

  const setupTokenRefreshRef = useRef(null);
  
  const handleTokenRefresh = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        console.error("No refresh token available");
        logout();
        return;
      }
      
      const { accessToken } = await refreshAccessToken();
      
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        const decoded = jwtDecode(accessToken);
        setUser(prev => ({ ...prev, ...decoded }));
        if (setupTokenRefreshRef.current) {
          setupTokenRefreshRef.current(accessToken);
        }
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  }, [logout]);

  const setupTokenRefresh = useCallback((token) => {
    if (!token || token.split('.').length !== 3) return;
    
    try {
      const decoded = jwtDecode(token);
      
      if (decoded && decoded.exp) {
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiry = expirationTime - currentTime;
        
        if (timeUntilExpiry <= 0) {
          handleTokenRefresh();
          return;
        }
        
        const refreshTime = Math.max(0, timeUntilExpiry - (60 * 1000));
        console.log(`Token expires in ${Math.floor(timeUntilExpiry / 60000)} minutes. Will refresh in ${Math.floor(refreshTime / 60000)} minutes.`);
        
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
        }
        
        refreshTimerRef.current = setTimeout(() => {
          handleTokenRefresh();
        }, refreshTime);
      }
    } catch (error) {
      console.error("Error setting up token refresh:", error);
    }
  }, [handleTokenRefresh]);

  useEffect(() => {
    setupTokenRefreshRef.current = setupTokenRefresh;
  }, [setupTokenRefresh]);

  const fetchAndUpdateUserData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token && token.split('.').length === 3) {
      try {
        const decoded = jwtDecode(token);
    
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          handleTokenRefresh();
        } else {
          setUser(decoded);
          setIsAuthenticated(true);
          setupTokenRefresh(token);
          
          if (!userDataFetched.current) {
            fetchAndUpdateUserData();
            userDataFetched.current = true;
          }
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
    
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [handleTokenRefresh, setupTokenRefresh, fetchAndUpdateUserData]);

  const login = useCallback(async (token, refreshToken) => {
    if (!token || token.split('.').length !== 3) {
      console.error("Invalid token format during login:", token);
      return;
    }

    try {
      localStorage.setItem('access_token', token);
      
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      
      setupTokenRefresh(token);
      
      if (!userDataFetched.current) {
        await fetchAndUpdateUserData();
        userDataFetched.current = true;
      }
    } catch (error) {
      console.error("Failed to decode or store token:", error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [setupTokenRefresh, fetchAndUpdateUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        fetchAndUpdateUserData,
        refreshToken: handleTokenRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;