import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  const previewProducts = products.slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <Hero />

      <div id="সব-পণ্য" className="scroll-mt-24 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {previewProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
