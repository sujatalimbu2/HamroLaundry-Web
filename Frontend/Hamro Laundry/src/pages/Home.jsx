import Navbar from "../component/Navbar";
import "../assets/CCS/Home.css";
import laundry from "../assets/laundry.png";
import arrow from "../assets/arrow.png";
import clothes from "../assets/clothes.png";

const Home = () => {
  return (
    <div>
      <Navbar/>
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
            <p>We think ahead</p>
            <p>We prioritize our customers by providing reliable laundry services,
               careful garment handling, affordable pricing, and a convenient online booking experience.
                Your clothes are treated with care and delivered with quality service.</p>
          </div>
        </div>
      </section>
      <section>
        <div>

        </div>
      </section>
    </div>
  );
};

export default Home;
