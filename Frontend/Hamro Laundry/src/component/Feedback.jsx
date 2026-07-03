import "../assets/CCS/Feedback.css";
import { useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

function Feedback({onClose}){
  const [rating,setRating]=useState(0);
  const [hover,setHover]=useState(0);
  const [chips,setChips]=useState([]);
  const [text,setText]=useState("");
  const [done,setDone]=useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const svcs=["Dry Cleaning","Wash & Fold","Ironing","Bedding","Leather","Alterations"];
  const lbl=["","Poor","Fair","Good","Great","Excellent!"];
 
      const submit = async () => {

          if (!rating) {
          setMessage("Please select a rating.");
          setMessageType("error");
          return;
        }
         if (!text.trim()) {
        setMessage("Please write a short review.");
        setMessageType("error");
        return;
        }
       
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/feedback",
                {
                    rating,
                    services: chips,
                    review: text
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Feedback submitted successfully!");
            setMessageType("success");
            setTimeout(() => {
                setMessage("");
            }, 3000);


            setDone(true);

        } catch (error) {
          setMessage(
            error.response?.data?.message ||
            "Failed to submit feedback."
        );
        setMessageType("error");

      }

    };
    return (
  <>
    <div className="backdrop" onClick={onClose} />

    <div className="pm-wrap">
      <div className="fb-modal">

        {!done ? (
          <>
            <div className="fb-head">
              <button className="pm-close" onClick={onClose}>✕</button>

              <h3>Leave a Review</h3>
              <p>Share your Hamro Laundry experience</p>
            </div>

            <div className="fb-body">

              {message && (
                <div className={`fb-message ${messageType}`}>
                  {message}
                </div>
              )}

              <span className="fb-lbl">
                Rating {rating > 0 && `— ${lbl[rating]}`}
              </span>

              <div className="fb-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`fb-star ${(hover || rating) >= n ? "lit" : ""}`}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              <span className="fb-lbl">Services Used</span>

              <div className="fb-chips">
                {svcs.map((s) => (
                  <div
                    key={s}
                    className={`fb-chip ${chips.includes(s) ? "on" : ""}`}
                    onClick={() =>
                      setChips((p) =>
                        p.includes(s)
                          ? p.filter((x) => x !== s)
                          : [...p, s]
                      )
                    }
                  >
                    {s}
                  </div>
                ))}
              </div>

              <span className="fb-lbl">Your Review *</span>

              <textarea
                className="fb-ta"
                placeholder="Tell us about your experience..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button className="fb-sub" onClick={submit}>
                Submit Review →
              </button>

            </div>
          </>
        ) : (
          <div className="fb-success">

        <div className="fb-success-icon">
            <FaCheckCircle />
        </div>

        <h2>Thank You!</h2>

        <p>
            Your feedback helps us improve our laundry service.
        </p>

        <button className="fb-sub" onClick={onClose}>
            Close
        </button>

         </div>
        )}

      </div>
    </div>
  </>
);
  
}

export default Feedback;