"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/utils";

interface CategoryContentProps {
  categorySlug: string;
  categoryName: string;
  categoryIcon: string;
  products: Product[];
}

export default function CategoryContent({
  categoryName,
  categoryIcon,
  products,
}: CategoryContentProps) {
  const [sortOption, setSortOption] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === "low-to-high") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === "high-to-low") {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortOption]);

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white border border-[#e1e8e1] rounded-2xl p-10 max-w-lg mx-auto shadow-xs">
          <span className="text-5xl block mb-4">🔍</span>
          <h1 className="text-2xl font-bold text-[#1d271f] mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন তাতে বর্তমানে কোনো পণ্য উপলব্ধ নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-xs"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white border border-[#e1e8e1] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#f0f5f0] border border-[#e1e8e1] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs font-semibold text-[#05893e] hover:text-[#047f39] inline-flex items-center gap-1 sm:self-start"
        >
          ← সব ক্যাটাগরি দেখুন
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-sm text-gray-600 font-medium">
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2 bg-white border border-[#e1e8e1] rounded-xl px-3 py-1.5 self-start sm:self-auto text-sm">
          <span className="text-gray-500 text-xs font-medium">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent text-sm text-[#1d271f] font-medium focus:outline-none cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
