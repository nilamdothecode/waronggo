import { useOrders, STATUS } from "../store.js";

const rm = (n) => "RM " + n.toFixed(2);

// Next-step button label for each status.
const NEXT_LABEL = {
  [STATUS.NEW]: "Mula masak",
  [STATUS.PREPARING]: "Tanda siap",
  [STATUS.READY]: "Dah diambil",
};

function statusKey(s) {
  if (s === STATUS.NEW) return "new";
  if (s === STATUS.PREPARING) return "prep";
  if (s === STATUS.READY) return "ready";
  return "done";
}

function sinceText(iso) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "baru je";
  return mins + " min lalu";
}

export default function KitchenApp() {
  const { orders, advance, clearDone } = useOrders();

  const active = orders.filter((o) => o.status !== STATUS.DONE);
  const done = orders.filter((o) => o.status === STATUS.DONE);

  return (
    <main className="kitchen">
      <div className="kitchen-head">
        <div>
          <h2 className="screen-title">Dapur · Live</h2>
          <p className="muted">
            {active.length} pesanan aktif · auto-update bila order baru masuk
          </p>
        </div>
        {done.length > 0 && (
          <button className="clear-btn" onClick={clearDone}>
            Kosongkan selesai ({done.length})
          </button>
        )}
      </div>

      {active.length === 0 ? (
        <div className="kitchen-empty">
          <span className="ke-emoji">🍳</span>
          <p>Takde pesanan lagi.</p>
          <p className="muted">
            Order baru dari tab Customer akan muncul di sini secara automatik.
          </p>
        </div>
      ) : (
        <div className="ticket-grid">
          {active.map((o) => (
            <article key={o.id} className={`ticket s-${statusKey(o.status)}`}>
              <header className="ticket-top">
                <span className="ticket-ref">#{o.ref}</span>
                <span className={`pill s-${statusKey(o.status)}`}>
                  {o.status}
                </span>
              </header>
              <div className="ticket-meta">
                <span>
                  {o.table === "Bungkus" ? "🛍️ Bungkus" : "🪑 Meja " + o.table}
                </span>
                <span className="muted">{sinceText(o.placedAt)}</span>
              </div>
              <ul className="ticket-items">
                {o.items.map((i) => (
                  <li key={i.id}>
                    <span className="ti-qty">{i.qty}×</span>
                    {i.name}
                  </li>
                ))}
              </ul>
              <footer className="ticket-foot">
                <strong>{rm(o.total)}</strong>
                <button className="advance-btn" onClick={() => advance(o.id)}>
                  {NEXT_LABEL[o.status]}
                </button>
              </footer>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
