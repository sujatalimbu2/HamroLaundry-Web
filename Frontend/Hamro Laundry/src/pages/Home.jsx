
import Footer from "../component/Footer";
import "../assets/CCS/Home.css";
import laundry from "../assets/laundry.png";
import arrow from "../assets/arrow.png";
import clothes from "../assets/clothes.png";


const Home = () => {
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
            <p1>We think ahead</p1>
            <br></br>
            <p>We prioritize our customers by providing reliable laundry services,<br/>
               careful garment handling, affordable pricing, and a convenient online booking experience.
                Your clothes are treated with care and delivered with quality service.</p>
          </div>
        </div>
      </section>

       <section className="testimonials">
        <div style={{textAlign:"center"}}>
          <span className="section-label">Happy Customers</span>
          <h2 className="section-title">What They Say</h2>
        </div>
        <div className="reviews-grid">
          {[
            {name:"Priya M.",role:"Regular Customer",text:"I book online, drop off Monday morning, and collect Tuesday. The quality is outstanding every single time."},
            {name:"Rajesh K.",role:"Business Client",text:"My office shirts come back perfectly ironed. The booking system is super easy — takes 30 seconds."},
            {name:"Anita S.",role:"Home Customer",text:"They called to confirm the fabric type before cleaning my lehenga. That level of care is unmatched."},
          ].map(r => (
            <div className="review-card" key={r.name}>
              <div className="stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <div className="reviewer">
                <div className="avatar">{r.e}</div>
                <div>
                  <div className="reviewer-name">{r.name}</div>
                  <div className="reviewer-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      
      <section className="how">
        <span className="section-label">Simple Process</span>
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {[
            {n:"1",title:"Book Online",desc:"Choose a drop-off date and time slot that works for you."},
            {n:"2",title:"Drop Off In-Store",desc:"Bring your garments to our counter at your reserved time."},
            {n:"3",title:"Collect When Ready",desc:"We SMS you when done — collect at your convenience."},
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
