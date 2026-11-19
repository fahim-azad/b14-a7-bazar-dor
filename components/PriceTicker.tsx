"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product, getProducts } from "@/lib/api";
import { toBengaliNumber, formatUnit } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickerData() {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadTickerData();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#f0f5f0] border-b border-[#e1e8e1] py-2 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-bold text-[#05893e] flex-shrink-0 animate-pulse">
            🔴 আজকের দর:
          </span>
          <div className="flex items-center gap-4 animate-pulse">
            <div className="h-6 w-36 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-40 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-44 bg-gray-200 rounded-full hidden sm:block"></div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="w-full bg-[#f0f5f0] border-b border-[#e1e8e1] py-2 overflow-hidden relative group">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-4 pr-4">
          {products.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";

            return (
              <Link
                key={`t1-${item.id}`}
                href={`/product/${item.id}`}
                className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#e1e8e1] text-xs hover:border-[#05893e] transition shadow-xs flex-shrink-0"
              >
                <span className="text-sm">{item.image || item.categoryIcon || "🛒"}</span>
                <span className="font-semibold text-[#1d271f]">{item.nameBn}</span>
                <span className="text-gray-600 font-medium">
                  {toBengaliNumber(item.today)} টাকা{formatUnit(item.unit)}
                </span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded text-[11px] flex items-center gap-0.5 ${
                    isUp
                      ? "bg-[#eaf7ed] text-[#05893e]"
                      : isDown
                      ? "bg-[#fdeeed] text-[#d03739]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBengaliNumber(item.change?.pct || 0)}%
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 pr-4" aria-hidden="true">
          {products.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";

            return (
              <Link
                key={`t2-${item.id}`}
                href={`/product/${item.id}`}
                className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#e1e8e1] text-xs hover:border-[#05893e] transition shadow-xs flex-shrink-0"
              >
                <span className="text-sm">{item.image || item.categoryIcon || "🛒"}</span>
                <span className="font-semibold text-[#1d271f]">{item.nameBn}</span>
                <span className="text-gray-600 font-medium">
                  {toBengaliNumber(item.today)} টাকা{formatUnit(item.unit)}
                </span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded text-[11px] flex items-center gap-0.5 ${
                    isUp
                      ? "bg-[#eaf7ed] text-[#05893e]"
                      : isDown
                      ? "bg-[#fdeeed] text-[#d03739]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBengaliNumber(item.change?.pct || 0)}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
