import "../assets/CCS/AlertModal.css";

function AlertModal({ show, title, message, onClose }) {
  if (!show) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <div className="alert-icon">
          {title === "Success"
            ? "🥳"
            : title === "Alert"
              ? "⚠️"
              : title === "Error"
                ? "❌"
                : "ℹ️"}
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default AlertModal;
