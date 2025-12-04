import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Dynamic Cart Demo
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Drag products into the cart and enjoy confetti celebrations!
          </p>
        </header>

        {/* Main Layout: Mobile-first (cart on top), Desktop (cart on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Products Section */}
          <section className="lg:col-span-2" aria-label="Products">
            <h2 className="sr-only">Available Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Cart Section */}
          <aside className="lg:col-span-1" aria-label="Shopping Cart">
            <Cart />
          </aside>
        </div>
      </div>
    </main>
  );
}

