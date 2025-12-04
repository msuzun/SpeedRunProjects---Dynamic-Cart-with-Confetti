import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ConfettiProvider } from "@/contexts/ConfettiContext";

export const metadata: Metadata = {
  title: "Dynamic Cart with Confetti",
  description: "A demo project for drag-and-drop cart with confetti animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConfettiProvider>
          <CartProvider>{children}</CartProvider>
        </ConfettiProvider>
      </body>
    </html>
  );
}

