import CollegeSection from "./CollegeSection";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import "./StudyAbroad.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const allowedCountries = [
  "US", "IT", "CA", "NZ", "FR",
  "AU", "GB", "DE", "IE", "AE"
];

function StudyAbroad() {
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const choicesRef = useRef({});
  const submittingRef = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  

  useEffect(() => {
    const countryChoices = new Choices(countryRef.current, {
      allowHTML: false,
      searchEnabled: true,
      searchChoices: true,
      searchFloor: 1,
      itemSelectText: "",
      shouldSort: false,
      searchPlaceholderValue: "Type to search country..."
    });

    const stateChoices = new Choices(stateRef.current, {
      allowHTML: false,
      searchEnabled: true,
      searchChoices: true,
      searchFloor: 1,
      itemSelectText: "",
      shouldSort: false,
      searchPlaceholderValue: "Type to search state..."
    });

    const cityChoices = new Choices(cityRef.current, {
      allowHTML: false,
      searchEnabled: true,
      searchChoices: true,
      searchFloor: 1,
      itemSelectText: "",
      shouldSort: false,
      searchPlaceholderValue: "Type to search city..."
    });

    choicesRef.current = {
      countryChoices,
      stateChoices,
      cityChoices
    };

    const setOptions = (instance, placeholder, items) => {
      instance.clearChoices();

      instance.setChoices(
        [
          {
            value: "",
            label: placeholder,
            disabled: true,
            selected: true
          },
          ...items
        ],
        "value",
        "label",
        true
      );
    };

    const resetStates = () => {
      setOptions(stateChoices, "Select State", []);
      setOptions(cityChoices, "Select City", []);
    };

    const loadCountries = async () => {
      try {
        const response = await fetch(`${API}/api/countries`);

        if (!response.ok) {
          throw new Error("Unable to load countries");
        }

        const data = await response.json();
        const countries = Array.isArray(data)
          ? data
          : data.countries || [];

        const filteredCountries = countries
          .filter(country => allowedCountries.includes(country.iso2))
          .map(country => ({
            value: country.iso2,
            label: country.name
          }));

        setOptions(countryChoices, "Select Country", filteredCountries);
      } catch (error) {
        console.error("Country loading error:", error);
      }
    };

    const handleCountryChange = async (event) => {
      const countryCode = event.target.value;

      resetStates();

      if (!countryCode) return;

      try {
        const response = await fetch(
          `${API}/api/states?countryCode=${encodeURIComponent(countryCode)}`
        );

        if (!response.ok) {
          throw new Error("Unable to load states");
        }

        const data = await response.json();
        const states = Array.isArray(data)
          ? data
          : data.states || [];

        const stateOptions = states.map(state => ({
          value: state.iso2,
          label: state.name
        }));

        setOptions(stateChoices, "Select State", stateOptions);
      } catch (error) {
        console.error("State loading error:", error);
      }
    };

    const handleStateChange = async (event) => {
      const stateCode = event.target.value;
      const countryCode = countryRef.current.value;

      setOptions(cityChoices, "Select City", []);

      if (!countryCode || !stateCode) return;

      try {
        const response = await fetch(
          `${API}/api/cities?countryCode=${encodeURIComponent(countryCode)}&stateCode=${encodeURIComponent(stateCode)}`
        );

        if (!response.ok) {
          throw new Error("Unable to load cities");
        }

        const data = await response.json();
        const cities = Array.isArray(data)
          ? data
          : data.cities || [];

        const cityOptions = cities.map(city => ({
          value: String(city.id),
          label: city.name
        }));

        setOptions(cityChoices, "Select City", cityOptions);
      } catch (error) {
        console.error("City loading error:", error);
      }
    };

    countryRef.current.addEventListener("change", handleCountryChange);
    stateRef.current.addEventListener("change", handleStateChange);

    loadCountries();

    return () => {
      countryRef.current?.removeEventListener("change", handleCountryChange);
      stateRef.current?.removeEventListener("change", handleStateChange);

      countryChoices.destroy();
      stateChoices.destroy();
      cityChoices.destroy();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const full_name = formData.get("full_name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();

    const country_name =
      countryRef.current.selectedOptions[0]?.textContent.trim() || "";

    const state_name =
      stateRef.current.selectedOptions[0]?.textContent.trim() || "";

    const city_name =
      cityRef.current.selectedOptions[0]?.textContent.trim() || "";

    const termsAccepted = formData.get("terms") === "on";

    if (
      !full_name ||
      !email ||
      !phone ||
      !countryRef.current.value ||
      !stateRef.current.value ||
      !cityRef.current.value
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (!/^\d{10,13}$/.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!termsAccepted) {
      toast.warning("Please accept the terms and conditions.");
      return;
    }

    submittingRef.current = true;
setIsSubmitting(true);
    try {
      const response = await fetch(`${API}/api/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
  full_name,
  email,
  phone,
  country_name,
  state_name,
  city_name,
  source: "React Website"
})
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Something went wrong."
        );
      }

      toast.success("Consultation form submitted successfully! 🎉");

      form.reset();

      const {
        countryChoices,
        stateChoices,
        cityChoices
      } = choicesRef.current;

      countryChoices.setChoiceByValue("");
      stateChoices.clearChoices();
      cityChoices.clearChoices();

      stateChoices.setChoices(
        [{ value: "", label: "Select State", disabled: true, selected: true }],
        "value",
        "label",
        true
      );

      cityChoices.setChoices(
        [{ value: "", label: "Select City", disabled: true, selected: true }],
        "value",
        "label",
        true
      );

    } catch (error) {
  console.error("Study Abroad form error:", error);
toast.error(error.message || "Unable to submit your form. Please try again.");

 

    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <main className="study-abroad-page">
      <div className="study-scholarship-banner">
        <div className="study-banner-track">
          {[1, 2, 3, 4].map(item => (
            <span key={item}>
              ✈ STUDY ABROAD | Get Upto ₹10,00,000 Scholarship
            </span>
          ))}
        </div>
      </div>

      <section className="study-hero">
        <div className="study-hero-content">
          <h1>
            Take the First Step
            <br />
            to <span>STUDY ABROAD</span>
          </h1>

          <ul className="study-benefits">
            <li>Courses starting from ₹5 Lakhs</li>
            <li>Scholarships up to ₹10,00,000</li>
            <li>Expert guidance for your journey</li>
          </ul>
        </div>

<div className={`study-form-container ${isFormModalOpen ? "study-form-modal" : ""}`}>
  {isFormModalOpen && (
    <button
      type="button"
      className="study-modal-close"
      onClick={() => setIsFormModalOpen(false)}
    >
      ✕
    </button>
  )}
  <div className="study-form-heading">
    FILL IN YOUR DETAILS BELOW
  </div>

  <h2>
    Get Expert Guidance for Your Study Abroad Journey
  </h2>
   <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="full_name"
      placeholder="Enter your Full Name"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email Address"
      required
    />

    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      required
    />

    <select ref={countryRef} id="study-country" required>
      <option value="">Select Country</option>
    </select>

    <select ref={stateRef} id="study-state" required>
      <option value="">Select State</option>
    </select>

    <select ref={cityRef} id="study-city" required>
      <option value="">Select City</option>
    </select>

    <label className="study-terms">
      <input type="checkbox" name="terms" />
      I agree to the terms and conditions.
    </label>

    <button
      type="submit"
      disabled={isSubmitting}
      className="study-submit-btn"
    >
      {isSubmitting ? "SUBMITTING..." : "SUBMIT FORM"}
    </button>
  </form>
</div>

      </section>
      {isFormModalOpen && (
  <div
    className="study-modal-overlay"
    onClick={() => setIsFormModalOpen(false)}
  />
)}

<CollegeSection
  onViewDetails={() => setIsFormModalOpen(true)}
/>
    </main>
  );
}

export default StudyAbroad;
