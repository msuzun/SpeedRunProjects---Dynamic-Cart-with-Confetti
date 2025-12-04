"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/products";

// Cart item type: stores product and its quantity
export type CartItem = {
  product: Product;
  quantity: number;
};

// Cart context type
type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  // Expose a trigger function for bounce animation
  triggerBounce: () => void;
  shouldBounce: boolean;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
// Using React Context because it's built-in, lightweight, and perfect for this demo.
// For larger apps, Zustand would be better, but Context is simpler here.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shouldBounce, setShouldBounce] = useState(false);

  // Add product to cart or increment quantity if already exists
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Increment quantity if product already in cart
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });

    // Trigger bounce animation
    triggerBounce();
  };

  // Trigger bounce animation by toggling state
  const triggerBounce = () => {
    setShouldBounce(true);
    // Reset after animation duration (200ms)
    setTimeout(() => {
      setShouldBounce(false);
    }, 200);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, triggerBounce, shouldBounce }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

