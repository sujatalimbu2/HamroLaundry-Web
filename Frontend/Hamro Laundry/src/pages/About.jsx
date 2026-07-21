import "../assets/CCS/About.css";
import Footer from "../component/Footer";
import hom1 from "../assets/hom1.png";
import hom2 from "../assets/hom2.png";
import FeedbackSection from "../component/FeedbackSection";
import iron from "../assets/iron.png";
import fold from "../assets/fold.png";
import shi from "../assets/shi.png";
import quality from "../assets/bas2.png";
import express from "../assets/time.png";
import pricing from "../assets/mach.png";
import contactImg from "../assets/phone.png";

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
            At Hamro Laundry, we provide professional garment care with
            attention to every detail. From everyday clothing to delicate
            fabrics, our experienced team ensures every item is cleaned,
            pressed, and returned looking its best. Using modern equipment and
            quality cleaning products, we deliver reliable laundry services
            while focusing on customer satisfaction, quality, and affordability
            every step of the way.
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
              commitment to treating every garment with care. Over the years, we
              have earned the trust of customers by providing reliable,
              affordable, and high-quality laundry services. We focus on
              delivering excellent garment care using modern equipment and
              quality cleaning products. Whether it's everyday clothing, office
              wear, or delicate fabrics, every item is handled with attention
              and professionalism. Although we do not offer pickup or delivery
              services, we believe that meeting customers in person helps us
              better understand their requirements and provide the best possible
              results.
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
          <br></br>
          <br></br>
        </div>
        <br></br>
        <br></br>

        <div className="ab-choose">
          <div className="ab-team-header">
            <span
              className="h-sm"
              style={{ marginBottom: "12px", display: "block" }}
            >
              Why Choose Us
            </span>

            <h2 className="h-sec-h2">
              Trusted laundry care
              <br />
              for every garment.
            </h2>
          </div>

          <div className="ab-tgrid">
            {[
              {
                img: quality,
                t: "Quality Cleaning",
                b: "Every garment is cleaned using professional equipment and high-quality products to ensure excellent results.",
              },
              {
                img: express,
                t: "Express Service",
                b: "Need your clothes quickly? Choose our express service for faster turnaround without compromising quality.",
              },
              {
                img: pricing,
                t: "Affordable Pricing",
                b: "Enjoy transparent pricing with reliable service and no hidden charges for every order.",
              },
            ].map((item) => (
              <div className="ab-tcard" key={item.t}>
                <img src={item.img} alt={item.t} className="ab-card-img" />
                <h4>{item.t}</h4>
                <p>{item.b}</p>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="contact-card">
          <div className="contact-left">
            <h2>Contact Us</h2>

            <p>📞 +977 1 XXXX XXXX</p>
            <p>📧 info@hamrolaundry.com</p>
            <p>📍 Kathmandu, Nepal</p>
            <p>🕒 Monday – Sunday | 9:00 AM – 6:00 PM</p>
          </div>
          <div className="contact-right">
    <img src={contactImg} alt="Laundry" />
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
