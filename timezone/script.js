const API_KEY = "3a9f0fc01654464fa834f40b93c0d8e4";

// Current timezone elements
const currentName = document.getElementById("current-name");
const currentLat = document.getElementById("current-lat");
const currentLon = document.getElementById("current-lon");
const currentStd = document.getElementById("current-std");
const currentStdSeconds = document.getElementById("current-std-seconds");
const currentDst = document.getElementById("current-dst");
const currentDstSeconds = document.getElementById("current-dst-seconds");
const currentCountry = document.getElementById("current-country");
const currentPostcode = document.getElementById("current-postcode");
const currentCity = document.getElementById("current-city");

// Address search elements
const form = document.getElementById("address-form");
const addressInput = document.getElementById("address");
const errorMessage = document.getElementById("error-message");
const resultSection = document.getElementById("result-section");

// Result elements
const resultName = document.getElementById("result-name");
const resultLat = document.getElementById("result-lat");
const resultLon = document.getElementById("result-lon");
const resultStd = document.getElementById("result-std");
const resultStdSeconds = document.getElementById("result-std-seconds");
const resultDst = document.getElementById("result-dst");
const resultDstSeconds = document.getElementById("result-dst-seconds");
const resultCountry = document.getElementById("result-country");
const resultPostcode = document.getElementById("result-postcode");
const resultCity = document.getElementById("result-city");


// ======================================
// CURRENT LOCATION
// ======================================

function getCurrentLocation() {

    if (!navigator.geolocation) {
        currentName.textContent =
            "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Latitude:", lat);
            console.log("Longitude:", lon);

            getCurrentTimezone(lat, lon);
        },

        function (error) {

            console.error("Location error:", error);

            currentName.textContent =
                "Unable to get your location.";
        }
    );
}


// ======================================
// CURRENT TIMEZONE
// ======================================

async function getCurrentTimezone(lat, lon) {

    try {

        currentName.textContent = "Loading...";

        const url =
            `https://api.geoapify.com/v1/geocode/reverse` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&format=json` +
            `&apiKey=${API_KEY}`;

        console.log("Current timezone URL:", url);

        const response = await fetch(url);

        console.log("API status:", response.status);

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("API response:", data);

        if (!data.results || data.results.length === 0) {
            throw new Error("No location found.");
        }

        const result = data.results[0];
        const timezone = result.timezone;

        if (!timezone) {
            throw new Error("Timezone data not available.");
        }

        currentName.textContent =
            timezone.name || "Not available";

        currentLat.textContent =
            result.lat ?? "Not available";

        currentLon.textContent =
            result.lon ?? "Not available";

        currentStd.textContent =
            timezone.offset_STD || "Not available";

        currentStdSeconds.textContent =
            timezone.offset_STD_seconds ?? "Not available";

        currentDst.textContent =
            timezone.offset_DST || "Not available";

        currentDstSeconds.textContent =
            timezone.offset_DST_seconds ?? "Not available";

        currentCountry.textContent =
            result.country || "Not available";

        currentPostcode.textContent =
            result.postcode || "Not available";

        currentCity.textContent =
            result.city || "Not available";

    } catch (error) {

        console.error("Current timezone error:", error);

        currentName.textContent =
            error.message;
    }
}


// ======================================
// ADDRESS SEARCH
// ======================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    searchAddress();
});


async function searchAddress() {

    const address = addressInput.value.trim();

    // Clear previous messages
    errorMessage.textContent = "";

    // Hide previous result
    resultSection.classList.add("hidden");


    // Check empty input
    if (address === "") {

        errorMessage.textContent =
            "Please enter an address.";

        return;
    }


    try {

        errorMessage.textContent =
            "Searching...";


        const url =
            `https://api.geoapify.com/v1/geocode/search` +
            `?text=${encodeURIComponent(address)}` +
            `&format=json` +
            `&limit=1` +
            `&apiKey=${API_KEY}`;


        console.log("Search URL:", url);


        const response = await fetch(url);

        console.log(
            "Search API status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                `API error: ${response.status}`
            );
        }


        const data = await response.json();

        console.log("Search response:", data);


        if (!data.results || data.results.length === 0) {

            errorMessage.textContent =
                "Timezone could not be found.";

            return;
        }


        const result = data.results[0];

        const timezone = result.timezone;


        if (!timezone || !timezone.name) {

            errorMessage.textContent =
                "Timezone could not be found.";

            return;
        }


        // Display result

        resultName.textContent =
            timezone.name;

        resultLat.textContent =
            result.lat ?? "Not available";

        resultLon.textContent =
            result.lon ?? "Not available";

        resultStd.textContent =
            timezone.offset_STD || "Not available";

        resultStdSeconds.textContent =
            timezone.offset_STD_seconds ?? "Not available";

        resultDst.textContent =
            timezone.offset_DST || "Not available";

        resultDstSeconds.textContent =
            timezone.offset_DST_seconds ?? "Not available";

        resultCountry.textContent =
            result.country || "Not available";

        resultPostcode.textContent =
            result.postcode || "Not available";

        resultCity.textContent =
            result.city || "Not available";


        // Show result

        resultSection.classList.remove("hidden");

        errorMessage.textContent = "";

    } catch (error) {

        console.error(
            "Address search error:",
            error
        );

        errorMessage.textContent =
            "Timezone could not be found.";
    }
}


// ======================================
// START
// ======================================

getCurrentLocation();