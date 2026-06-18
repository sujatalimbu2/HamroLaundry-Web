import { useState } from "react";
import "../assets/CCS/Book.css";

import Footer from "../component/Footer";

const checkboxServices = [
  "Wash & Fold",
  "Dry Cleaning",
  "Ironing",
  "Stain Removal",
  "Express Service",
  "Pickup & Drop",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  notes: "",
};

const genRef = () => `BL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const Book = () => {
  const [form, setForm] = useState(initialForm);
  const [selectedServices, setSelectedServices] = useState([]);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");

  const toggle = (service) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  const submit = () => {
    if (!form.name || !form.phone || !form.date || !form.time || selectedServices.length === 0) {
      alert("Please fill all required fields and select at least one service.");
      return;
    }

    setRef(genRef());
    setDone(true);
  };

  const resetForm = () => {
    setDone(false);
    setForm(initialForm);
    setSelectedServices([]);
    setRef("");
  };

  return (
    <div className="book-page">
      <div className="book-wrap">
        <div className="book-info fade-up">
          <span className="book-info-tag">Reserve Your Slot</span>
          <h2>Book a Drop-Off Appointment</h2>
          <p>
            Choose a time, pick your services, and we'll have everything ready when you arrive.
            No queues — your slot is reserved.
          </p>
          <div className="info-steps">
            {[
              { n: "1", t: "Pick Your Date & Time", d: "Select a day and slot that fits your schedule." },
              { n: "2", t: "Choose Services", d: "Tell us what needs cleaning so we're prepared." },
              { n: "3", t: "Drop Off In-Store", d: "Arrive at your booked slot — we'll take it from there." },
              { n: "4", t: "Collect When Ready", d: "We'll SMS you when your order is complete." },
            ].map((step) => (
              <div className="info-step" key={step.n}>
                <div className="info-step-num">{step.n}</div>
                <div className="info-step-body">
                  <h4>{step.t}</h4>
                  <p>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-card fade-up-2">
          {done ? (
            <div className="success-box">
              <div className="big">✓</div>
              <h3>Booking Confirmed!</h3>
              <p>
                Your drop-off slot is reserved. Bring your garments at your selected time — we'll
                SMS you when they're ready for collection.
              </p>
              <div className="ref-tag">{ref}</div>
              <br />
              <button className="btn-submit" onClick={resetForm}>
                Make Another Booking
              </button>
            </div>
          ) : (
            <>
              <h3>Reserve a Slot</h3>
              <p className="sub">All fields marked * are required</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    placeholder="+1 000 000 0000"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Drop-Off Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time Slot *</label>
                  <select
                    value={form.time}
                    onChange={(event) => setForm({ ...form, time: event.target.value })}
                  >
                    <option value="">Select a slot</option>
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 1:00 PM</option>
                    <option>2:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 4:00 PM</option>
                    <option>4:00 PM - 5:00 PM</option>
                  </select>
                </div>
              </div>

              <span className="svc-label">Services Required *</span>
              <div className="svc-grid">
                {checkboxServices.map((service) => (
                  <div
                    key={service}
                    className={`svc-check${selectedServices.includes(service) ? " on" : ""}`}
                    onClick={() => toggle(service)}
                  >
                    <input type="checkbox" readOnly checked={selectedServices.includes(service)} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  placeholder="e.g. delicate fabric, stain on collar, express..."
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                />
              </div>

              <button className="btn-submit" onClick={submit}>
                Confirm Booking →
              </button>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Book;