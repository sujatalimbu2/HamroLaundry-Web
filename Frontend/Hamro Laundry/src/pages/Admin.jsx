import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CCS/Admin.css";
 
/* ── Sample data — replace with real API data in production ── */
const adminBookings = [
  { ref: "FF-A3XP2", customer: "Priya M.", phone: "+977 98XXXXXX21", date: "28 May 2026", time: "10:00 AM – 11:00 AM", items: ["Dry Cleaning ×2", "Ironing ×3"], mode: "Express", status: "r", lbl: "Ready to Collect", total: "NPR 750" },
  { ref: "FF-B9QT7", customer: "Rajesh K.", phone: "+977 98XXXXXX45", date: "27 May 2026", time: "2:00 PM – 3:00 PM", items: ["Wash & Fold ×1", "Bedding ×1"], mode: "Regular", status: "p", lbl: "In Progress", total: "NPR 900" },
  { ref: "FF-C1LK4", customer: "Anita S.", phone: "+977 98XXXXXX09", date: "25 May 2026", time: "9:00 AM – 10:00 AM", items: ["Suit Jacket", "Shirt ×2"], mode: "Regular", status: "c", lbl: "Collected", total: "NPR 700" },
  { ref: "FF-D8MN3", customer: "Bikash T.", phone: "+977 98XXXXXX77", date: "24 May 2026", time: "11:00 AM – 12:00 PM", items: ["Leather Jacket ×1"], mode: "Express", status: "p", lbl: "In Progress", total: "NPR 2,000" },
  { ref: "FF-E5QW8", customer: "Sunita R.", phone: "+977 98XXXXXX33", date: "22 May 2026", time: "4:00 PM – 5:00 PM", items: ["Curtains ×6"], mode: "Regular", status: "c", lbl: "Collected", total: "NPR 270" },
];
 
const adminCustomers = [
  { name: "Priya M.", phone: "+977 98XXXXXX21", email: "priya@example.com", orders: 14, spent: "NPR 9,450", joined: "Jan 2025" },
  { name: "Rajesh K.", phone: "+977 98XXXXXX45", email: "rajesh@example.com", orders: 8, spent: "NPR 6,200", joined: "Mar 2025" },
  { name: "Anita S.", phone: "+977 98XXXXXX09", email: "anita@example.com", orders: 21, spent: "NPR 18,300", joined: "Aug 2024" },
  { name: "Bikash T.", phone: "+977 98XXXXXX77", email: "bikash@example.com", orders: 3, spent: "NPR 4,100", joined: "May 2026" },
  { name: "Sunita R.", phone: "+977 98XXXXXX33", email: "sunita@example.com", orders: 11, spent: "NPR 7,650", joined: "Nov 2025" },
];
 
