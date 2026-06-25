import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
      <AppShell
        basket={basket}
        setBasket={setBasket}
        showBasket={showBasket}
        setShowBasket={setShowBasket}
      />
    </BrowserRouter>
  );
}

function AppShell({ basket, setBasket, showBasket, setShowBasket }) {
  const navigate = useNavigate();

  const addToBasket = (item) => {
    setBasket((prev) => [...prev, item]);
  };

  const goPrice = () => {
    navigate("/price");
  };

  return (
    <>

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
          element={
            <Book
              addToBasket={addToBasket}
              navBasket={basket}
              goPrice={goPrice}
            />
          }
        />
        <Route path="/price" element={<Price basket={basket} setBasket={setBasket} />} />
        <Route path="/about" element={<About basket={basket} setBasket={setBasket} />} />
      </Routes>

      {/* SIDEBAR BASKET */}
      {showBasket && (
        <Basket
          basket={basket}
          setBasket={setBasket}
          onClose={() => setShowBasket(false)}
        />
      )}
    </>
  );
}

export default App;
