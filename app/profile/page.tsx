"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন");
      router.push("/signin");
    } else if (user) {
      setName(user.name || "");
    }
  }, [user, isLoading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    setIsUpdating(true);
    const success = await updateUser(name.trim());
    setIsUpdating(false);

    if (success) {
      toast.success("নাম সফলভাবে পরিবর্তন করা হয়েছে!");
    } else {
      toast.error("তথ্য পরিবর্তন করতে সমস্যা হয়েছে");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("সফলভাবে সাইন আউট হয়েছেন!");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-220px)] bg-[#f0f5f0] flex flex-col justify-center items-center px-4 py-10">
        <div className="w-full max-w-[736px] flex flex-col gap-6">
          <div className="h-28 bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl animate-pulse"></div>
          <div className="h-56 bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#f0f5f0] py-8 sm:py-12 px-4">
      <div className="w-full max-w-[736px] mx-auto flex flex-col gap-6">
        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#05893e] text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
              {initial}
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1d271f] truncate">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500 font-medium truncate">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="self-start sm:self-auto h-10 px-4 border border-[#d03739] text-[#d03739] hover:bg-[#d03739]/10 rounded-lg text-sm font-semibold transition flex items-center gap-2"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-bold text-[#1d271f] mb-4">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#1d271f]">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full h-10 bg-[#fafcfa] border border-[#e1e8e1] rounded-lg px-[13px] text-sm text-[#1d271f] placeholder:text-[#1d271f]/40 focus:outline-none focus:border-[#05893e] transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full h-10 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold text-sm rounded-lg border border-[#047f39] transition mt-2 disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে…" : "আপডেট"}
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-[#1d271f] hover:text-[#05893e] transition inline-block"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
