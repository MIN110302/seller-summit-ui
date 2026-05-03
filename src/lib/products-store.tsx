import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Status = "Profitable" | "Low Margin" | "Losing Money";

export type Product = {
  id: string;
  name: string;
  emoji: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  ship: number;
  fee: number;
  ad: number;
  refund: number; // %
  other: number;
  sales: number;
  stock: number;
};

const seed: Product[] = [
  { id: "p1", name: "Wireless LED Lamp", emoji: "💡", sku: "MF-1042", category: "Home", price: 39.9, cost: 8.5, ship: 3.2, fee: 1.8, ad: 6.4, refund: 2, other: 0.4, sales: 412, stock: 240 },
  { id: "p2", name: "Portable Blender", emoji: "🥤", sku: "MF-1108", category: "Kitchen", price: 49.0, cost: 14.2, ship: 4.5, fee: 2.1, ad: 22.6, refund: 3, other: 0.6, sales: 287, stock: 96 },
  { id: "p3", name: "Ergonomic Laptop Stand", emoji: "💻", sku: "MF-1233", category: "Office", price: 34.5, cost: 7.0, ship: 3.8, fee: 1.5, ad: 5.0, refund: 2, other: 0.3, sales: 519, stock: 320 },
  { id: "p4", name: "Mini Thermal Printer", emoji: "🖨️", sku: "MF-1390", category: "Office", price: 59.0, cost: 22.0, ship: 5.0, fee: 2.6, ad: 31.0, refund: 4, other: 0.8, sales: 88, stock: 45 },
  { id: "p5", name: "Smart Water Bottle", emoji: "💧", sku: "MF-1455", category: "Fitness", price: 29.9, cost: 6.5, ship: 2.8, fee: 1.3, ad: 4.8, refund: 2, other: 0.4, sales: 624, stock: 410 },
  { id: "p6", name: "Posture Corrector Belt", emoji: "🧍", sku: "MF-1521", category: "Fitness", price: 24.9, cost: 4.2, ship: 2.1, fee: 1.0, ad: 3.5, refund: 2, other: 0.2, sales: 731, stock: 280 },
  { id: "p7", name: "RGB Gaming Mouse Pad", emoji: "🖱️", sku: "MF-1612", category: "Gaming", price: 22.0, cost: 7.8, ship: 3.0, fee: 1.1, ad: 8.6, refund: 3, other: 0.3, sales: 198, stock: 130 },
  { id: "p8", name: "Pet Hair Remover", emoji: "🐾", sku: "MF-1734", category: "Pets", price: 19.9, cost: 3.0, ship: 1.8, fee: 0.9, ad: 2.4, refund: 2, other: 0.2, sales: 905, stock: 620 },
];

export function computeProfit(p: Product) {
  const refundCost = p.price * (p.refund / 100);
  const total = p.cost + p.ship + p.fee + p.ad + p.other + refundCost;
  const profit = p.price - total;
  const margin = p.price > 0 ? (profit / p.price) * 100 : 0;
  let status: Status = "Profitable";
  if (margin < 10) status = "Losing Money";
  else if (margin < 25) status = "Low Margin";
  return { profit, margin, status, refundCost, totalCost: total };
}

type Ctx = {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "sku" | "emoji" | "category" | "sales" | "stock"> & Partial<Product>) => Product;
};

const ProductsCtx = createContext<Ctx | null>(null);

const KEY = "mf:products";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProducts(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(KEY, JSON.stringify(products)); } catch {}
  }, [products]);

  const addProduct: Ctx["addProduct"] = useCallback((p) => {
    const id = `p${Date.now()}`;
    const newProd: Product = {
      id,
      name: p.name || "New Product",
      emoji: p.emoji || "🆕",
      sku: p.sku || `MF-${Math.floor(1000 + Math.random() * 9000)}`,
      category: p.category || "General",
      price: p.price || 0,
      cost: p.cost || 0,
      ship: p.ship || 0,
      fee: p.fee || 0,
      ad: p.ad || 0,
      refund: p.refund || 0,
      other: p.other || 0,
      sales: p.sales || 0,
      stock: p.stock || 100,
    };
    setProducts((xs) => [newProd, ...xs]);
    return newProd;
  }, []);

  const value = useMemo(() => ({ products, addProduct }), [products, addProduct]);
  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsCtx);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
