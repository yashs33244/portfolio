"use client";

import { useState, useEffect } from "react";

interface UseAuthReturn {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("blog_auth_token");
    setIsAuthenticated(!!token);
  }, []);

  // Login function
  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/blog/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("blog_auth_token", token);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("blog_auth_token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
} 