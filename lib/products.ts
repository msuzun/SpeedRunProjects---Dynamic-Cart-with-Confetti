export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Pixel Headphones",
    price: 129.99,
  },
  {
    id: "2",
    name: "Retro Keyboard",
    price: 89.99,
  },
  {
    id: "3",
    name: "Wireless Mouse",
    price: 49.99,
  },
  {
    id: "4",
    name: "USB-C Hub",
    price: 39.99,
  },
  {
    id: "5",
    name: "Mechanical Switch",
    price: 19.99,
  },
  {
    id: "6",
    name: "LED Monitor Stand",
    price: 79.99,
  },
];

