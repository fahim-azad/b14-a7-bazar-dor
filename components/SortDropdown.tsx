"use client";

import React from "react";

export type SortOption = "default" | "low-to-high" | "high-to-low";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-[#e1e8e1] rounded-xl px-3 py-1.5 shadow-xs text-sm">
      <span className="text-gray-500 text-xs font-semibold select-none">
        সাজান:
      </span>
      <div className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-transparent pr-6 text-sm text-[#1d271f] font-semibold focus:outline-none cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
        <svg
          className="w-4 h-4 text-gray-500 absolute right-0 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
