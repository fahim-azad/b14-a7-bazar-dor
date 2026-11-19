import React from "react";
import { getProductById } from "@/lib/api";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProductById(params.id);
  const title = product?.nameBn
    ? `${product.nameBn} - বাজার দর`
    : "পণ্যের বিবরণ - বাজার দর";
  return {
    title,
    description: product
      ? `${product.nameBn}-এর আজকের বাজার দর, সর্বনিম্ন ও সর্বাধিক মূল্য এবং বাজারভিত্তিক বিশ্লেষণ।`
      : "বাজারের প্রয়োজনীয় পণ্যের আজকের সঠিক দর ও বিশ্লেষণ।",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductById(params.id);

  return (
    <main>
      <ProductDetailsContent
        initialProduct={product}
        productId={params.id}
      />
    </main>
  );
}
