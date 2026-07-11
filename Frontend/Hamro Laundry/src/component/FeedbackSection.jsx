import { useState } from "react";
import Feedback from "../component/Feedback";
import "../assets/CCS/Feedback.css";
function FeedbackSection() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <section className="feedback-section">
        <div className="feedback-content">
          <div className="feedback-text">
            <h2>Visited us recently?</h2>
            <p>
              Share your experience — it helps us improve and helps others
              choose.
            </p>
          </div>

          <button
            className="feedback-btn"
            onClick={() => setShowFeedback(true)}
          >
            💬 Leave a Review
          </button>
        </div>
      </section>

      {showFeedback && (
        <Feedback onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
}

export default FeedbackSection;