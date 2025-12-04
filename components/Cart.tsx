"use client";

import { useState, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useConfetti } from "@/contexts/ConfettiContext";
import { products } from "@/lib/products";

export default function Cart() {
  const { items, addToCart, clearCart, shouldBounce } = useCart();
  const { triggerConfetti } = useConfetti();
  const [isDragOver, setIsDragOver] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Calculate total items count
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Handle drag over: prevent default to allow drop, highlight cart
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  // Handle drag leave: remove highlight
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Handle drop: read product id, find product, add to cart
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    // Get product id from dataTransfer
    const productId = e.dataTransfer.getData("text/plain");

    // Find the product from the products list
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Add to cart (this will trigger bounce via context)
      addToCart(product);

      // Calculate confetti origin near the cart area
      // If cart ref is available, use its position; otherwise use center-top
      let confettiOrigin = { x: 0.8, y: 0.3 }; // Default: right-center-top

      if (cartRef.current) {
        const rect = cartRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confettiOrigin = { x, y };
      }

      // Trigger confetti explosion from near the cart
      // The confetti system handles the animation without causing app re-renders
      triggerConfetti({
        origin: confettiOrigin,
        particleCount: 100,
        spread: 70,
        startVelocity: 30,
      });
    }
  };

  return (
    <section
      ref={cartRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Shopping cart drop zone"
      className={`bg-white rounded-xl shadow-lg border-2 p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] transition-all duration-200 hover:shadow-xl ${
        isDragOver
          ? "border-blue-500 bg-blue-50 border-solid"
          : "border-dashed border-gray-300"
      } ${
        shouldBounce
          ? "scale-105 transition-transform duration-200"
          : "scale-100"
      }`}
    >
      {/* Cart Header with Badge */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Cart
        </h2>
        {totalItems > 0 && (
          <span
            className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full"
            aria-label={`${totalItems} item${totalItems !== 1 ? "s" : ""} in cart`}
          >
            {totalItems}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Drop items here to start
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Drag products from the left
          </p>
        </div>
      ) : (
        // Cart items list
        <div className="flex flex-col gap-4">
          <div className="space-y-3 flex-1 max-h-[400px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-blue-600 text-base sm:text-lg ml-4 whitespace-nowrap">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Cart Footer with Total and Clear Button */}
          <div className="mt-4 pt-4 border-t-2 border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                Subtotal:
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={clearCart}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

