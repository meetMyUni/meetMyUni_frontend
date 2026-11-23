
import { Link } from "react-router-dom";
import "./HomeFooter.css";

function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="footer-container">

        <div className="footer-about">
          <h2>MeetMyUni<span>.</span></h2>
          <p>
            Your education journey deserves the right guidance.
            Explore opportunities, discover colleges and take
            confident steps towards your future with MeetMyUni.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/study-abroad">Study Abroad</Link>
          <Link to="/online-mba">MBA in India</Link>
          <Link to="/mbbs">MBBS in India</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/study-abroad">Study Destinations</Link>
          <Link to="/online-mba">MBA Colleges</Link>
          <Link to="/mbbs">Medical Colleges</Link>
        </div>

        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <p>Have questions about your education journey?</p>
          <p>Connect with our counselling team.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MeetMyUni. All Rights Reserved.</p>
        <p>Guiding You Towards Your Future.</p>
      </div>
    </footer>
  );
}

export default HomeFooter;
