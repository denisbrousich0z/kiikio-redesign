"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  qty: number;
};

type Ctx = {
  lines: CartLine[];
  open: boolean;
  setOpen: (b: boolean) => void;
  add: (line: CartLine) => void;
  remove: (slug: string, size: string, color: string) => void;
  subtotal: number;
  count: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex(
        (l) => l.slug === line.slug && l.size === line.size && l.color === line.color
      );
      if (idx >= 0) {
        const next = prev.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, size: string, color: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size && l.color === color)));
  }, []);

  const value = useMemo<Ctx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { lines, open, setOpen, add, remove, subtotal, count };
  }, [lines, open, add, remove]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
