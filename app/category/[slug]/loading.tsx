import React from "react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      <div className="bg-white border border-[#e1e8e1] rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
          <div className="flex flex-col gap-2">
            <div className="h-6 w-36 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
