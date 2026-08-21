import { useMemo, useState } from "react";
import { MENU, CATEGORIES } from "../data/menu.js";
import { useOrders, STATUS } from "../store.js";

const rm = (n) => "RM " + parseFloat(n).toFixed(2);

// menu.js may use either { cat, desc } or { category, description }
// depending on edits — read both so the menu always renders.
const catOf = (m) => m.cat ?? m.category;
const descOf = (m) => m.desc ?? m.description ?? "";

export default function CustomerApp() {
  const { orders, placeOrder } = useOrders();
  const [cart, setCart] = useState({});
  const [table, setTable] = useState("");
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const [lastOrder, setLastOrder] = useState(null);

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
    () => MENU.filter((m) => catOf(m) === activeCat),
    [activeCat]
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
    <>
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

      <section className="hero">
        <p className="hero-eyebrow">Dapur buka · 8 pagi – 10 malam</p>
        <h1 className="hero-title">Panas-panas, terus ke meja kau.</h1>
        <p className="hero-sub">
          Order dari telefon, kami masak, kau relax. Nasi lemak sampai teh
          tarik — semua fresh, dimasak bila kau order.
        </p>
        <a className="hero-cta" href="#menu">
          Lihat menu
        </a>
      </section>

      <main className="customer">
        <div className="menu-area" id="menu">
          <div className="section-head">
            <p className="eyebrow">Semua fresh, dimasak bila diorder</p>
            <h2 className="screen-title">Menu</h2>
          </div>

          <div className="cats" role="tablist" aria-label="Kategori menu">
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
                <div className="mi-tile">
                  <span className="mi-title">{m.name}</span>
                  <span className="mi-price-tag">{rm(m.price)}</span>
                </div>
                <div className="mi-info">
                  <p className="mi-desc">{descOf(m)}</p>
                </div>
                <div className="mi-controls">
                  {cart[m.id]?.qty ? (
                    <div className="stepper">
                      <button aria-label="Kurang" onClick={() => remove(m.id)}>
                        −
                      </button>
                      <span>{cart[m.id].qty}</span>
                      <button aria-label="Tambah" onClick={() => add(m)}>
                        +
                      </button>
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
                    <span className="cl-price">
                      {rm(parseFloat(l.price) * l.qty)}
                    </span>
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
    </>
  );
}

function statusKey(s) {
  if (s === STATUS.NEW) return "new";
  if (s === STATUS.PREPARING) return "prep";
  if (s === STATUS.READY) return "ready";
  return "done";
}