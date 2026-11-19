import React from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface PriceRisersProps {
  products: Product[];
}

export default function PriceRisers({ products }: PriceRisersProps) {
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section className="my-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#eaf7ed] border border-[#05893e]/20 text-[#05893e] flex items-center justify-center font-bold text-sm shadow-xs">
          ▲
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
