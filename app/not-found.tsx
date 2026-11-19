import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-220px)] bg-[#f0f5f0] flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-8 sm:p-12 max-w-md w-full text-center shadow-xs flex flex-col items-center">
        <span className="text-6xl sm:text-7xl font-extrabold text-[#05893e] mb-2 tracking-wider">
          ৪০৪
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1d271f] mb-2">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে বা ঠিকানাটি ভুল হতে পারে।
        </p>
        <Link
          href="/"
          className="w-full h-11 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold text-sm rounded-lg flex items-center justify-center transition shadow-xs"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
