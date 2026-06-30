import { useState } from "react";
import Footer from "../component/Footer";
import "../assets/CCS/Home.css";
import laundry from "../assets/laundry.png";
import arrow from "../assets/arrow.png";
import clothes from "../assets/clothes.png";
import Feedback from "../component/Feedback";


const Home = () => {
    const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div>
      <section className="laundry-section">
        <div className="laundry-content">
          <div className="laundry-images">
            <img src={laundry} alt="laundry" />
          </div>

          <div className="laundry-text">
            <h1>Your laundry service</h1>
            <p>An online Laundry service where you can book.</p>
            <button className="btn-primary">Book Now 
              <img src={arrow} alt="arrow"/>
            </button>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-header">
          <h2>Services</h2>
          <p>Services you will love</p>
        </div>
      </section>
    
      <section className="why-choose-section">
        <div className="why-choose-content">
          <div className="why-choose-image">
            <img src={clothes} alt="clothes" className="clothes-img" />
          </div>
          <div className="why-choose-text">
            <h2>Why choose us ?</h2>
            <p>We prioritize our customers by providing reliable laundry services,<br/>
               careful garment handling, affordable pricing, and a convenient online booking experience.
                Your clothes are treated with care and delivered with quality service.</p>
                <br></br>
                <br></br>
                <br></br>
      
              <div className="h-feat-grid">
                {[
                  {ic:"⚡",t:"Same-Day Express",d:"Drop off by 10 AM, collect the same evening."},
                  {ic:"🌿",t:"Eco-Safe",d:"Non-toxic, biodegradable agents only."},
                  {ic:"🔬",t:"Fabric Experts",d:"We identify fabric type before any treatment."},
                  {ic:"🔒",t:"Guaranteed",d:"Re-clean at no charge, no questions asked."},
                ].map(f=>(
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


         <section className="h-process">
        <div className="h-proc-head">
          <span className="h-sm">How It Works</span>
          <h2 className="h-sec-h2">Three simple steps.</h2>
        </div>
        <div className="h-steps">
          {[
            {n:"01",t:"Book Online",d:"Choose a drop-off date and time that suits your schedule."},
            {n:"02",t:"Drop Off In-Store",d:"Arrive at your slot — we'll be ready and waiting."},
            {n:"03",t:"Collect When Ready",d:"We SMS you when done. Collect at any time."},
          ].map(s=>(
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
          <div><span className="h-sm">Customer Reviews</span><h2 className="h-sec-h2">What they say.</h2></div>
        </div>
        <div className="h-rev-grid">
          {[
            {name:"Priya M.",role:"Regular Customer",text:"I book online, drop off Monday, and collect Tuesday. Outstanding quality every time.",e:"👩"},
            {name:"Rajesh K.",role:"Business Client",text:"My office shirts come back perfectly pressed. The booking takes 30 seconds.",e:"👨"},
            {name:"Anita S.",role:"Home Customer",text:"They called to confirm the fabric before cleaning my lehenga. That care is rare.",e:"👩‍🦱"},
          ].map(r=>(
            <div className="h-rev-card" key={r.name}>
              <div className="h-stars">{[1,2,3,4,5].map(i=><div key={i} className="h-star-svg"/>)}</div>
              <p className="h-rev-text">"{r.text}"</p>
              <div className="h-reviewer">
                <div className="h-rev-av">{r.e}</div>
                <div><div className="h-rev-name">{r.name}</div><div className="h-rev-role">{r.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>
  
      <section className="feedback-section">
      <div className="feedback-content">
        <div className="feedback-text">
          <h2>Visited us recently?</h2>
          <p>
            Share your experience — it helps us improve and helps others choose.
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
      
      <Footer />
    </div>
  );
};

export default Home;
