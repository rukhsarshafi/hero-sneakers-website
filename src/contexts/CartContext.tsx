import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState } from
"react";
import { toast } from "sonner";
import type { CartItem, Product } from "../types/product";
import { getShipping } from "../utils/currency";

const CART_KEY = "hero-cart";
const WISHLIST_KEY = "hero-wishlist";
const MAX_QTY = 10;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (product: Product, size: number, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: {children: ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage<CartItem[]>(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage<string[]>(WISHLIST_KEY, []));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    writeStorage(CART_KEY, items);
  }, [items]);

  useEffect(() => {
    writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((product: Product, size: number, quantity = 1) => {
    const key = `${product.id}-${size}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
        item.key === key ?
        { ...item, quantity: Math.min(MAX_QTY, item.quantity + quantity) } :
        item
        );
      }
      return [...prev, { key, product, size, quantity: Math.min(MAX_QTY, quantity) }];
    });
    toast.success(`${product.name} added to your bag`, {
      description: `EU ${size} · Qty ${quantity}`,
      action: { label: "View bag", onClick: () => setDrawerOpen(true) }
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.key === key);
      if (removed) toast(`${removed.product.name} removed from your bag`);
      return prev.filter((item) => item.key !== key);
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
    prev.map((item) =>
    item.key === key ?
    { ...item, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) } :
    item
    )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      toast(exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
      return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
    });
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = getShipping(subtotal);
    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      wishlist,
      toggleWishlist,
      isWishlisted
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart, isDrawerOpen, openDrawer, closeDrawer, wishlist, toggleWishlist, isWishlisted]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {

    // storage unavailable — cart still works in memory
  }}