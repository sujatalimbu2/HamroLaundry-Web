import Footer from "../component/Footer";
import "../assets/CCS/Home.css";
import open from "../assets/open.png";
import close from "../assets/close.png";
import spin from "../assets/spin.png";
import clothes from "../assets/clothes.png";
import hom1 from "../assets/hom1.png";
import callIcon from "../assets/call.png";
import washIcon from "../assets/Ga.png";
import shirtIcon from "../assets/aff.png";
import ironIcon from "../assets/app.png";
import FeedbackSection from "../component/FeedbackSection";
import { useNavigate } from "react-router-dom";
import side from "../assets/hand.png";
import iron from "../assets/iron.png";
import fold from "../assets/fold.png";
import shi from "../assets/shi.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="laundry-section">
        <div className="laundry-content">
          <div className="washing-animation">
            <img
              src={open}
              alt="open washer"
              className="washer-img washer-left"
            />
            <img
              src={close}
              alt="close washer"
              className="washer-img washer-center"
            />
            <img
              src={spin}
              alt="spin washer"
              className="washer-img washer-right"
            />
          </div>

          <div className="laundry-text">
            <h1>Your laundry service</h1>
            <p>An online Laundry service where you can book.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/book")}>
                Book a Slot
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/price")}
              >
                View Pricing →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-hero">
          <div className="services-hero-left">
            <h2>
              Services<br></br> you will love
            </h2>
            <br></br>
            <span>We think ahead</span>
          </div>

          <div className="services-hero-center">
            <img src={hom1} alt="hom1" />
          </div>

          <div className="services-hero-right">
            <img src={callIcon} alt="Call now" className="services-call-ico" />
            <div className="services-call-number">555-080-201</div>
            <span>Call Now!</span>
          </div>
        </div>

        <div className="services-features">
          {[
            {
              title: "Guaranteed Services",
              icon: washIcon,
              alt: "Guaranteed services",
            },
            {
              title: "Affordable Price",
              icon: shirtIcon,
              alt: "Affordable price",
            },
            {
              title: "Pick Up & Delivery Free",
              icon: ironIcon,
              alt: "Pick up and delivery",
            },
          ].map((item) => (
            <div className="services-feature" key={item.title}>
              <div className="services-feature-ico">
                <img src={item.icon} alt={item.alt} />
              </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>

      <section className="why-choose-section">
        <div className="why-choose-content">
          <div className="why-choose-image">
            <img src={clothes} alt="clothes" className="img-clothes" />
          </div>
          <div className="why-choose-text">
            <h2>Why choose us ?</h2>
            <p>
              We prioritize our customers by providing reliable laundry
              services,
              <br />
              careful garment handling, affordable pricing, and a convenient
              online booking experience. Your clothes are treated with care and
              delivered with quality service.
            </p>
            <br></br>
            <br></br>
            <br></br>

            <div className="h-feat-grid">
              {[
                {
                  ic: "⚡",
                  t: "Same-Day Express",
                  d: "Drop off by 10 AM, collect the same evening.",
                },
                {
                  ic: "🌿",
                  t: "Eco-Safe",
                  d: "Non-toxic, biodegradable agents only.",
                },
                {
                  ic: "🔬",
                  t: "Fabric Experts",
                  d: "We identify fabric type before any treatment.",
                },
                {
                  ic: "🔒",
                  t: "Guaranteed",
                  d: "Re-clean at no charge, no questions asked.",
                },
              ].map((f) => (
                <div className="h-feat" key={f.t}>
                  <div className="h-feat-ico">{f.ic}</div>
                  <h4>{f.t}</h4>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="side-section">
        <div>
          <div className="side-left">
            <img src={side} alt="side" />
          </div>
          <div>
            <div className="services">
              <div className="service-card">
                <img src={fold} alt="Guaranteed Services" />
                <h3>Guaranteed Services</h3>
                <p>
                  We provide professional laundry services with quality care and
                  attention to every garment.
                </p>
              </div>

              <div className="service-card">
                <img src={iron} alt="Always Open" />
                <h3>Always Open</h3>
                <p>
                  Book your laundry anytime. Our online service is available
                  24/7 for your convenience.
                </p>
              </div>

              <div className="service-card">
                <img src={shi} alt="Free Pickup" />
                <h3>Affordable Prices</h3>
                <p>
                  Enjoy high-quality laundry services at reasonable prices with
                  no hidden charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-process">
        <div className="h-proc-head">
          <span className="h-sm">How It Works</span>
          <h2 className="h-sec-h2">Three simple steps.</h2>
        </div>
        <div className="h-steps">
          {[
            {
              n: "01",
              t: "Book Online",
              d: "Choose a drop-off date and time that suits your schedule.",
            },
            {
              n: "02",
              t: "Drop Off In-Store",
              d: "Arrive at your slot — we'll be ready and waiting.",
            },
            {
              n: "03",
              t: "Collect When Ready",
              d: "We SMS you when done. Collect at any time.",
            },
          ].map((s) => (
            <div className="h-step" key={s.n}>
              <div className="h-step-num">{s.n}</div>
              <div className="h-step-h">{s.t}</div>
              <p className="h-step-p">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="h-reviews">
        <div className="h-rev-header">
          <div>
            <span className="h-sm">Customer Reviews</span>
            <h2 className="h-sec-h2">What they say.</h2>
          </div>
        </div>
        <div className="h-rev-grid">
          {[
            {
              name: "Priya M.",
              role: "Regular Customer",
              text: "I book online, drop off Monday, and collect Tuesday. Outstanding quality every time.",
            },
            {
              name: "Rajesh K.",
              role: "Business Client",
              text: "My office shirts come back perfectly pressed. The booking takes 30 seconds.",
            },
            {
              name: "Anita S.",
              role: "Home Customer",
              text: "They called to confirm the fabric before cleaning my lehenga. That care is rare.",
            },
          ].map((r) => (
            <div className="h-rev-card" key={r.name}>
              <div className="h-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-star-svg" />
                ))}
              </div>
              <p className="h-rev-text">"{r.text}"</p>
              <div className="h-reviewer">
                <div>
                  <div className="h-rev-name">{r.name}</div>
                  <div className="h-rev-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <FeedbackSection />
      <Footer />
    </div>
  );
};

export default Home;
