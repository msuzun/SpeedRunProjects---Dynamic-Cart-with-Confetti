"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/products";

export default function Cart() {
  const { items, addToCart, shouldBounce } = useCart();
  const [isDragOver, setIsDragOver] = useState(false);

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
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`bg-white rounded-lg shadow-md border-2 p-8 min-h-[400px] transition-all duration-200 ${
        isDragOver
          ? "border-blue-500 bg-blue-50 border-solid"
          : "border-dashed border-gray-300"
      } ${
        shouldBounce
          ? "scale-105 transition-transform duration-200"
          : "scale-100"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart</h2>

      {items.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <p className="text-gray-500 text-center">
            Drop items here to start
          </p>
        </div>
      ) : (
        // Cart items list
        <div className="flex flex-col gap-4">
          <div className="space-y-3 flex-1">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-blue-600">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

