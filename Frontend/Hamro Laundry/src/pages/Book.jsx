import { useState } from "react";
import "../assets/CCS/Book.css";
import Footer from "../component/Footer";
import axios from "axios";

const genRef = () => "BK" + Date.now().toString(36).toUpperCase();

function Book({
  addToBasket = () => {},
  navBasket = [],
  setBasket = () => {},
  goPrice = () => {},
  goLogin = () => {},
  isLoggedIn = false,
}) {
  const bookCats = [
    {
      id: "laundry",
      label: "Laundry",
      icon: "Shirt",
      items: [
        { id: "clothes", label: "Clothes", icon: "C", sub: "Shirts, trousers, dresses", opts: ["Wash & Fold", "Wash & Iron"] },
        { id: "linens", label: "Linens", icon: "L", sub: "Sheets, towels, pillowcases", opts: ["Wash & Fold", "Wash & Iron"] },
        { id: "delicates", label: "Delicates", icon: "D", sub: "Silk, lace, fine fabrics", opts: ["Gentle Wash", "Dry Clean"] },
      ],
    },
    {
      id: "blankets",
      label: "Blankets",
      icon: "Bed",
      items: [
        { id: "single_b", label: "Single Blanket", icon: "S", sub: "Up to single bed size", opts: ["Wash & Fold", "Dry Clean"] },
        { id: "double_b", label: "Double Blanket", icon: "D", sub: "Double/queen size", opts: ["Wash & Fold", "Dry Clean"] },
      ],
    },
    {
      id: "carpets",
      label: "Carpets",
      icon: "Rug",
      items: [
        { id: "small_c", label: "Small Carpet", icon: "S", sub: "Under 4x6 ft", opts: ["Standard", "Deep Clean"] },
        { id: "large_c", label: "Large Carpet", icon: "L", sub: "6x8 ft and above", opts: ["Standard", "Deep Clean"] },
      ],
    },
  ];

  const [cat, setCat] = useState("laundry");
  const [mode, setMode] = useState("regular");
  const [sels, setSels] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");

  const catObj = bookCats.find((c) => c.id === cat);
  const total = navBasket.reduce((sum, item) => sum + item.qty, 0);

  const togOpt = (id, option) => {
    setSels((prev) => ({
      ...prev,
      [id]: { ...prev[id], option: prev[id]?.option === option ? undefined : option },
    }));
  };

  const adjQty = (id, change) => {
    setSels((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: Math.max(1, (prev[id]?.qty || 1) + change) },
    }));
  };

  const updateBasketQty = (id, change) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const removeBasketItem = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const add = (item) => {
    const selected = sels[item.id] || {};

    if (!selected.option) {
      alert("Select a service option.");
      return;
    }

    addToBasket({
      id: item.id + "|" + selected.option + "|" + mode,
      icon: item.icon,
      name: item.label,
      option: selected.option,
      mode,
      qty: selected.qty || 1,
    });
    setSels((prev) => ({ ...prev, [item.id]: { option: undefined, qty: 1 } }));
  };

  const confirm = async() => {
    if (navBasket.length === 0) {
      alert("Add at least one service to your basket.");
      return;
    }

    if (!isLoggedIn) {
      alert("Please login before confirming your booking.");
      goLogin();
      return;
    }

    if (!date || !time) {
      alert("Please select a date and time slot.");
      return;
    }
    try {
        const response = await axios.post(
          "http://localhost:5000/api/booking/create",
          {
            user_id: JSON.parse(localStorage.getItem("hamro_user")).id,
            basket: navBasket,
            date,
            time,
            mode,
          }
        );

        setRef(response.data.booking.id || genRef());

        setDone(true);

        setBasket([]);

      } catch (error) {

        alert(
          error.response?.data?.message || "Booking failed."
        );

      }
  };

  if (done) {
    return (
      <div className="bp" style={{ display: "flex", flexDirection: "column" }}>
        <div className="bp-hero">
          <div className="bp-hi">
            <div>
              <span className="bp-heyebrow">All Done</span>
              <div className="bp-htitle">You're all <em>set!</em></div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 56px" }}>
          <div className="bp-ok">
            <div className="bp-ok-ico">OK</div>
            <h3>Booking Confirmed!</h3>
            <p>Drop off your items on <strong>{date}</strong> at <strong>{time}</strong>. We'll SMS you when ready.</p>
            <div className="bp-ref">{ref}</div><br />
            <button className="bp-again" onClick={() => { setDone(false); setDate(""); setTime(""); }}>+ New Booking</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bp">
      <div className="bp-hero">
        <div className="bp-hi">
          <div>
            <span className="bp-heyebrow">In-Store Drop-Off</span>
            <div className="bp-htitle">Book your <em>services</em></div>
          </div>
          <div className="bp-steps">
            {[["1", "Services"], ["2", "Mode"], ["3", "Schedule"]].map(([number, label], index) => (
              <span key={number} style={{ display: "contents" }}>
                {index > 0 && <div className="bp-sdiv" />}
                <div className={`bp-sp${index === 0 ? " on" : ""}`}>
                  <div className="bp-sc">{number}</div>
                  <span>{label}</span>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bp-body">
        <div className="bp-left">
          <div>
            <span className="bp-lbl">Category</span>
            <div className="bp-cats">
              {bookCats.map((category) => (
                <button key={category.id} className={`bp-cpill${cat === category.id ? " on" : ""}`} onClick={() => setCat(category.id)}>
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="bp-lbl">Service Mode</span>
            <div className="bp-mode-bar">
              <span className="bp-mlbl">Mode:</span>
              {[["regular", "Regular"], ["express", "Express"]].map(([id, label]) => (
                <button key={id} className={`bp-mpill${mode === id ? " on" : ""}`} onClick={() => setMode(id)}>{label}</button>
              ))}
              <span className="bp-mnote">{mode === "express" ? "+50% surcharge" : "Standard rate"}</span>
              <button className="bp-plink" onClick={goPrice}>See prices -&gt;</button>
            </div>
          </div>

          <div>
            <span className="bp-lbl">{catObj.label} - choose &amp; add</span>
            <div className="bp-cards">
              {catObj.items.map((item) => {
                const selected = sels[item.id] || {};

                return (
                  <div className="bp-card" key={item.id}>
                    <div className="bp-ctop">
                      <div className="bp-cico">{item.icon}</div>
                      <div>
                        <div className="bp-cname">{item.label}</div>
                        <div className="bp-csub">{item.sub}</div>
                      </div>
                    </div>
                    <div className="bp-copts">
                      {item.opts.map((option) => (
                        <button key={option} className={`bp-copt${selected.option === option ? " on" : ""}`} onClick={() => togOpt(item.id, option)}>
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="bp-cfoot">
                      <span className="bp-cql">Qty</span>
                      <div className="bp-stepper">
                        <button className="bp-sb" onClick={() => adjQty(item.id, -1)}>-</button>
                        <span className="bp-sv">{selected.qty || 1}</span>
                        <button className="bp-sb" onClick={() => adjQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="bp-cadd" onClick={() => add(item)}>+ Add to Basket</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bp-right">
          <div className="bp-panel">
            <span className="bp-peyebrow">Service Mode</span>
            <div className="bp-mode-info">
              <div className="bp-mdot" />
              <div>
                <div className="bp-mname">{mode === "express" ? "Express" : "Regular"}</div>
                <div className="bp-mdesc">{mode === "express" ? "24h turnaround, ~50% surcharge" : "48h turnaround, standard rate"}</div>
              </div>
            </div>
          </div>

          <div className="bp-panel">
            <span className="bp-peyebrow">Schedule Drop-Off</span>
            <div className="sched-field">
              <label>Date</label>
              <input type="date" className="sched-input" value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <div className="sched-field">
              <label>Time Slot</label>
              <select className="sched-input" value={time} onChange={(event) => setTime(event.target.value)}>
                <option value="">Select a time</option>
                {["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"].map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </div>
            {total > 0 && date && time && <div className="bp-hint">{total} item{total !== 1 ? "s" : ""} - {date}</div>}
            {!isLoggedIn && total > 0 && (
              <div className="bp-login-note">Login is required before you can confirm this booking.</div>
            )}
            <button className="bp-cfm" onClick={confirm} disabled={total === 0} style={{ opacity: total === 0 ? 0.5 : 1, cursor: total === 0 ? "not-allowed" : "pointer" }}>
              <span>OK</span> {isLoggedIn ? "Confirm Booking" : "Login to Confirm"}
            </button>
          </div>

          <div className="bp-panel">
            <div className="bp-basket-head">
              <span className="bp-peyebrow">Your Basket</span>
              {total > 0 && <span className="bp-basket-count">{total}</span>}
            </div>
            {navBasket.length === 0 ? (
              <div className="bp-nudge">
                <div className="bp-nudge-ico">Basket</div>
                <div className="bp-nudge-t">Basket empty</div>
                <div className="bp-nudge-s">Add services above to begin.</div>
              </div>
            ) : (
              <>
                <div className="bp-basket-list">
                  {navBasket.map((item) => (
                    <div className="bp-basket-item" key={item.id}>
                      <div className="bp-basket-icon">{item.icon}</div>
                      <div className="bp-basket-info">
                        <div className="bp-basket-name">{item.name}</div>
                        <div className="bp-basket-meta">
                          {item.option} - {item.mode === "express" ? "Express" : "Regular"}
                        </div>
                        <div className="bp-basket-actions">
                          <button onClick={() => updateBasketQty(item.id, -1)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateBasketQty(item.id, 1)}>+</button>
                          <button className="bp-basket-remove" onClick={() => removeBasketItem(item.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="bp-clear" onClick={() => setBasket([])}>Clear Basket</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book;
