const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

// Searchable dropdown instances
const countryChoices = new Choices(countrySelect, {
    allowHTML: false,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    itemSelectText: "",
    shouldSort: false,
    searchPlaceholderValue: "Type to search country..."
});

const stateChoices = new Choices(stateSelect, {
    allowHTML: false,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    itemSelectText: "",
    shouldSort: false,
    searchPlaceholderValue: "Type to search state..."
});

const cityChoices = new Choices(citySelect, {
    allowHTML: false,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    itemSelectText: "",
    shouldSort: false,
    searchPlaceholderValue: "Type to search city..."
});

// Get the visible selected name from a dropdown
function getSelectedName(choicesInstance) {
    const selectElement = choicesInstance.passedElement.element;

    return selectElement.selectedOptions[0]?.textContent.trim() || "";
}

const API = "https://study-abroad-backend-qrgg.onrender.com";

const allowedCountries = [
    "US", "IT", "CA", "NZ", "FR",
    "AU", "GB", "DE", "IE", "AE"
];

// ===============================
// 1. LOAD COUNTRIES
// ===============================

async function loadCountries() {
    try {
        const response = await fetch(`${API}/api/countries`);

        if (!response.ok) {
            throw new Error("Failed to load countries");
        }

        const countries = await response.json();
        console.log("Countries from API:", countries.map(c => ({
    name: c.name,
    iso2: c.iso2
})));

console.log("Filtered countries:", countries.filter(
    country => allowedCountries.includes(country.iso2)
));

        const filteredCountries = countries
            .filter(country =>
                allowedCountries.includes(country.iso2)
            )
            .map(country => ({
                value: country.iso2,
                label: country.name
            }));

     countryChoices.setChoices(
    [
        { value: "", label: "Select Country", selected: true, disabled: true },
        ...filteredCountries
    ],
    "value",
    "label",
    true
);

countryChoices.refresh();

    } catch (error) {
        console.error("Error loading countries:", error);
    }
}

// ===============================
// 2. COUNTRY → STATE
// ===============================

// Use the Choices.js instance to listen for changes
countryChoices.passedElement.element.addEventListener('change', async function (event) {
    // event.detail.value is provided by Choices.js
    const countryCode = event.detail.value;

    // Reset State Dropdown
    stateChoices.clearChoices();
    stateChoices.setChoices([{
        value: "",
        label: "Select State",
        selected: true,
        disabled: true
    }], "value", "label", true);

    // Reset City Dropdown
    cityChoices.clearChoices();
    cityChoices.setChoices([{
        value: "",
        label: "Select City",
        selected: true,
        disabled: true
    }], "value", "label", true);

    if (!countryCode) return;

    try {
        const response = await fetch(
            `${API}/api/states?countryCode=${encodeURIComponent(countryCode)}`
        );

        if (!response.ok) {
            throw new Error("Failed to load states");
        }

        const states = await response.json();

        stateChoices.setChoices(
            states.map(state => ({
                value: state.iso2,
                label: state.name
            })),
            "value",
            "label",
            false
        );

    } catch (error) {
        console.error("Error loading states:", error);
    }
});

// ===============================
// 3. STATE → CITY
// ===============================

stateChoices.passedElement.element.addEventListener('change', async function (event) {
    const stateCode = event.detail.value;
    // When using Choices.js, grabbing the value from the instance is safer
    const countryCode = countryChoices.getValue(true);

    // Reset City Dropdown
    cityChoices.clearChoices();
    cityChoices.setChoices([{
        value: "",
        label: "Select City",
        selected: true,
        disabled: true
    }], "value", "label", true);

    if (!countryCode || !stateCode) return;

    try {
        const response = await fetch(
            `${API}/api/cities?countryCode=${encodeURIComponent(countryCode)}&stateCode=${encodeURIComponent(stateCode)}`
        );

        if (!response.ok) {
            throw new Error("Failed to load cities");
        }

        const cities = await response.json();

        cityChoices.setChoices(
            cities.map(city => ({
                value: String(city.id),
                label: city.name
            })),
            "value",
            "label",
            false
        );

    } catch (error) {
        console.error("Error loading cities:", error);
    }
});

// ===============================
// 4. START
// ===============================

loadCountries();

const consultationForm = document.getElementById("consultationForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

let isSubmitting = false;

consultationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Get selected dropdown values
    const formData = {
        full_name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        country_name: getSelectedName(countryChoices),
        state_name: getSelectedName(stateChoices),
        city_name: getSelectedName(cityChoices)
    };

    // Validate fields
    if (
        !formData.full_name ||
        !formData.email ||
        !formData.phone ||
        !formData.country_name ||
        !formData.state_name ||
        !formData.city_name
    ) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
    }

    // Validate phone number
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
        formMessage.textContent = "Please enter a valid phone number.";
        formMessage.style.color = "red";
        return;
    }

    // Validate terms
    const terms = document.getElementById("terms");

    if (terms && !terms.checked) {
        formMessage.textContent = "Please accept the Terms & Privacy Policy.";
        formMessage.style.color = "red";
        return;
    }

    // Start submission
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "SUBMITTING...";

    formMessage.textContent = "";
    
    try {

        const response = await fetch(`${API}/api/consultations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                result.error ||
                "Failed to submit form."
            );
        }

        // Show success message
        formMessage.textContent =
            "Consultation form submitted successfully! 🎉";

        formMessage.style.color = "green";

        // Reset form
        consultationForm.reset();

        // Reset country dropdown
        countryChoices.clearChoices();

        await loadCountries();

        // Reset state dropdown
        stateChoices.clearChoices();

        stateChoices.setChoices([
            {
                value: "",
                label: "Select State",
                selected: true,
                disabled: true
            }
        ], "value", "label", true);

        // Reset city dropdown
        cityChoices.clearChoices();

        cityChoices.setChoices([
            {
                value: "",
                label: "Select City",
                selected: true,
                disabled: true
            }
        ], "value", "label", true);

    } catch (error) {

        console.error("Submission error:", error);

        formMessage.textContent =
            error.message || "Something went wrong. Please try again.";

        formMessage.style.color = "red";

    } finally {

        // Allow another submission only after this request finishes
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBMIT";

    }

});

