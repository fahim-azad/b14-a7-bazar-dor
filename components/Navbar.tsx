"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";

export const CATEGORY_LIST = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangso", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dudh", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [banglaDate, setBanglaDate] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBanglaDate());
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে সাইন আউট হয়েছেন!");
  };

  return (
    <header className="w-full bg-[#fafcfa] border-b border-[#e1e8e1] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-[#05893e] tracking-tight group-hover:text-[#047f39] transition">
                বাজার দর
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                {banglaDate || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-sm normal-case flex items-center gap-2 border border-[#e1e8e1] bg-white rounded-full px-3 py-1.5 hover:border-[#05893e]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#05893e] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : "ইউ"}
                  </div>
                  <span className="text-sm font-semibold text-[#1d271f] max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500">▾</span>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-xl w-52 border border-[#e1e8e1] mt-2 z-50 text-sm"
                >
                  <li className="menu-title px-3 py-1 text-xs text-gray-400">
                    লগইন আছেন: {user.email}
                  </li>
                  <li>
                    <Link href="/profile" className="py-2 hover:bg-[#f0f5f0] rounded-lg font-medium text-[#1d271f]">
                      👤 আমার প্রোফাইল
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2 text-[#d03739] hover:bg-red-50 rounded-lg font-medium"
                    >
                      🚪 সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="text-sm font-semibold text-[#05893e] border border-[#05893e] px-3.5 py-1.5 rounded-lg hover:bg-[#eaf7ed] transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] px-3.5 py-1.5 rounded-lg transition shadow-sm"
                >
                  সাইন আপ
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-[#f0f5f0]"
              aria-label="ক্যাটাগরি মেনু"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav
          className={`py-2 overflow-x-auto scrollbar-none transition-all ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center gap-2 min-w-max pb-1">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition border ${
                pathname === "/"
                  ? "bg-[#eaf7ed] border-[#05893e] text-[#05893e] font-semibold"
                  : "bg-white border-[#e1e8e1] text-gray-700 hover:border-[#05893e] hover:bg-[#f0f5f0]"
              }`}
            >
              <span>🧺</span>
              <span>সব</span>
            </Link>

            {CATEGORY_LIST.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition border ${
                    isActive
                      ? "bg-[#eaf7ed] border-[#05893e] text-[#05893e] font-semibold"
                      : "bg-white border-[#e1e8e1] text-gray-700 hover:border-[#05893e] hover:bg-[#f0f5f0]"
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
