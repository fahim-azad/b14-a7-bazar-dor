import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between bg-white border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 animate-pulse">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex items-end justify-between pt-3 border-t border-[#f0f5f0]">
        <div className="flex flex-col gap-1.5">
          <div className="h-2.5 w-14 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
