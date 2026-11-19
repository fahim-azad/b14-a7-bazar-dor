import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Hero Section */}
      <Hero />

      {/* Anchor Target for Hero CTA */}
      <div id="সব-পণ্য" className="scroll-mt-24 pt-4">
        {/* Product sections will be rendered here in Parts 5, 6, 7, 8 */}
      </div>
    </main>
  );
}
