
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const mbaForm = document.querySelector("form");

const API_BASE_URL = "http://localhost:5000";

let indianStates = [];
let indianCities = {};

// =====================================
// LOAD INDIAN STATES AND CITIES
// =====================================

async function loadLocationData() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error("Unable to load location data");
        }

        const data = await response.json();

        indianStates = data.states.IN;
        indianCities = data.cities.IN;

        stateSelect.innerHTML = '<option value="">Select State</option>';

        indianStates.forEach((state) => {
            const option = document.createElement("option");

            option.value = state.iso2;
            option.textContent = state.name;

            stateSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Location data error:", error);
        showToast("Unable to load states. Please refresh the page.");
    }
}

// =====================================
// LOAD CITIES WHEN STATE IS SELECTED
// =====================================

stateSelect.addEventListener("change", function () {
    const selectedStateCode = this.value;

    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;

    if (!selectedStateCode) {
        return;
    }

    const cities = indianCities[selectedStateCode] || [];

    cities.forEach((city) => {
        const option = document.createElement("option");

        option.value = city.name;
        option.textContent = city.name;

        citySelect.appendChild(option);
    });

    citySelect.disabled = false;
});

// =====================================
// TOAST MESSAGE
// =====================================

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

// =====================================
// SUBMIT MBA CONSULTATION FORM
// =====================================

mbaForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitBtn =
        document.getElementById("submitBtn") ||
        mbaForm.querySelector('button[type="submit"]');

    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Send state NAME instead of state code
    const state =
        stateSelect.options[stateSelect.selectedIndex]?.text || "";

    const city = citySelect.value;

    if (!full_name || !email || !phone || !state || !city) {
        showToast("Please fill in all fields.");
        return;
    }

    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/online-mba/form-submit`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    full_name,
                    email,
                    phone,
                    state,
                    city
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            showToast(
                result.message || "Unable to submit your enquiry."
            );
            return;
        }

        showToast("Form submitted successfully!");

        mbaForm.reset();

        citySelect.innerHTML = '<option value="">Select City</option>';
        citySelect.disabled = true;

    } catch (error) {

        console.error("MBA form submission error:", error);

        showToast("Server error. Please try again.");

    } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

    }
});

// =====================================
// START
// =====================================

loadLocationData();
