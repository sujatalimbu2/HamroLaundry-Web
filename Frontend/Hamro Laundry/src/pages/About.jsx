import "../assets/CCS/About.css";
import Footer from "../component/Footer";
import laundh from "../assets/laundh.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Us</h1>
          <div className="about-eyebrow">Service you will love</div>
        </div>
      </div>

      <div className="about-body">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe in providing reliable, affordable, and convenient laundry
            services to our community. Your clothes deserve the best care, and
            we're committed to delivering excellence every single time.
          </p>
        </div>

        <div className="ab-story">
          <div className="ab-imgbox">
            <img src={laundh} alt="about-img" />
          </div>
          <div className="ab-story-txt">
            <span
              className="h-sm"
              style={{ marginBottom: "12px", display: "block" }}
            >
              Our Story
            </span>
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
              We don't do pickups or delivery — because the best results come
              from a face-to-face conversation, where we understand exactly what
              you need before we begin.
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

      <Footer />
    </div>
  );
};

export default About;
