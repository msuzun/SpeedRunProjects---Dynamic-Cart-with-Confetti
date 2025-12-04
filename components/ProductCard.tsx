"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Generate initials for product image placeholder
  const initials = product.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Handle drag start: store product id in dataTransfer
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", product.id);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag end: reset dragging state
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle keyboard interaction (Enter/Space to simulate drag)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLArticleElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // For keyboard users, we could trigger a different interaction
      // For now, we'll just focus the cart area
      const cartElement = document.querySelector('[aria-label="Shopping cart drop zone"]');
      if (cartElement) {
        (cartElement as HTMLElement).focus();
      }
    }
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${product.name}, $${product.price.toFixed(2)}. Drag to cart or press Enter to focus cart`}
      className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-move p-5 sm:p-6 flex flex-col items-center gap-4 border border-gray-100 ${
        isDragging
          ? "opacity-50 border-2 border-blue-500 scale-95 shadow-md"
          : "opacity-100"
      }`}
    >
      {/* Product Image Placeholder */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-inner group-hover:scale-105 transition-transform duration-300">
        {initials}
      </div>

      {/* Product Info */}
      <div className="text-center w-full">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xl sm:text-2xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}

