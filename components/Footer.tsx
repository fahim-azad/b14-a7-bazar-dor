import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fafcfa] border-t border-[#e1e8e1] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
        <p className="font-medium text-[#1d271f]/80 text-center sm:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-400 text-center sm:text-right text-xs">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
