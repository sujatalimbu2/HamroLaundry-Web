import '../assets/CCS/About.css';
import Footer from '../component/Footer';

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-hero-content">
          <div className="about-eyebrow">About Us</div>
          <h1 className="about-title">Hamro Laundry</h1>
          <p className="about-subtitle">Premium laundry and dry cleaning service for your wardrobe</p>
        </div>
      </div>
      
      <div className="about-body">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>We believe in providing reliable, affordable, and convenient laundry services to our community. Your clothes deserve the best care, and we're committed to delivering excellence every single time.</p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Expert Care</h3>
                <p>Professional handling of all fabric types, from delicates to heavy materials.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Convenient Booking</h3>
                <p>Easy online booking with flexible drop-off and pickup times.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Affordable Pricing</h3>
                <p>Competitive rates without compromising on quality.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Quick Turnaround</h3>
                <p>Standard 48-hour service or express 24-hour delivery available.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><strong>Phone:</strong> +977 1 XXXX XXXX</p>
            <p><strong>Email:</strong> info@hamrolaundry.com</p>
            <p><strong>Address:</strong> Kathmandu, Nepal</p>
            <p><strong>Hours:</strong> Monday - Sunday, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
