"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const initials = product.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Handle drag start: store product id in dataTransfer
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // Store the product id so Cart can retrieve it on drop
    e.dataTransfer.setData("text/plain", product.id);
    // Set drag image opacity (optional visual feedback)
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag end: reset dragging state
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-move p-6 flex flex-col items-center gap-4 ${
        isDragging
          ? "opacity-50 border-2 border-blue-400 scale-95"
          : "opacity-100"
      }`}
    >
      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-inner">
        {initials}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

