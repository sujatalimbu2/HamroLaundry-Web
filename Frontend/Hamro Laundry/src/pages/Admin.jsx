import { useNavigate } from "react-router-dom";
import "../assets/CCS/Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard({ onAdminLogout }) {
  const navigate = useNavigate();
  const [view, setView] = useState("overview");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [showServiceEdit, setShowServiceEdit] = useState(false);
  const [editService, setEditService] = useState(null);

  const COLORS = ["#fbbf24", "#3b82f6", "#8b5cf6", "#22c55e", "#ef4444"];

  const updateService = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/services/${editService.id}`,
        editService,
      );

      getServices();

      setShowServiceEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateBooking = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/booking/${editBooking.id}`,
        editBooking,
      );

      await getBookings();

      setShowEdit(false);

      setEditBooking(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers");
      console.log(res.data);
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getBookings(), getCustomers(), getServices()]);
    };

    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/booking/${id}`, {
        status,
      });

      getBookings(); // refresh table
    } catch (err) {
      console.log(err);
    }
  };
  const filteredServices = services.filter((s) =>
    s.service_name.toLowerCase().includes(serviceSearch.toLowerCase()),
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.total_price || 0),
    0,
  );
  const statusData = [
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
    },
    {
      name: "Processing",
      value: bookings.filter((b) => b.status === "Processing").length,
    },
    {
      name: "Ready",
      value: bookings.filter((b) => b.status === "Ready").length,
    },
    {
      name: "Completed",
      value: bookings.filter((b) => b.status === "Completed").length,
    },
    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "Cancelled").length,
    },
  ];
  const activeCount = bookings.filter((b) => b.status === "Processing").length;
  const readyCount = bookings.filter((b) => b.status === "Ready").length;

  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "bookings", label: "Bookings", icon: "📅" },
    { id: "orders", label: "Orders", icon: "🧺" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "services", label: "Services", icon: "💲" },
  ];

  const handleLogout = () => {
    if (onAdminLogout) onAdminLogout();
    navigate("/");
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      b.items &&
      b.items.trim() !== "",
  );

  const activeOrders = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      b.status !== "Completed" &&
      b.status !== "Cancelled" &&
      b.items &&
      b.items !== "-" &&
      b.items !== "[]" &&
      b.items.trim() !== "",
  );

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-side-head">
          <div className="adm-side-logo">
            <div className="adm-side-mark">HL</div>Hamro Laundry
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
              {view === "services" && "Manage service categories and pricing"}
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
                  <div className="adm-stat-num">
                    NPR {totalRevenue.toLocaleString()}
                  </div>
                  <div className="adm-stat-lbl">Total Revenue</div>
                </div>
                <div className="adm-stat">
                  <div className="adm-stat-top">
                    <div className="adm-stat-ico">📅</div>
                    <span className="adm-stat-delta">+5%</span>
                  </div>
                  <div className="adm-stat-num">{bookings.length}</div>
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
                  <h3>Bokoing Distribution</h3>
                </div>

                <div style={{ width: "100%", height: 311 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                      >
                        {statusData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
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
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Status</th>
                        <th>Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 4).map((b) => (
                        <tr key={b.id}>
                          <td className="adm-ref">{b.id}</td>
                          <td>{b.name}</td>
                          <td>
                            {new Date(b.booking_date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td>
                            <span className="adm-mode-tag">
                              {b.service_mode.charAt(0).toUpperCase() +
                                b.service_mode.slice(1)}
                            </span>
                          </td>
                          <td>
                            <span className="adm-pill">{b.status}</span>
                          </td>
                          <td>{b.items || "-"}</td>
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
                  placeholder="Search by customer name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>ID</th>
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
                      <tr>
                        <td colSpan="10" className="adm-empty-row">
                          No bookings found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id}>
                          <td className="adm-ref">{b.id}</td>
                          <td>{b.name}</td>
                          <td>{b.contact}</td>
                          <td>
                            {new Date(b.booking_date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td>{b.booking_time}</td>
                          <td>{b.items || "-"}</td>
                          <td>
                            <span className="adm-mode-tag">
                              {b.service_mode}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="adm-pill">{b.status}</span>
                          </td>
                          <td>NPR {b.total_price}</td>
                          <td>
                            <div className="adm-row-actions">
                              <button
                                className="adm-act-btn"
                                onClick={() => {
                                  setSelectedBooking(b);
                                  setShowView(true);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="adm-act-btn"
                                onClick={() => {
                                  setEditBooking({ ...b });
                                  setShowEdit(true);
                                }}
                              >
                                Update
                              </button>
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
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrders.map((b) => (
                      <tr key={b.id}>
                        <td className="adm-ref">{b.id}</td>
                        <td>{b.name}</td>
                        <td>{b.items || "-"}</td>
                        <td>
                          <span className="adm-pill">{b.status}</span>
                        </td>
                        <td>
                          <div className="adm-row-actions">
                            {b.status === "Pending" && (
                              <button
                                className="adm-act-btn"
                                onClick={() => updateStatus(b.id, "Processing")}
                              >
                                Processing
                              </button>
                            )}

                            {b.status === "Processing" && (
                              <button
                                className="adm-act-btn"
                                onClick={() => updateStatus(b.id, "Ready")}
                              >
                                Ready
                              </button>
                            )}

                            {b.status === "Ready" && (
                              <button
                                className="adm-act-btn"
                                onClick={() => updateStatus(b.id, "Completed")}
                              >
                                Completed
                              </button>
                            )}
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
                      <th>Name</th>
                      <th>contact</th>
                      <th>Email</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="adm-empty-row">
                          No customers found.
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((c) => (
                        <tr key={c.email}>
                          <td>
                            <div className="adm-cust-cell">
                              <div className="adm-cust-av">
                                {c.name.charAt(0)}
                              </div>
                              {c.name}
                            </div>
                          </td>
                          <td>{c.contact}</td>
                          <td>{c.email}</td>
                          <td>NPR {c.total_spent}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* service */}
          {view === "services" && (
            <div className="adm-panel">
              <div className="adm-panel-head">
                <h3>Manage Services</h3>
                <input
                  className="adm-search"
                  placeholder="Search service..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                />
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Service</th>
                      <th>Standard</th>
                      <th>Express</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredServices.map((service) => (
                      <tr key={service.id}>
                        <td>{service.category}</td>

                        <td>{service.service_name}</td>

                        <td>NPR {service.standard_price}</td>

                        <td>NPR {service.express_price}</td>

                        <td>
                          <button
                            className="adm-act-btn"
                            onClick={() => {
                              setEditService({ ...service });
                              setShowServiceEdit(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>{" "}
        {/* adm-body */}
      </div>{" "}
      {/* adm-main */}
      {showView && selectedBooking && (
        <div className="adm-modal-overlay">
          <div className="adm-modal adm-view-modal">
            <div className="adm-modal-header">
              <h2>Booking #{selectedBooking.id}</h2>
              <p>Customer Booking Details</p>
            </div>

            <div className="adm-modal-body">
              <div className="adm-card">
                <h3>Customer Information</h3>

                <div className="adm-row">
                  <span>Name</span>
                  <strong>{selectedBooking.name}</strong>
                </div>

                <div className="adm-row">
                  <span>Phone</span>
                  <strong>{selectedBooking.contact}</strong>
                </div>

                <div className="adm-row">
                  <span>Email</span>
                  <strong>{selectedBooking.email}</strong>
                </div>
              </div>

              <div className="adm-card">
                <h3>Booking Information</h3>

                <div className="adm-row">
                  <span>Date</span>

                  <strong>
                    {new Date(selectedBooking.booking_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </strong>
                </div>

                <div className="adm-row">
                  <span>Time</span>
                  <strong>{selectedBooking.booking_time}</strong>
                </div>

                <div className="adm-row">
                  <span>Service</span>
                  <strong>{selectedBooking.service_mode}</strong>
                </div>
              </div>

              <div className="adm-card">
                <h3>Laundry Items</h3>

                <div className="adm-items">
                  {selectedBooking.items || "No items"}
                </div>
              </div>

              <div className="adm-card">
                <div className="adm-row">
                  <span>Total Amount</span>

                  <h2 className="adm-total">
                    NPR {selectedBooking.total_price}
                  </h2>
                </div>

                <div className="adm-row">
                  <span>Status</span>

                  <span
                    className={`adm-status ${selectedBooking.status.toLowerCase()}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="adm-modal-footer">
              <button
                className="adm-close-btn"
                onClick={() => setShowView(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showServiceEdit && editService && (
        <div className="adm-modal-overlay">
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2>Edit Service</h2>
              <span>Update the pricing and details for this service.</span>
            </div>

            <div className="adm-modal-body adm-form-stack">
              <div className="adm-field-grid">
                <div className="adm-field">
                  <label>Category</label>
                  <input
                    value={editService.category}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        category: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="adm-field">
                  <label>Service</label>
                  <input
                    value={editService.service_name}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        service_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="adm-field-grid">
                <div className="adm-field">
                  <label>Standard Price</label>
                  <input
                    type="number"
                    value={editService.standard_price}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        standard_price: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="adm-field">
                  <label>Express Price</label>
                  <input
                    type="number"
                    value={editService.express_price}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        express_price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="adm-modal-actions">
              <button className="adm-primary-btn" onClick={updateService}>
                Save Changes
              </button>

              <button
                className="adm-secondary-btn"
                onClick={() => setShowServiceEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEdit && editBooking && (
        <div className="adm-modal-overlay">
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2>Edit Booking</h2>
              <span>
                Adjust the booking schedule, service type, and status.
              </span>
            </div>

            <div className="adm-modal-body adm-form-stack">
              <div className="adm-field-grid">
                <div className="adm-field">
                  <label>Date</label>

                  <input
                    type="date"
                    value={
                      editBooking.booking_date
                        ? editBooking.booking_date.slice(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      setEditBooking({
                        ...editBooking,
                        booking_date: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="adm-field">
                  <label>Time</label>

                  <input
                    value={editBooking.booking_time}
                    onChange={(e) =>
                      setEditBooking({
                        ...editBooking,
                        booking_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="adm-field-grid">
                <div className="adm-field">
                  <label>Service Mode</label>

                  <select
                    value={editBooking.service_mode}
                    onChange={(e) =>
                      setEditBooking({
                        ...editBooking,
                        service_mode: e.target.value,
                      })
                    }
                  >
                    <option value="Regular">Regular</option>

                    <option value="Express">Express</option>
                  </select>
                </div>

                <div className="adm-field">
                  <label>Status</label>

                  <select
                    value={editBooking.status}
                    onChange={(e) =>
                      setEditBooking({
                        ...editBooking,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Ready</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="adm-modal-actions">
              <button className="adm-primary-btn" onClick={updateBooking}>
                Save Changes
              </button>

              <button
                className="adm-secondary-btn"
                onClick={() => {
                  setShowEdit(false);
                  setEditBooking(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
