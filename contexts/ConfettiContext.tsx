"use client";

import React, { createContext, useContext, ReactNode } from "react";
import confetti from "canvas-confetti";

// Confetti context type
// Provides a trigger function that can be called from anywhere in the app
type ConfettiContextType = {
  triggerConfetti: (options?: ConfettiOptions) => void;
};

// Optional configuration for confetti bursts
export type ConfettiOptions = {
  // Origin position (0-1, where 0.5 is center)
  origin?: { x: number; y: number };
  // Particle count
  particleCount?: number;
  // Spread angle in degrees
  spread?: number;
  // Start velocity
  startVelocity?: number;
  // Duration in milliseconds
  duration?: number;
};

// Create the context
const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined);

// Confetti Provider Component
// This provider initializes canvas-confetti and provides a trigger function.
// The confetti canvas is automatically created by canvas-confetti library.
// We use a ref to ensure the confetti API is available without causing re-renders.
export function ConfettiProvider({ children }: { children: ReactNode }) {
  // Use ref to store confetti instance (doesn't cause re-renders)
  // canvas-confetti works globally, so we don't need to store the instance
  // but we can use refs for any future state if needed

  // Trigger confetti burst with customizable options
  // Default: burst from center-top of screen
  const triggerConfetti = (options?: ConfettiOptions) => {
    const defaultOptions = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.3 }, // Center-top of screen
      startVelocity: 30,
      duration: 1000, // 1 second
      ...options,
    };

    // Fire confetti burst
    // canvas-confetti handles the canvas creation and cleanup automatically
    confetti({
      particleCount: defaultOptions.particleCount,
      spread: defaultOptions.spread,
      origin: defaultOptions.origin,
      startVelocity: defaultOptions.startVelocity,
    });

    // For multiple fast drops, we can fire additional bursts with slight delays
    // This creates a more satisfying effect when items are dropped quickly
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: defaultOptions.origin,
        startVelocity: 25,
      });
    }, 100);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: defaultOptions.origin,
        startVelocity: 25,
      });
    }, 200);
  };

  return (
    <ConfettiContext.Provider value={{ triggerConfetti }}>
      {children}
    </ConfettiContext.Provider>
  );
}

// Custom hook to use confetti context
// Components can call triggerConfetti() without knowing implementation details
export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (context === undefined) {
    throw new Error("useConfetti must be used within a ConfettiProvider");
  }
  return context;
}

