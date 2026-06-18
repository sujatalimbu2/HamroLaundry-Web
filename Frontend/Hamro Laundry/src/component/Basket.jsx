import "../assets/CCS/Basket.css";
function Basket({ basket, setBasket, onClose }) {
  const parseNPR = (s) =>
    parseInt((s || "").replace(/[^0-9]/g, "")) || 0;

  const updateQty = (id, change) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setBasket((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const totalItems = basket.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalPrice = basket.reduce(
    (sum, item) =>
      sum + parseNPR(item.price) * item.qty,
    0
  );

  return (
    <>
      {/* BACKDROP */}
      <div
        className="overlay-backdrop"
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div className="basket-drawer">
        {/* HEADER */}
        <div className="drawer-header">
          <div>
            <h2>🧺 Your Basket</h2>
            <p>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            className="drawer-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="drawer-body">
          {basket.length === 0 ? (
            <div className="basket-empty">
              <div style={{ fontSize: "40px" }}>🧺</div>
              <p>Your basket is empty</p>
              <small>
                Add laundry services from Book page
              </small>
            </div>
          ) : (
            basket.map((item) => (
              <div
                className="basket-item"
                key={item.id}
              >
                <div className="basket-icon">
                  {item.icon || "🧺"}
                </div>

                <div className="basket-info">
                  <h4>{item.name}</h4>

                  <p>
                    {item.option || ""}
                    {item.mode &&
                      ` • ${
                        item.mode === "express"
                          ? "Express"
                          : "Regular"
                      }`}
                  </p>

                  <div className="qty-box">
                    <button
                      onClick={() =>
                        updateQty(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item.id, 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="price">
                  NPR{" "}
                  {(
                    parseNPR(item.price) *
                    item.qty
                  ).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {basket.length > 0 && (
          <div className="drawer-footer">
            <div className="row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="row total">
              <span>Total Price</span>
              <span>
                NPR {totalPrice.toLocaleString()}
              </span>
            </div>

            <button className="checkout-btn">
              Proceed to Confirm →
            </button>

            <button
              className="clear-btn"
              onClick={() => setBasket([])}
            >
              Clear Basket
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Basket;