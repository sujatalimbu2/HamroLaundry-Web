import "../assets/CCS/About.css";
import Footer from "../component/Footer";
import hom1 from "../assets/hom1.png";
import hom2 from "../assets/hom2.png";
import FeedbackSection from "../component/FeedbackSection";
import iron from "../assets/iron.png";
import fold from "../assets/fold.png";
import shi from "../assets/shi.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Us</h1>
          <div className="about-eyebrow">Service you will love</div>
        </div>
      </div>
    <section className="about-service">
  <div className="about-service-img">
    <img src={hom1} alt="Laundry Service" />
  </div>

  <div className="about-service-content">
    <h2>Services you love</h2>
    <span className="about-tag">We think ahead</span>


    <p>
      At Hamro Laundry, we provide professional garment care with attention to
      every detail. From everyday clothing to delicate fabrics, our experienced
      team ensures every item is cleaned, pressed, and returned looking its
      best.
    </p>
  </div>
</section>
      <br></br>
      <div className="services1">
        <div className="service-card1">
          <img src={fold} alt="Quality Service" />
          <h3>Quality Service</h3>
          <p>
            Every garment is cleaned with care using professional equipment and
            quality products.
          </p>
        </div>

        <div className="service-card1">
          <img src={iron} alt="Professional Care" />
          <h3>Professional Care</h3>
          <p>
            We carefully inspect every item to ensure the best cleaning and
            finishing results.
          </p>
        </div>

        <div className="service-card1">
          <img src={shi} alt="Affordable Prices" />
          <h3>Affordable Prices</h3>
          <p>
            Enjoy reliable laundry services at fair prices with no hidden
            charges.
          </p>
        </div>
      </div>

      <div className="about-body">
        <div className="ab-story">
          <div className="ab-imgbox">
            <img src={hom2} alt="about-img" />
          </div>
          <div className="ab-story-txt">
            <h2>
              Started small.
              <br />
              Built on trust.
            </h2>
            <p className="ab-story-p">
              Hamro Laundry began in 2016 with one pressing machine and a
              commitment to treating every garment as if it were our own. Eight
              years on, word of mouth has made us one of Kathmandu's most
              trusted laundry services.
            </p>
            <p className="ab-story-p">
              Hamro Laundry began in 2016 with one pressing machine and a
              commitment to treating every garment as if it were our own. Eight
              years on, word of mouth has made us one of Kathmandu's most
              trusted laundry services. We don't do pickups or delivery —
              because the best results come from a face-to-face conversation,
              where we understand exactly what you need before we begin.
            </p>
            <p className="ab-story-p">
              Our experienced team uses high-quality equipment and carefully
              selected cleaning products to ensure every item receives the
              attention it deserves. Whether it's your everyday clothes, office
              wear, delicate fabrics, or special garments, we focus on
              delivering outstanding cleanliness, freshness, and professional
              care. At Hamro Laundry, our goal is simple: provide reliable,
              affordable, and high-quality laundry services while building
              lasting relationships with our customers through trust,
              consistency, and exceptional service.
            </p>
          </div>
        </div>
        <div className="ab-vals">
          <div className="ab-vals-header">
            <span
              className="h-sm"
              style={{ marginBottom: "12px", display: "block" }}
            >
              Our Values
            </span>
            <h2 className="h-sec-h2">What we stand for.</h2>
          </div>
          <div className="ab-vgrid">
            {[
              {
                ic: "🔬",
                t: "Fabric First",
                d: "Every fabric identified before treatment begins.",
              },
              {
                ic: "🌿",
                t: "Eco Conscious",
                d: "Biodegradable products, safe for your family.",
              },
              {
                ic: "🔒",
                t: "Guaranteed",
                d: "Not satisfied? Free re-clean, no questions.",
              },
              {
                ic: "📲",
                t: "Always in Touch",
                d: "SMS updates throughout your order.",
              },
            ].map((v) => (
              <div className="ab-vcard" key={v.t}>
                <div className="ab-vico">{v.ic}</div>
                <h4>{v.t}</h4>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>

        <div className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>
              <strong>Phone:</strong> +977 1 XXXX XXXX
            </p>
            <p>
              <strong>Email:</strong> info@hamrolaundry.com
            </p>
            <p>
              <strong>Address:</strong> Kathmandu, Nepal
            </p>
            <p>
              <strong>Hours:</strong> Monday - Sunday, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <br></br>
      </div>
      <FeedbackSection />
      <Footer />
    </div>
  );
};

export default About;
