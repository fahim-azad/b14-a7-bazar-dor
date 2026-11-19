"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductMarket } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toBengaliNumber, formatUnit } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductDetailsContentProps {
  initialProduct: Product | null;
  productId: string;
}

export default function ProductDetailsContent({
  initialProduct,
  productId,
}: ProductDetailsContentProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [product] = useState<Product | null>(initialProduct);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("অনুগ্রহ করে বিস্তারিত দেখতে আগে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-44 bg-white border border-[#e1e8e1] rounded-2xl animate-pulse p-6"></div>
          <div className="h-96 bg-white border border-[#e1e8e1] rounded-2xl animate-pulse p-6"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-220px)] bg-[#f0f5f0] flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white border border-[#e1e8e1] rounded-2xl p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-16 h-16 bg-[#eaf7ed] text-[#05893e] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h2 className="text-xl font-bold text-[#1d271f] mb-2">
            সাইন ইন প্রয়োজন
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            পণ্যের বাজারভিত্তিক বিস্তারিত দাম ও তুলনা দেখতে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/signin"
              className="w-full h-10 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold text-sm rounded-lg flex items-center justify-center transition"
            >
              সাইন ইন করুন
            </Link>
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-[#05893e] transition"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-220px)] bg-[#f0f5f0] flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white border border-[#e1e8e1] rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-[#1d271f] mb-2">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            অনুরোধকৃত পণ্যের বিস্তারিত তথ্য এই মুহূর্তে পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#05893e] text-[#f3fbf4] text-sm font-semibold rounded-lg hover:bg-[#047f39] transition"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const markets = product.markets || [];
  const allMins = markets.map((m) => m.min).filter((n) => typeof n === "number");
  const allMaxs = markets.map((m) => m.max).filter((n) => typeof n === "number");

  const minPrice = allMins.length ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : product.today;
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
      )
    : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const priceDiff =
    product.yesterday !== undefined && product.yesterday !== null
      ? Math.abs(product.today - product.yesterday)
      : 0;

  return (
    <div className="min-h-screen bg-[#f0f5f0] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-[#1d271f]">
            <Link href="/" className="hover:text-[#05893e] transition">
              হোম
            </Link>
            <span className="text-gray-400">›</span>
            {product.category && (
              <>
                <Link
                  href={`/category/${product.category}`}
                  className="hover:text-[#05893e] transition"
                >
                  {product.categoryNameBn || "ক্যাটাগরি"}
                </Link>
                <span className="text-gray-400">›</span>
              </>
            )}
            <span className="font-semibold text-[#1d271f] truncate max-w-[200px] sm:max-w-none">
              {product.nameBn}
            </span>
          </nav>

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-[#05893e] transition inline-flex items-center gap-1"
          >
            ← ফিরে যান
          </Link>
        </div>

        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-[#f0f5f0] border border-[#e1e8e1] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
                  {product.nameBn}
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-0.5">
                  {formatUnit(product.unit, true)} · {product.categoryNameBn}
                </p>
                <p className="text-xs sm:text-sm text-[#1d271f] mt-2">
                  {product.yesterday ? (
                    <>
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-semibold">
                        {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                      </span>
                      {priceDiff > 0 && ` · ${toBengaliNumber(priceDiff)} টাকা`}
                    </>
                  ) : (
                    "বাজারের সর্বশেষ যাচাইকৃত তথ্য"
                  )}
                </p>
              </div>
            </div>

            <div className="bg-[#f0f5f0] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-w-[140px] text-center self-start md:self-auto">
              <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#1d271f] my-0.5">
                {toBengaliNumber(product.today)}
              </span>
              <span className="text-xs text-gray-600 font-medium">
                টাকা {formatUnit(product.unit, false)}
              </span>
              {product.change && product.change.pct !== 0 && (
                <div
                  className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    isUp
                      ? "bg-[#eaf7ed] text-[#05893e] border-[#05893e]/20"
                      : isDown
                      ? "bg-[#fdeeed] text-[#d03739] border-[#d03739]/20"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "•"}</span>
                  <span>{toBengaliNumber(product.change.pct)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-bold text-[#1d271f] mb-3">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  সর্বনিম্ন দাম
                </span>
                <div className="my-1.5">
                  <span className="text-2xl sm:text-[28px] font-bold text-[#1a9951]">
                    {toBengaliNumber(minPrice)}
                  </span>
                  <span className="text-sm font-semibold text-[#1a9951] ml-1">
                    টাকা
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  সবচেয়ে কম দামের বাজার
                </span>
              </div>

              <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  সর্বাধিক দাম
                </span>
                <div className="my-1.5">
                  <span className="text-2xl sm:text-[28px] font-bold text-[#d03739]">
                    {toBengaliNumber(maxPrice)}
                  </span>
                  <span className="text-sm font-semibold text-[#d03739] ml-1">
                    টাকা
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  সবচেয়ে বেশি দামের বাজার
                </span>
              </div>

              <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-xs text-gray-500 font-medium">গড় দাম</span>
                <div className="my-1.5">
                  <span className="text-2xl sm:text-[28px] font-bold text-[#05893e]">
                    {toBengaliNumber(avgPrice)}
                  </span>
                  <span className="text-sm font-semibold text-[#05893e] ml-1">
                    টাকা
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatUnit(product.unit, true)}-এর হিসাবে
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1d271f] mb-4">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="border border-[#e1e8e1] rounded-2xl overflow-hidden bg-[#fafcfa]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e1e8e1] bg-[#fafcfa]">
                      <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-[#1d271f]">
                        বাজার
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-[#1d271f]">
                        বিভাগ
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-[#1d271f] text-right">
                        সর্বনিম্ন
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-[#1d271f] text-right">
                        সর্বাধিক
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-[#1d271f] text-right">
                        গড়
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.length > 0 ? (
                      markets.map((m: ProductMarket, idx: number) => {
                        const marketAvg = ((m.min + m.max) / 2).toFixed(1);
                        const formattedAvg = marketAvg.endsWith(".0")
                          ? marketAvg.slice(0, -2)
                          : marketAvg;

                        return (
                          <tr
                            key={`${m.market}-${m.division}-${idx}`}
                            className={`border-b border-[#e1e8e1]/60 transition ${
                              idx % 2 === 1 ? "bg-[#f0f5f0]" : "bg-transparent"
                            } hover:bg-[#eaf7ed]/50`}
                          >
                            <td className="py-3.5 px-4 sm:px-6 text-sm font-medium text-[#1d271f]">
                              {m.market}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-sm text-gray-600">
                              {m.division}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-sm text-gray-700 text-right">
                              {toBengaliNumber(m.min)} টাকা
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-sm text-gray-700 text-right">
                              {toBengaliNumber(m.max)} টাকা
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-sm font-bold text-[#1d271f] text-right">
                              {toBengaliNumber(formattedAvg)} টাকা
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-sm text-gray-500"
                        >
                          কোনো বাজারের তথ্য পাওয়া যায়নি।
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
