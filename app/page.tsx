import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <Hero />
      <PriceRisers products={products} />
      <div id="সব-পণ্য" className="scroll-mt-24 pt-4"></div>
    </main>
  );
}
