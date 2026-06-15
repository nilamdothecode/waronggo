// ============================================================
// store.js — the "fake backend"
//
// Orders live in localStorage so they survive a page refresh.
// When one tab changes an order, it broadcasts the change so the
// other tab (e.g. the kitchen screen) updates instantly. This is
// how the customer app and kitchen dashboard talk to each other
// without a real server — good enough for a live demo.
// ============================================================

import { useEffect, useState, useCallback } from "react";

const KEY = "warunggo:orders";
const channel =
  typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("warunggo")
    : null;

export const STATUS = {
  NEW: "Baru masuk",
  PREPARING: "Tengah masak",
  READY: "Siap diambil",
  DONE: "Selesai",
};

// Order of the status flow, used to advance an order to the next step.
export const STATUS_FLOW = [
  STATUS.NEW,
  STATUS.PREPARING,
  STATUS.READY,
  STATUS.DONE,
];

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function write(orders) {
  localStorage.setItem(KEY, JSON.stringify(orders));
  // Tell other tabs something changed.
  if (channel) channel.postMessage({ type: "changed" });
}

// React hook: gives you the live list of orders plus actions.
export function useOrders() {
  const [orders, setOrders] = useState(read);

  const refresh = useCallback(() => setOrders(read()), []);

  useEffect(() => {
    // Same-browser tabs: BroadcastChannel. Fallback: storage event.
    if (channel) channel.onmessage = refresh;
    window.addEventListener("storage", refresh);
    return () => {
      if (channel) channel.onmessage = null;
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const placeOrder = useCallback((cart, table) => {
    const items = Object.values(cart);
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const order = {
      id: Date.now(),
      ref: "WG" + String(Date.now()).slice(-5),
      table: table || "Bungkus",
      items,
      total,
      status: STATUS.NEW,
      placedAt: new Date().toISOString(),
    };
    const next = [order, ...read()];
    write(next);
    setOrders(next);
    return order;
  }, []);

  const advance = useCallback((id) => {
    const next = read().map((o) => {
      if (o.id !== id) return o;
      const i = STATUS_FLOW.indexOf(o.status);
      const nextStatus = STATUS_FLOW[Math.min(i + 1, STATUS_FLOW.length - 1)];
      return { ...o, status: nextStatus };
    });
    write(next);
    setOrders(next);
  }, []);

  const clearDone = useCallback(() => {
    const next = read().filter((o) => o.status !== STATUS.DONE);
    write(next);
    setOrders(next);
  }, []);

  return { orders, placeOrder, advance, clearDone, refresh };
}
