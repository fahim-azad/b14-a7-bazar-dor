"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUser: (name: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("bazardor_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const defaultName = name || email.split("@")[0] || "ব্যবহারকারী";
    const newUser: User = {
      name: defaultName,
      email: email,
    };
    setUser(newUser);
    localStorage.setItem("bazardor_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bazardor_user");
  };

  const updateUser = (name: string) => {
    if (!user) return;
    const updated = { ...user, name };
    setUser(updated);
    localStorage.setItem("bazardor_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
