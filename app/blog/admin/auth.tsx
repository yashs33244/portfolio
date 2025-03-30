"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookie, deleteCookie } from "cookies-next";

// Auth credentials
const ADMIN_EMAIL = "yashs3324@gmail.com";
const ADMIN_PASSWORD = "Ironman@123#";

// Auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("blog_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("blog_admin_auth", "true");
      // Set a cookie for API authentication
      setCookie("blog_admin_auth", "true", {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("blog_admin_auth");
    // Remove the auth cookie
    deleteCookie("blog_admin_auth", { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth hook for component use
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Auth guard component
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, we don't render the children
    return null;
  }

  return <>{children}</>;
}
