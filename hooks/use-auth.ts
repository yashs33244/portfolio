"use client";

import { useState, useEffect } from "react";

interface UseAuthReturn {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  // Always return true for isAuthenticated to prevent redirects
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    // Auto-authenticate for development
    localStorage.setItem("blog_auth_token", "temporary-auth-token");
    setIsAuthenticated(true);
  }, []);

  // Login function
  const login = async (password: string): Promise<boolean> => {
    try {
      // Always succeed login
      localStorage.setItem("blog_auth_token", "temporary-auth-token");
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("blog_auth_token");
    // Don't set isAuthenticated to false to prevent redirects
  };

  return { isAuthenticated, login, logout };
} 