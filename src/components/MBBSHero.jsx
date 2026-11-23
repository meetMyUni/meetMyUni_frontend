
import MBBSForm from "./MBBSForm";

function MBBSHero() {
  return (
    <main className="hero-section ">
      <div className="hero-left">

        <div className="trust-label">
          ★ YOUR FUTURE IN MEDICINE STARTS HERE
        </div>

        <h1>Turn Your Dream of Becoming a Doctor Into Reality</h1>

        <h2>
          Explore Top MBBS Colleges & Medical Admissions in India
        </h2>

        <p className="hero-description">
          Find the right medical college for your future.
          Explore MBBS admission opportunities, compare colleges,
          and get expert guidance throughout your admission journey.
        </p>

        <div className="stats">
          <div>
            <strong>700+</strong>
            <span>MEDICAL COLLEGES</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>UNIVERSITIES</span>
          </div>

          <div>
            <strong>Expert</strong>
            <span>ADMISSION GUIDANCE</span>
          </div>
        </div>

        <div className="benefits">
          <p>✔ Guidance for MBBS Admissions in India</p>
          <p>✔ Support in Selecting the Right Medical College</p>
          <p>✔ Personalised Admission Counselling</p>
        </div>

      </div>

      <div className="hero-right" id="enquiry">
        <MBBSForm />
      </div>
    </main>
  );
}

export default MBBSHero;
