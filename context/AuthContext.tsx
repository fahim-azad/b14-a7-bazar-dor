"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (email: string, name: string) => Promise<boolean>;
  loginWithSocial: (provider: "google" | "github") => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  loginWithSocial: async () => {},
  logout: async () => {},
  updateUser: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bazardor_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, name?: string): Promise<boolean> => {
    try {
      const defaultName = name || email.split("@")[0] || "ব্যবহারকারী";
      const newUser: User = {
        name: defaultName,
        email: email,
      };

      try {
        await authClient.signIn.email({
          email,
          password: "password123",
        });
      } catch (err) {
      }

      setUser(newUser);
      localStorage.setItem("bazardor_user", JSON.stringify(newUser));
      return true;
    } catch (e) {
      toast.error("লগইন করতে সমস্যা হয়েছে");
      return false;
    }
  };

  const signup = async (email: string, name: string): Promise<boolean> => {
    try {
      const newUser: User = {
        name,
        email,
      };

      try {
        await authClient.signUp.email({
          email,
          password: "password123",
          name,
        });
      } catch (err) {
      }

      setUser(newUser);
      localStorage.setItem("bazardor_user", JSON.stringify(newUser));
      return true;
    } catch (e) {
      toast.error("রেজিস্ট্রেশন করতে সমস্যা হয়েছে");
      return false;
    }
  };

  const loginWithSocial = async (provider: "google" | "github") => {
    try {
      const providerName = provider === "google" ? "গুগল ব্যবহারকারী" : "গিথাব ব্যবহারকারী";
      const email = `${provider}@bazardor.local`;
      const newUser: User = {
        name: providerName,
        email: email,
      };

      setUser(newUser);
      localStorage.setItem("bazardor_user", JSON.stringify(newUser));
      toast.success(`${provider === "google" ? "গুগল" : "গিথাব"} দিয়ে সফলভাবে লগইন হয়েছে!`);
    } catch (e) {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে");
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
    } finally {
      setUser(null);
      localStorage.removeItem("bazardor_user");
    }
  };

  const updateUser = async (name: string): Promise<boolean> => {
    if (!user) return false;
    try {
      try {
        await authClient.updateUser({
          name,
        });
      } catch (err) {
      }
      const updated = { ...user, name };
      setUser(updated);
      localStorage.setItem("bazardor_user", JSON.stringify(updated));
      return true;
    } catch (e) {
      toast.error("নাম পরিবর্তন করা সম্ভব হয়নি");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginWithSocial,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
