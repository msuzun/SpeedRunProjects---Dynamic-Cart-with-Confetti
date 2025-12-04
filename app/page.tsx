import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dynamic Cart Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Drag products into the cart (confetti coming soon)
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </main>
  );
}

