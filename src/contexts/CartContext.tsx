import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  shopId: string;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: CartProduct, shopId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: CartProduct, shopId: string): void => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            shopId,
          },
        ];
      });
    },
    []
  );

  const incrementItem = useCallback((productId: string): void => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }, []);

  const decrementItem = useCallback((productId: string): void => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string): void => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback((): void => setItems([]), []);

  const getQuantity = useCallback(
    (productId: string): number =>
      items.find((i) => i.productId === productId)?.quantity ?? 0,
    [items]
  );

  const count = useMemo<number>(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items]
  );

  const total = useMemo<number>(
    () => items.reduce((s, i) => s + i.quantity * i.price, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      getQuantity,
      count,
      total,
    }),
    [
      items,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      getQuantity,
      count,
      total,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
