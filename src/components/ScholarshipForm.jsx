
import React, { useState, useEffect, useRef } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  "Dadra and Nagar Haveli and Daman and Diu"
];

function ScholarshipForm({ onSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const stateSelectRef = useRef(null);
const choicesRef = useRef(null);

useEffect(() => {
  const stateSelect = stateSelectRef.current;

  if (!stateSelect) return;

  const choices = new Choices(stateSelect, {
    searchEnabled: true,
    searchPlaceholderValue: "Search state...",
    itemSelectText: "",
    shouldSort: false,
    placeholder: true,
    placeholderValue: "Select State"
  });

  choicesRef.current = choices;

  return () => {
    choices.destroy();
    choicesRef.current = null;
  };
}, []);

  // Automatically hide success notification after 4 seconds
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/mba/form-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            full_name: data.full_name.trim(),
            email: data.email.trim(),
            phone: data.mobile.trim(),
            state: data.state
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Unable to submit your enquiry.");
        return;
      }

      // Show success notification
      setShowSuccess(true);

      // Clear form fields
      form.reset();
choicesRef.current?.setChoiceByValue("");

      // Do not call onSuccess here because it closes the popup.
    } catch (error) {
      console.error("MBA form submission error:", error);
      alert("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <div className="scholarship-card">

      {/* Success Notification */}
      {showSuccess && (
        <div className="success-toast">
          <div className="success-toast-content">
            <span className="success-icon">✓</span>

            <span>Form submitted successfully!</span>

            <button
              type="button"
              className="success-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>

          <div className="success-progress"></div>
        </div>
      )}

      <h2>
        Fill in your details 
      </h2>

      <p>
        Get free expert guidance on universities, fees & EMI options.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Enter your Full Name"
          required
        />

        <div className="form-row">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            maxLength="10"
            pattern="[6-9][0-9]{9}"
            required
          />

         <select
  name="state"
  ref={stateSelectRef}
  defaultValue=""
  required
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</select>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />

        <button type="submit">
          SUBMIT FORM
        </button>

        <small>
          An advisor will contact you to discuss your options.
          Scholarship eligibility and terms apply.
        </small>
      </form>
    </div>
  );
}

export default ScholarshipForm;