export default function AdminDashboard({ onAdminLogout }) {
  const navigate = useNavigate();
  const [view, setView] = useState("overview");
  const [search, setSearch] = useState("");
 
  const filteredBookings = adminBookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.ref.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCustomers = adminCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );
 
  const totalRevenue = adminBookings.reduce(
    (s, b) => s + (parseInt(b.total.replace(/[^0-9]/g, "")) || 0),
    0
  );
  const activeCount = adminBookings.filter((b) => b.status === "p").length;
  const readyCount = adminBookings.filter((b) => b.status === "r").length;
 
  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "bookings", label: "Bookings", icon: "📅" },
    { id: "orders", label: "Orders", icon: "🧺" },
    { id: "customers", label: "Customers", icon: "👥" },
  ];
 
  const handleLogout = () => {
    if (onAdminLogout) onAdminLogout();
    navigate("/");
  };
 
  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-side-head">
          <div className="adm-side-logo">
            <div className="adm-side-mark">FF</div>FreshFold
          </div>
          <div className="adm-side-tag">Admin Panel</div>
        </div>
        <nav className="adm-nav">
          {navItems.map((n) => (
            <button
              key={n.id}
              className={`adm-nav-item${view === n.id ? " on" : ""}`}
              onClick={() => setView(n.id)}
            >
              <span className="adm-nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="adm-side-foot">
          <button className="adm-logout" onClick={handleLogout}>
            <span className="adm-nav-icon">←</span>Exit to Site
          </button>
        </div>
      </aside>
 
      <div className="adm-main">
        <div className="adm-topbar">
          <div>
            <h1>{navItems.find((n) => n.id === view)?.label}</h1>
            <div className="adm-topbar-sub">
              {view === "overview" && "Snapshot of today's business"}
              {view === "bookings" && "All customer drop-off bookings"}
              {view === "orders" && "Track order progress"}
              {view === "customers" && "Manage your customer base"}
            </div>
          </div>
          <div className="adm-admin-chip">
            <div className="adm-admin-av">A</div>
            <span className="adm-admin-name">Admin</span>
          </div>
        </div>
 
        <div className="adm-body">
          {/* OVERVIEW */}
          {view === "overview" && (
            <>
              <div className="adm-stats">
                <div className="adm-stat">
                  <div className="adm-stat-top">
                    <div className="adm-stat-ico">💰</div>
                    <span className="adm-stat-delta">+12%</span>
                  </div>
                  <div className="adm-stat-num">NPR {totalRevenue.toLocaleString()}</div>
                  <div className="adm-stat-lbl">Total Revenue (sample)</div>
                </div>
                <div className="adm-stat">
                  <div className="adm-stat-top">
                    <div className="adm-stat-ico">📅</div>
                    <span className="adm-stat-delta">+5%</span>
                  </div>
                  <div className="adm-stat-num">{adminBookings.length}</div>
                  <div className="adm-stat-lbl">Total Bookings</div>
                </div>
                <div className="adm-stat">
                  <div className="adm-stat-top">
                    <div className="adm-stat-ico">⏳</div>
                  </div>
                  <div className="adm-stat-num">{activeCount}</div>
                  <div className="adm-stat-lbl">In Progress</div>
                </div>
                <div className="adm-stat">
                  <div className="adm-stat-top">
                    <div className="adm-stat-ico">✅</div>
                  </div>
                  <div className="adm-stat-num">{readyCount}</div>
                  <div className="adm-stat-lbl">Ready to Collect</div>
                </div>
              </div>
 
              <div className="adm-panel">
                <div className="adm-panel-head">
                  <h3>Recent Bookings</h3>
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Ref</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminBookings.slice(0, 4).map((b) => (
                        <tr key={b.ref}>
                          <td className="adm-ref">{b.ref}</td>
                          <td>{b.customer}</td>
                          <td>{b.date}</td>
                          <td><span className="adm-mode-tag">{b.mode}</span></td>
                          <td><span className={`adm-pill ${b.status}`}>{b.lbl}</span></td>
                          <td>{b.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
 
          {/* BOOKINGS */}
          {view === "bookings" && (
            <div className="adm-panel">
              <div className="adm-panel-head">
                <h3>All Bookings</h3>
                <input
                  className="adm-search"
                  placeholder="Search by name or ref…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Items</th>
                      <th>Mode</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr><td colSpan="10" className="adm-empty-row">No bookings found.</td></tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.ref}>
                          <td className="adm-ref">{b.ref}</td>
                          <td>{b.customer}</td>
                          <td>{b.phone}</td>
                          <td>{b.date}</td>
                          <td>{b.time}</td>
                          <td>{b.items.join(", ")}</td>
                          <td><span className="adm-mode-tag">{b.mode}</span></td>
                          <td><span className={`adm-pill ${b.status}`}>{b.lbl}</span></td>
                          <td>{b.total}</td>
                          <td>
                            <div className="adm-row-actions">
                              <button className="adm-act-btn">View</button>
                              <button className="adm-act-btn">Update</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
 
          {/* ORDERS */}
          {view === "orders" && (
            <div className="adm-panel">
              <div className="adm-panel-head">
                <h3>Order Status Tracker</h3>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminBookings.map((b) => (
                      <tr key={b.ref}>
                        <td className="adm-ref">{b.ref}</td>
                        <td>{b.customer}</td>
                        <td>{b.items.join(", ")}</td>
                        <td><span className={`adm-pill ${b.status}`}>{b.lbl}</span></td>
                        <td>
                          <div className="adm-row-actions">
                            <button className="adm-act-btn">In Progress</button>
                            <button className="adm-act-btn">Ready</button>
                            <button className="adm-act-btn">Collected</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
 
          {/* CUSTOMERS */}
          {view === "customers" && (
            <div className="adm-panel">
              <div className="adm-panel-head">
                <h3>Customer Directory</h3>
                <input
                  className="adm-search"
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr><td colSpan="6" className="adm-empty-row">No customers found.</td></tr>
                    ) : (
                      filteredCustomers.map((c) => (
                        <tr key={c.email}>
                          <td>
                            <div className="adm-cust-cell">
                              <div className="adm-cust-av">{c.name.charAt(0)}</div>
                              {c.name}
                            </div>
                          </td>
                          <td>{c.phone}</td>
                          <td>{c.email}</td>
                          <td>{c.orders}</td>
                          <td>{c.spent}</td>
                          <td>{c.joined}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 