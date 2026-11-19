"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/utils";

interface AllProductsProps {
  products: Product[];
}

const CATEGORY_TABS = [
  { slug: "all", nameBn: "সব", icon: "🧺" },
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangso", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dudh", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function AllProducts({ products }: AllProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        if (selectedCategory === "dim-dudh") {
          return (
            p.category === "dim-dudh" ||
            p.category === "egg-milk" ||
            p.category === "onnanno" ||
            p.nameBn.includes("ডিম") ||
            p.nameBn.includes("দুধ") ||
            p.nameBn.includes("মাখন")
          );
        }
        return p.category === selectedCategory;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q)
      );
    }

    if (sortOption === "low-to-high") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === "high-to-low") {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <section id="সব-পণ্য" className="my-10 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্যের নাম লিখুন…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[#e1e8e1] rounded-xl pl-9 pr-3.5 py-2 text-sm text-[#1d271f] placeholder:text-gray-400 focus:outline-none focus:border-[#05893e] transition w-48 sm:w-56"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#e1e8e1] rounded-xl px-3 py-1.5 text-sm">
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
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-3 mb-6">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              onClick={() => setSelectedCategory(tab.slug)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition flex-shrink-0 border ${
                isActive
                  ? "bg-[#05893e] text-white border-[#05893e] shadow-xs font-semibold"
                  : "bg-white border-[#e1e8e1] text-gray-700 hover:border-[#05893e] hover:bg-[#f0f5f0]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.nameBn}</span>
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#e1e8e1] rounded-2xl p-10 text-center my-6">
          <span className="text-4xl mb-3 block">🔍</span>
          <h3 className="text-lg font-bold text-[#1d271f] mb-1">
            কোন পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য খুঁজে পাওয়া যায়নি।
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setSortOption("default");
            }}
            className="text-xs font-semibold text-[#05893e] border border-[#05893e] px-4 py-2 rounded-lg hover:bg-[#eaf7ed] transition"
          >
            সব ফিল্টার মুছুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
