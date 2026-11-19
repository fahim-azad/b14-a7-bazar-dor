import React from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface PriceFallersProps {
  products: Product[];
}

export default function PriceFallers({ products }: PriceFallersProps) {
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section className="my-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#fdeeed] border border-[#d03739]/20 text-[#d03739] flex items-center justify-center font-bold text-sm shadow-xs">
          ▼
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
