import { useMemo, useState, useEffect } from "react";
import { CATEGORIES } from "../data/menu.js";
import { useOrders, STATUS } from "../store.js";
import { fetchMenu } from "../api.js";

const rm = (n) => "RM " + parseFloat(n).toFixed(2);

export default function CustomerApp() {
  const { orders, placeOrder } = useOrders();
  const [cart, setCart] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [table, setTable] = useState("");
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    fetchMenu().then(data => {
      if (data && data.length > 0) setMenuData(data);
    });
  }, []);

  const add = (item) =>
    setCart((c) => {
      const cur = c[item.id];
      return { ...c, [item.id]: { ...item, qty: (cur?.qty || 0) + 1 } };
    });

  const remove = (id) =>
    setCart((c) => {
      const cur = c[id];
      if (!cur) return c;
      if (cur.qty <= 1) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: { ...cur, qty: cur.qty - 1 } };
    });

  const lines = Object.values(cart);
  const total = lines.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  const count = lines.reduce((s, i) => s + i.qty, 0);

  const visible = useMemo(
    () => menuData.filter((m) => m.category === activeCat),
    [activeCat, menuData]
  );

  const tracked = lastOrder
    ? orders.find((o) => o.id === lastOrder.id) || lastOrder
    : null;

  const checkout = () => {
    if (count === 0) return;
    const order = placeOrder(cart, table.trim());
    setLastOrder(order);
    setCart({});
    setTable("");
  };

  return (
    <main className="customer">
      {tracked && (
        <div className={`status-banner s-${statusKey(tracked.status)}`}>
          <div>
            <span className="status-ref">#{tracked.ref}</span>
            <span className="status-text">{tracked.status}</span>
          </div>
          <button className="link" onClick={() => setLastOrder(null)}>
            Tutup
          </button>
        </div>
      )}

      <div className="menu-area">
        <h2 className="screen-title">Menu</h2>

        <div className="cats" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={activeCat === c}
              className={activeCat === c ? "cat on" : "cat"}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="menu-list">
          {visible.map((m) => (
            <li key={m.id} className="menu-item">
              <span className="mi-emoji" aria-hidden="true">{m.emoji}</span>
              <div className="mi-info">
                <div className="mi-name">{m.name}</div>
                <div className="mi-desc">{m.description}</div>
                <div className="mi-price">{rm(m.price)}</div>
              </div>
              <div className="mi-controls">
                {cart[m.id]?.qty ? (
                  <div className="stepper">
                    <button aria-label="Kurang" onClick={() => remove(m.id)}>−</button>
                    <span>{cart[m.id].qty}</span>
                    <button aria-label="Tambah" onClick={() => add(m)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => add(m)}>
                    Tambah
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="cart">
        <h3>Pesanan anda</h3>
        {lines.length === 0 ? (
          <p className="cart-empty">
            Cart kosong lagi. Tap "Tambah" untuk pilih makanan.
          </p>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <span className="cl-qty">{l.qty}×</span>
                  <span className="cl-name">{l.name}</span>
                  <span className="cl-price">{rm(parseFloat(l.price) * l.qty)}</span>
                </li>
              ))}
            </ul>

            <label className="table-field">
              No. meja <span className="muted">(kosongkan kalau bungkus)</span>
              <input
                inputMode="numeric"
                placeholder="cth: 5"
                value={table}
                onChange={(e) => setTable(e.target.value)}
              />
            </label>

            <div className="cart-total">
              <span>Jumlah</span>
              <strong>{rm(total)}</strong>
            </div>
            <button className="checkout-btn" onClick={checkout}>
              Hantar pesanan · {rm(total)}
            </button>
          </>
        )}
      </aside>
    </main>
  );
}

function statusKey(s) {
  if (s === STATUS.NEW) return "new";
  if (s === STATUS.PREPARING) return "prep";
  if (s === STATUS.READY) return "ready";
  return "done";
}