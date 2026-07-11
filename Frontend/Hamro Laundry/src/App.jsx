
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Price from "./pages/Price";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Admin from "./pages/Admin";

function App() {
  const [basket, setBasket] = useState([]);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("hamro_user");

      if (!savedUser || savedUser === "undefined") {
        return null;
      }

      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("hamro_user");
      return null;
    }
  });

  const handleLogin = (userData) => {
    localStorage.setItem("hamro_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleUserUpdate = (userData) => {
    const users = JSON.parse(localStorage.getItem("hamro_users") || "[]");
    const updatedUsers = users.map((savedUser) =>
      savedUser.email === userData.email
        ? { ...savedUser, ...userData }
        : savedUser,
    );

    localStorage.setItem("hamro_users", JSON.stringify(updatedUsers));
    localStorage.setItem("hamro_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("hamro_user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <AppShell
        basket={basket}
        setBasket={setBasket}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
    </BrowserRouter>
  );
}

function AppShell({
  basket,
  setBasket,
  user,
  onLogin,
  onLogout,
  onUserUpdate,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const modalRoutes = ["/login", "/register", "/profile"];
  const isModalRoute = modalRoutes.includes(location.pathname);
  const backgroundLocation = location.state?.backgroundLocation;
  const pageLocation = backgroundLocation || location;
  const isAdminPage = location.pathname === "/admin";

  const addToBasket = (item) => {
    setBasket((prev) => {
      const existingItem = prev.find((basketItem) => basketItem.id === item.id);

      if (!existingItem) {
        return [...prev, item];
      }

      return prev.map((basketItem) =>
        basketItem.id === item.id
          ? { ...basketItem, qty: basketItem.qty + item.qty }
          : basketItem,
      );
    });
  };

  const goPrice = () => {
    navigate("/price");
  };

  const goLogin = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };

  return (
    <>
      {/* ✅ NAVBAR ALWAYS SHOWS */}
      {!isAdminPage && <Navbar user={user} onLogout={onLogout} />}

      {/* PAGE CONTENT CHANGES */}
      <Routes location={pageLocation}>
        <Route
          path="/"
          element={<Home basket={basket} setBasket={setBasket} />}
        />
        <Route
          path="/book"
          element={
            <Book
              addToBasket={addToBasket}
              navBasket={basket}
              setBasket={setBasket}
              goPrice={goPrice}
              goLogin={goLogin}
              isLoggedIn={Boolean(user)}
            />
          }
        />
        <Route
          path="/price"
          element={<Price basket={basket} setBasket={setBasket} />}
        />
        <Route
          path="/about"
          element={<About basket={basket} setBasket={setBasket} />}
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admin onAdminLogout={onLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      {isModalRoute && (
        <Routes>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <User user={user} onUserUpdate={onUserUpdate} goLogin={goLogin} />
            }
          />
        </Routes>
      )}

    </>
  );
}

export default App;
