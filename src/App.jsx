import { useState } from "react";
import CustomerApp from "./components/CustomerApp.jsx";
import KitchenApp from "./components/KitchenApp.jsx";

// Two apps in one: the customer ordering screen and the kitchen
// dashboard. In a real deployment these would be separate URLs;
// here a top switcher lets you (and anyone trying the demo) flip
// between them. Open the same site in two tabs — order in one,
// watch it land in the kitchen tab live.

export default function App() {
  const [view, setView] = useState("customer");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">🍜</span>
          <span className="brand-name">WarungGo</span>
        </div>
        <div className="switcher" role="tablist" aria-label="Pilih paparan">
          <button
            role="tab"
            aria-selected={view === "customer"}
            className={view === "customer" ? "on" : ""}
            onClick={() => setView("customer")}
          >
            Customer
          </button>
          <button
            role="tab"
            aria-selected={view === "kitchen"}
            className={view === "kitchen" ? "on" : ""}
            onClick={() => setView("kitchen")}
          >
            Dapur / Kitchen
          </button>
        </div>
      </header>

      {view === "customer" ? <CustomerApp /> : <KitchenApp />}

      <p className="demo-hint">
        Tip: buka site ni dalam <strong>dua tab</strong> — order kat tab
        Customer, tengok ia masuk live kat tab Kitchen.
      </p>
    </div>
  );
}
