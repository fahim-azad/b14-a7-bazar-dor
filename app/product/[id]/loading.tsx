import React from "react";

export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#f0f5f0] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>

        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-2xl"></div>
            <div className="flex flex-col gap-2">
              <div className="h-7 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-56 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="w-32 h-24 bg-gray-200 rounded-2xl"></div>
        </div>

        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-6 sm:p-8 flex flex-col gap-8 animate-pulse">
          <div>
            <div className="h-6 w-36 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-24 bg-gray-200 rounded-2xl"></div>
              <div className="h-24 bg-gray-200 rounded-2xl"></div>
              <div className="h-24 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>

          <div>
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
