# Dynamic Cart with Confetti 🎉

A modern, interactive shopping cart demo built with Next.js 14. Drag products into the cart and watch confetti explode with each addition!

![Dynamic Cart Demo](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🎯 Project Overview

This is a small, production-quality micro project that demonstrates:

- **Drag & Drop**: HTML5 Drag & Drop API for intuitive product selection
- **Confetti Animations**: Celebratory confetti explosions when items are added
- **Cart Management**: Real-time cart updates with quantity tracking
- **Responsive Design**: Mobile-first layout that works on all devices
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Confetti**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository** (or download the project)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **View Products**: Browse the product grid on the left (desktop) or below the cart (mobile)
2. **Drag & Drop**: Click and drag any product card into the cart area
3. **Watch the Magic**: Confetti explodes from the cart when an item is successfully added!
4. **Manage Cart**: 
   - View item quantities and totals
   - See the total item count badge
   - Clear the entire cart with the "Clear Cart" button

## 🏗️ Architecture

### Drag & Drop Implementation

The drag & drop functionality uses the native HTML5 Drag & Drop API:

- **ProductCard**: Each product card is draggable (`draggable` attribute)
- **Data Transfer**: Product ID is stored in `dataTransfer` when drag starts
- **Cart Drop Zone**: Cart listens for `onDragOver` and `onDrop` events
- **Product Lookup**: On drop, the product is found by ID and added to cart

### Confetti System

The confetti system is built with `canvas-confetti` and managed via React Context:

- **ConfettiProvider**: Wraps the app and provides `triggerConfetti()` function
- **Dynamic Origin**: Confetti originates from the cart's position on screen
- **Multiple Bursts**: Three sequential bursts create a more satisfying effect
- **Performance**: Canvas-based rendering doesn't cause React re-renders

### State Management

Cart state is managed using React Context:

- **CartContext**: Stores cart items and provides `addToCart()` and `clearCart()` functions
- **Bounce Animation**: Cart briefly scales up when items are added
- **Type Safety**: Full TypeScript support with proper types

### Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── ProductCard.tsx     # Draggable product card
│   └── Cart.tsx            # Cart drop zone and item list
├── contexts/
│   ├── CartContext.tsx     # Cart state management
│   └── ConfettiContext.tsx # Confetti trigger system
├── lib/
│   └── products.ts         # Product data
└── types/
    └── canvas-confetti.d.ts # TypeScript definitions
```

## 🎨 Features

- ✅ **Responsive Design**: Mobile-first layout with breakpoints for tablet and desktop
- ✅ **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus styles
- ✅ **Micro-interactions**: Hover effects, scale animations, smooth transitions
- ✅ **Cart Badge**: Visual indicator showing total item count
- ✅ **Clear Cart**: One-click button to reset the cart
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Performance**: Optimized animations that don't block the UI

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript strict mode enabled
- Consistent code formatting
- Proper component organization
- Commented code for clarity

## 📝 License

This project is open source and available for portfolio use.

## 🙏 Acknowledgments

- Built as part of a 100-day Cursor speedrun challenge
- Uses [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) by [Kiril Vatev](https://github.com/catdad)

---

**Enjoy the confetti! 🎊**
