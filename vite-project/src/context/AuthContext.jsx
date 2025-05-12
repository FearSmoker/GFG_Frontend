<<<<<<< HEAD
import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export default function useAuth() {
  return useContext(AuthContext);
}
=======
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Separate state for login status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Loading state for auth-dependent components
  const [loading, setLoading] = useState(true);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Store both user data and token
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear all auth data
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  // Update user data without affecting login status
  const updateUserData = (newUserData) => {
    setUser(prev => ({
      ...prev,
      ...newUserData
    }));
    // Update localStorage with new user data
    const updatedUserData = { ...user, ...newUserData };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  // Check for existing user session on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userData");

        if (token && storedUserData) {
          setUser(JSON.parse(storedUserData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth error:", error);
        // Clear potentially invalid data
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Value object to be provided to consumers
  const value = {
    user,
    setUser: updateUserData,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserData
  };

  // Wrap children with AuthContext.Provider
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
>>>>>>> 8312af7be8e329c2a80a93cf61dcda70e39b10af
