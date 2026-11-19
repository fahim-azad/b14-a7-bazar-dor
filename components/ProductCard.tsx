import React from "react";
import Link from "next/link";
import { Product } from "@/lib/api";
import { toBengaliNumber, formatUnit } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col justify-between bg-white border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 transition duration-200 hover:border-[#05893e] hover:shadow-md"
    >
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 flex-shrink-0 bg-[#f0f5f0] group-hover:bg-[#eaf7ed] transition border border-[#e1e8e1] rounded-xl flex items-center justify-center text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-base font-semibold text-[#1d271f] group-hover:text-[#05893e] transition truncate">
            {product.nameBn}
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            {formatUnit(product.unit, true)}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between pt-3 border-t border-[#f0f5f0]">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-500 font-medium">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-bold text-[#1d271f]">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
            isUp
              ? "bg-[#eaf7ed] text-[#05893e] border-[#05893e]/20"
              : isDown
              ? "bg-[#fdeeed] text-[#d03739] border-[#d03739]/20"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBengaliNumber(product.change?.pct || 0)}%</span>
        </div>
      </div>
    </Link>
  );
}
