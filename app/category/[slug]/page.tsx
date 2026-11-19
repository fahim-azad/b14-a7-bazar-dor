import React from "react";
import CategoryContent from "@/components/CategoryContent";
import { getProductsByCategory, getCategories } from "@/lib/api";

const CATEGORY_MAP: Record<string, { nameBn: string; icon: string }> = {
  chal: { nameBn: "চাল", icon: "🍚" },
  dal: { nameBn: "ডাল", icon: "🫘" },
  tel: { nameBn: "তেল", icon: "🛢️" },
  sobji: { nameBn: "সবজি", icon: "🥬" },
  mach: { nameBn: "মাছ", icon: "🐟" },
  mangsho: { nameBn: "মাংস", icon: "🍗" },
  mangso: { nameBn: "মাংস", icon: "🍗" },
  "dim-dui": { nameBn: "ডিম-দুধ", icon: "🥛" },
  "dim-dudh": { nameBn: "ডিম-দুধ", icon: "🥛" },
  mosla: { nameBn: "মসলা", icon: "🌶️" },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const cat = CATEGORY_MAP[params.slug];
  const title = cat ? `${cat.nameBn} - বাজার দর` : "ক্যাটাগরি - বাজার দর";
  return { title };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const products = await getProductsByCategory(slug);
  const catInfo = CATEGORY_MAP[slug];

  const categoryName = catInfo?.nameBn || products[0]?.categoryNameBn || slug;
  const categoryIcon = catInfo?.icon || products[0]?.categoryIcon || "🛒";

  return (
    <main>
      <CategoryContent
        categorySlug={slug}
        categoryName={categoryName}
        categoryIcon={categoryIcon}
        products={products}
      />
    </main>
  );
}
