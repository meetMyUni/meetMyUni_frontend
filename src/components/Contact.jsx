
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    topic: "",
    query: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409 || result.duplicate) {
          toast.warning(result.message || "You have already submitted this query.");
        } else {
          toast.error(result.message || "Unable to submit your query.");
        }
        return;
      }

      toast.success(
        result.message || "Your query has been submitted successfully!"
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        topic: "",
        query: ""
      });

    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span className="contact-tag">MEETMYUNI SUPPORT</span>
        <h1>We're Here to Help You!</h1>
        <p>
          Have a question about MBA admissions, universities, or your
          application? Tell us what you need help with.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Let's Talk</h2>
          <p>
            Every question matters. Share your query and our support team
            will get back to you.
          </p>

          <div className="contact-info-item">
            <span>✉</span>
            <div>
              <h3>Email Support</h3>
              <p>support@meetmyuni.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>✓</span>
            <div>
              <h3>Personalised Assistance</h3>
              <p>Get guidance for your MBA journey.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span>🔒</span>
            <div>
              <h3>Your Details Are Safe</h3>
              <p>We use your information to respond to your query.</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send Us Your Query</h2>
          <p className="contact-form-subtitle">
            Fill in the details below. All fields are required.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="contact-input-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                maxLength="10"
                title="Enter a valid 10-digit Indian mobile number"
                required
              />
            </div>

            <div className="contact-input-group">
              <label htmlFor="topic">What is your query about?</label>
            
<select
  id="topic"
  name="topic"
  value={formData.topic}
  onChange={handleChange}
  required
>
  <option value="">Select a topic</option>
  <option value="Study Abroad">Study Abroad</option>
  <option value="MBA">MBA</option>
  <option value="MBBS">MBBS</option>
  <option value="University / College Admissions">
    University / College Admissions
  </option>
  <option value="Entrance Exams">Entrance Exams</option>
  <option value="Fees and Scholarships">Fees and Scholarships</option>
  <option value="Eligibility and Admission Guidance">
    Eligibility and Admission Guidance
  </option>
  <option value="Other">Other</option>
</select>

            </div>

            <div className="contact-input-group">
              <label htmlFor="query">Your Query</label>
              <textarea
                id="query"
                name="query"
                placeholder="Write your question here..."
                rows="5"
                value={formData.query}
                onChange={handleChange}
                minLength="10"
                maxLength="2000"
                required
              />
              <small>{formData.query.length}/2000 characters</small>
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDING..." : "SUBMIT YOUR QUERY →"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
