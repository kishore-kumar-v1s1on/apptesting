import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { MOCK_PAST_ORDERS } from "../data/mockData";

// ── Types ─────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "placed"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export type OrderLineItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight?: string;
  image?: string;
};

export type Order = {
  id: string;
  shopId: string;
  shopName: string;
  items: OrderLineItem[];
  itemsTotal: number;
  deliveryFee: number;
  handlingCharge: number;
  total: number;
  savings: number;
  deliveryType: "delivery" | "pickup";
  paymentMethod: "upi" | "cod";
  status: OrderStatus;
  placedAt: number;
  eta: string;
};

type OrdersContextValue = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(
  undefined
);

// ── Provider ──────────────────────────────────────────────────────────────────

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>(
    () => MOCK_PAST_ORDERS as Order[]
  );

  const addOrder = useCallback((order: Order): void => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const getOrder = useCallback(
    (id: string): Order | undefined => orders.find((o) => o.id === id),
    [orders]
  );

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, addOrder, getOrder }),
    [orders, addOrder, getOrder]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useOrders = (): OrdersContextValue => {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }
  return ctx;
};
