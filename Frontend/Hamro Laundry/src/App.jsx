import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Price from "./pages/Price";
import About from "./pages/About";
import Basket from "./component/Basket";


function App() {
  const [basket, setBasket] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  return (
    <BrowserRouter>

      {/* ✅ NAVBAR ALWAYS SHOWS */}
      <Navbar
        basket={basket}
        setShowBasket={setShowBasket}
      />

      {/* PAGE CONTENT CHANGES */}
      <Routes>
        <Route
          path="/"
          element={<Home basket={basket} setBasket={setBasket} />}
        />
        <Route
          path="/book"
          element={<Book basket={basket} setBasket={setBasket} />}
        />
        <Route path="/price" element={<Price />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* SIDEBAR BASKET */}
      {showBasket && (
        <Basket
          basket={basket}
          setBasket={setBasket}
          onClose={() => setShowBasket(false)}
        />
      )}

    </BrowserRouter>
  );
}

export default App;
