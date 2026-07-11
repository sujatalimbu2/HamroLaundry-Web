import { useState, useEffect } from "react";
import "../assets/CCS/Book.css";
import Footer from "../component/Footer";
import axios from "axios";
import FeedbackSection from "../component/FeedbackSection";
import AlertModal from "../component/AlertModal";
import "../assets/CCS/AlertModal.css";

const genRef = () => "BK" + Date.now().toString(36).toUpperCase();
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Book({
  addToBasket = () => {},
  navBasket = [],
  setBasket = () => {},
  goPrice = () => {},
  goLogin = () => {},
  isLoggedIn = false,
}) {
  const [cat, setCat] = useState("");
  const [mode, setMode] = useState("regular");
  const [sels, setSels] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [services, setServices] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  const getServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMyBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("hamro_user"));
      if (!user) return;
      const res = await axios.get(
        `http://localhost:5000/api/my-bookings/${user.id}`,
      );
      setMyBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getServices();
    if (isLoggedIn) {
      getMyBookings();
    }
  }, [isLoggedIn]);

  const activeBookings = myBookings.filter(
    (booking) =>
      booking.status !== "Completed" && booking.status !== "Cancelled",
  );

  const historyBookings = myBookings.filter(
    (booking) =>
      booking.status === "Completed" || booking.status === "Cancelled",
  );

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/booking/cancel/${bookingId}`);
      setAlert({
        show: true,
        title: "Success",
        message: "Booking cancelled successfully.",
      });
      getMyBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }

    acc[service.category].push(service);
    return acc;
  }, {});

  const categories = Object.keys(groupedServices);
  const catObj = groupedServices[cat] || [];
  const total = navBasket.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    if (categories.length > 0 && !cat) {
      setCat(categories[0]);
    }
  }, [categories, cat]);

  const togOpt = (id, option) => {
    setSels((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        option: prev[id]?.option === option ? undefined : option,
      },
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
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item,
      ),
    );
  };

  const removeBasketItem = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const add = (item) => {
    const selected = sels[item.id] || {};

    if (!selected.option) {
      setAlert({
        show: true,
        title: "Alert",
        message: "Please select a service option.",
      });
      return;
    }
    addToBasket({
      id: item.id + "|" + selected.option + "|" + mode,
      service_id: item.id, // send dervice id
      icon: item.icon,
      name: item.service_name,
      option: selected.option,
      mode,
      qty: selected.qty || 1,
    });
    setSels((prev) => ({ ...prev, [item.id]: { option: undefined, qty: 1 } }));
  };

  const confirm = async () => {
    if (navBasket.length === 0) {
      setAlert({
        show: true,
        title: "Alert",
        message: "Add at least one service to your basket.",
      });
      return;
    }

    if (!isLoggedIn) {
      setAlert({
        show: true,
        title: "Login Required",
        message: "Please login before confirming your booking.",
      });
      goLogin();
      return;
    }

    if (!date) {
      setAlert({
        show: true,
        title: "Date Required",
        message: "Please select a booking date.",
      });
      return;
    }

    if (!time) {
      setAlert({
        show: true,
        title: "Time Slot Required",
        message: "Please select a time slot.",
      });
      return;
    }
    try {
      console.log("Basket being sent:", navBasket);
      const response = await axios.post(
        "http://localhost:5000/api/booking/create",
        {
          user_id: JSON.parse(localStorage.getItem("hamro_user")).id,
          basket: navBasket,
          date,
          time,
          mode,
        },
      );

      setRef(response.data.booking.id || genRef());

      await getMyBookings();
      setBasket([]);
      setDone(true);
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        title: "Booking Failed",
        message: "Unable to complete your booking. Please try again.",
      });
    }
  };

  if (done) {
    return (
      <div className="bp" style={{ display: "flex", flexDirection: "column" }}>
        <div className="bp-hero">
          <div className="bp-hi">
            <div>
              <span className="bp-heyebrow">All Done</span>
              <div className="bp-htitle">
                You're all <em>set!</em>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 56px",
          }}
        >
          <div className="bp-ok">
            <div className="bp-ok-ico">OK</div>
            <h3>Booking Confirmed!</h3>
            <p>
              Drop off your items on <strong>{formatDate(date)}</strong> at{" "}
              <strong>{time}</strong>. We'll SMS you when ready.
            </p>
            <div className="bp-ref">{ref}</div>
            <br />
            <button
              className="bp-again"
              onClick={() => {
                getMyBookings();
                setDone(false);
                setDate("");
                setTime("");
              }}
            >
             ⬅ Back To Booking
            </button>
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
            <div className="bp-htitle">Book Your Services</div>
            <span className="bp-heyebrow">In-Store Drop-Off</span>
          </div>
          <div className="bp-steps">
            {[
              ["1", "Services"],
              ["2", "Mode"],
              ["3", "Schedule"],
            ].map(([number, label], index) => (
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
              {categories.map((category) => (
                <button
                  key={category}
                  className={`bp-cpill${cat === category ? " on" : ""}`}
                  onClick={() => setCat(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="bp-lbl">Service Mode</span>
            <div className="bp-mode-bar">
              <span className="bp-mlbl">Mode:</span>
              {[
                ["regular", "Regular"],
                ["express", "Express"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={`bp-mpill${mode === id ? " on" : ""}`}
                  onClick={() => setMode(id)}
                >
                  {label}
                </button>
              ))}
              <span className="bp-mnote">
                {mode === "express" ? "+50% surcharge" : "Standard rate"}
              </span>
              <button className="bp-plink" onClick={goPrice}>
                See prices -&gt;
              </button>
            </div>
          </div>

          <div>
            <span className="bp-lbl">{cat} - Choose & Add</span>
            <div className="bp-cards">
              {catObj.map((item) => {
                const selected = sels[item.id] || {};

                return (
                  <div className="bp-card" key={item.id}>
                    <div className="bp-ctop">
                      <div className="bp-cico">{item.icon || "👕"}</div>
                      <div>
                        <div className="bp-cname">{item.service_name}</div>
                        <div className="bp-csub">
                          Standard: NPR {item.standard_price}
                        </div>
                      </div>
                    </div>
                    <div className="bp-copts">
                      {["Wash & Fold", "Wash & Iron"].map((option) => (
                        <button
                          key={option}
                          className={`bp-copt${selected.option === option ? " on" : ""}`}
                          onClick={() => togOpt(item.id, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="bp-cfoot">
                      <span className="bp-cql">Qty</span>
                      <div className="bp-stepper">
                        <button
                          className="bp-sb"
                          onClick={() => adjQty(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="bp-sv">{selected.qty || 1}</span>
                        <button
                          className="bp-sb"
                          onClick={() => adjQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button className="bp-cadd" onClick={() => add(item)}>
                      + Add to Basket
                    </button>
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
                <div className="bp-mname">
                  {mode === "express" ? "Express" : "Regular"}
                </div>
                <div className="bp-mdesc">
                  {mode === "express"
                    ? "24h turnaround, ~50% surcharge"
                    : "48h turnaround, standard rate"}
                </div>
              </div>
            </div>
          </div>

          <div className="bp-panel">
            <span className="bp-peyebrow">Schedule Drop-Off</span>
            <div className="sched-field">
              <label>Date</label>
              <input
                type="date"
                className="sched-input"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="sched-field">
              <label>Time Slot</label>
              <select
                className="sched-input"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">Select a time</option>
                {[
                  "9:00 AM - 10:00 AM",
                  "10:00 AM - 11:00 AM",
                  "11:00 AM - 12:00 PM",
                  "12:00 PM - 1:00 PM",
                  "2:00 PM - 3:00 PM",
                  "3:00 PM - 4:00 PM",
                  "4:00 PM - 5:00 PM",
                ].map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </div>
            {total > 0 && date && time && (
              <div className="bp-hint">
                {total} item{total !== 1 ? "s" : ""} - {date}
              </div>
            )}
            {!isLoggedIn && total > 0 && (
              <div className="bp-login-note">
                Login is required before you can confirm this booking.
              </div>
            )}
            <button
              className="bp-cfm"
              onClick={confirm}
              disabled={total === 0}
              style={{
                opacity: total === 0 ? 0.5 : 1,
                cursor: total === 0 ? "not-allowed" : "pointer",
              }}
            >
              <span>OK</span>{" "}
              {isLoggedIn ? "Confirm Booking" : "Login to Confirm"}
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
                          {item.option} -{" "}
                          {item.mode === "express" ? "Express" : "Regular"}
                        </div>
                        <div className="bp-basket-actions">
                          <button onClick={() => updateBasketQty(item.id, -1)}>
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateBasketQty(item.id, 1)}>
                            +
                          </button>
                          <button
                            className="bp-basket-remove"
                            onClick={() => removeBasketItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="bp-clear" onClick={() => setBasket([])}>
                  Clear Basket
                </button>
              </>
            )}
          </div>
          {isLoggedIn && (
            <div className="bp-panel">
              <div className="booking-header">
                <span className="booking-title">My Bookings</span>
                <button
                  className="history-btn"
                  onClick={() => setShowHistory(true)}
                >
                  View History <span>→</span>
                </button>
              </div>

              {activeBookings.length === 0 ? (
                <p>No bookings yet.</p>
              ) : (
                activeBookings.map((booking) => (
                  <div className="booking-card" key={booking.id}>
                    <div className="booking-top">
                      <h4>Booking #{booking.id}</h4>
                      <span
                        className={`status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p>
                      📅 <strong>Date:</strong>{" "}
                      {formatDate(booking.booking_date)}
                    </p>
                    <p>
                      🕒 <strong>Time:</strong> {booking.booking_time}
                    </p>
                    <p>
                      🧺 <strong>Items:</strong> {booking.items}
                    </p>
                    <p>
                      💰 <strong>Total:</strong> NPR {booking.total_price}
                    </p>
                    {booking.status === "Pending" && (
                      <button
                        className="cancel-booking-btn"
                        onClick={() => {
                          setSelectedBooking(booking.id);
                          setShowCancelModal(true);
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {showHistory && (
          <div className="history-overlay">
            <div className="history-modal">
              <h2>Booking History</h2>

              {historyBookings.length === 0 ? (
                <p>No completed bookings yet.</p>
              ) : (
                historyBookings.map((booking) => (
                  <div className="booking-card" key={booking.id}>
                    <div className="booking-top">
                      <h4>Booking #{booking.id}</h4>

                      <span
                        className={`status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p>
                      <strong>Date:</strong> {formatDate(booking.booking_date)}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.booking_time}
                    </p>
                    <p>
                      <strong>Items:</strong> {booking.items}
                    </p>
                    <p>
                      <strong>Total:</strong> NPR {booking.total_price}
                    </p>
                  </div>
                ))
              )}

              <button
                className="history-close"
                onClick={() => setShowHistory(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {showCancelModal && (
        <div className="cancel-overlay">
          <div className="cancel-modal">
            <div className="cancel-icon">🤔</div>

            <h2>Cancel Booking?</h2>

            <p>Are you sure you want to cancel this booking?</p>

            <p className="cancel-warning">This action cannot be undone.</p>

            <div className="cancel-buttons">
              <button
                className="cancel-no"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Booking
              </button>

              <button
                className="cancel-yes"
                onClick={async () => {
                  await cancelBooking(selectedBooking);
                  setShowCancelModal(false);
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onClose={() =>
          setAlert({
            ...alert,
            show: false,
          })
        }
      />
      <FeedbackSection />
      <Footer />
    </div>
  );
}

export default Book;
