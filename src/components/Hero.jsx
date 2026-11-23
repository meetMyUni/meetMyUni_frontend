
import ScholarshipForm from "./ScholarshipForm";

function Hero() {
  return (
    <main className="hero-section">
      <div className="hero-left">

        <div className="trust-label">
          ★ TRUSTED BY 5,00,000+ MBA ASPIRANTS ACROSS INDIA
        </div>

        <h1>Online MBA That Fits Your Life</h1>

        <h2>
          UGC-Approved & Affordable Online MBA Programs in India
        </h2>

        <p className="hero-description">
          Study at your own pace, from anywhere. Compare fees,
          NAAC grades, and placement support across India's top
          universities, all in one place.
        </p>

        <div className="stats">
          <div>
            <strong>5 Lakh+</strong>
            <span>STUDENTS GUIDED</span>
          </div>

          <div>
            <strong>1000+</strong>
            <span>TOP UNIVERSITIES</span>
          </div>

          <div>
            <strong>40%+</strong>
            <span>AVG SALARY HIKE</span>
          </div>
        </div>

        <div className="benefits">
          <p>✔ Affordable MBA with Easy EMI Options</p>
          <p>✔ UGC & AICTE Approved Universities Only</p>
          <p>✔ Placement Support with 500+ Hiring Partners</p>
        </div>

      </div>

      <div className="hero-right" id="enquiry">
        <ScholarshipForm />
      </div>
    </main>
  );
}

export default Hero;
