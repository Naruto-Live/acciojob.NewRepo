// ============================================
// HTML ELEMENTS
// ============================================

const initialIP = document.getElementById("initial-ip");
const getInfoButton = document.getElementById("get-info-btn");

const initialScreen = document.getElementById("initial-screen");
const resultScreen = document.getElementById("result-screen");

const errorMessage = document.getElementById("error-message");


// Top information
const ipAddress = document.getElementById("ip-address");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const city = document.getElementById("city");
const region = document.getElementById("region");
const organization = document.getElementById("organization");
const hostname = document.getElementById("hostname");


// More information
const timezone = document.getElementById("timezone");
const dateTime = document.getElementById("date-time");
const pincode = document.getElementById("pincode");


// Map
const map = document.getElementById("map");


// Post offices
const searchInput = document.getElementById("search");
const postOfficeList = document.getElementById("post-office-list");


// Store post offices so search can use them later
let allPostOffices = [];


// Store user's IP
let userIP = "";


// ============================================
// 1. GET USER'S IP ADDRESS
// ============================================

async function getUserIP() {

    try {

        const response = await fetch(
            "https://api.ipify.org?format=json"
        );

        if (!response.ok) {
            throw new Error("Unable to get IP address.");
        }

        const data = await response.json();

        userIP = data.ip;

        console.log("User IP:", userIP);

        initialIP.textContent = userIP;

    } catch (error) {

        console.error(error);

        initialIP.textContent =
            "Unable to get IP";

        errorMessage.textContent =
            "Could not retrieve your IP address.";
    }
}


// ============================================
// 2. BUTTON CLICK
// ============================================

getInfoButton.addEventListener("click", function () {

    if (!userIP) {

        errorMessage.textContent =
            "IP address is not available.";

        return;
    }

    getUserInformation(userIP);
});


// ============================================
// 3. GET USER INFORMATION FROM IPAPI
// ============================================

async function getUserInformation(ip) {

    try {

        getInfoButton.textContent = "Loading...";

        getInfoButton.disabled = true;


        const url =
            `https://ipapi.co/${ip}/json/`;


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Unable to retrieve user information."
            );
        }


        const data = await response.json();


        console.log("IP information:", data);


        if (data.error) {
            throw new Error(
                data.reason || "IP lookup failed."
            );
        }


        displayUserInformation(data);


        // Get post offices using pincode
        if (data.postal) {

            getPostOffices(data.postal);

        } else {

            postOfficeList.innerHTML =
                "<p>Pincode not available.</p>";
        }


        // Show result screen
        initialScreen.classList.add("hidden");

        resultScreen.classList.remove("hidden");


    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            error.message;

    } finally {

        getInfoButton.textContent = "Get Data";

        getInfoButton.disabled = false;
    }
}


// ============================================
// 4. DISPLAY USER INFORMATION
// ============================================

function displayUserInformation(data) {

    // Top information

    ipAddress.textContent =
        data.ip || "---";

    latitude.textContent =
        data.latitude || "---";

    longitude.textContent =
        data.longitude || "---";

    city.textContent =
        data.city || "---";

    region.textContent =
        data.region || "---";

    organization.textContent =
        data.org || "---";

    hostname.textContent =
        data.hostname || "---";


    // More information

    timezone.textContent =
        data.timezone || "---";

    pincode.textContent =
        data.postal || "---";


    // Current date and time

    if (data.timezone) {

        updateDateTime(data.timezone);

    }


    // Google map

    if (
        data.latitude &&
        data.longitude
    ) {

        showMap(
            data.latitude,
            data.longitude
        );
    }
}


// ============================================
// 5. CURRENT DATE AND TIME
// ============================================

function updateDateTime(timezoneName) {

    const now = new Date();

    const formattedTime =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: timezoneName,

                dateStyle: "medium",

                timeStyle: "medium"
            }
        ).format(now);


    dateTime.textContent =
        formattedTime;
}


// ============================================
// 6. GOOGLE MAP
// ============================================

function showMap(lat, lon) {

    const mapURL =
        `https://www.google.com/maps?q=${lat},${lon}&z=14&output=embed`;

    map.src = mapURL;
}


// ============================================
// 7. GET POST OFFICES
// ============================================

async function getPostOffices(postalCode) {

    try {

        postOfficeList.innerHTML =
            "<p>Loading post offices...</p>";


        const url =
            `https://api.postalpincode.in/pincode/${postalCode}`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve post offices."
            );
        }


        const data =
            await response.json();


        console.log(
            "Post office data:",
            data
        );


        if (
            !data[0] ||
            data[0].Status !== "Success" ||
            !data[0].PostOffice
        ) {

            postOfficeList.innerHTML =
                "<p>No post offices found.</p>";

            return;
        }


        allPostOffices =
            data[0].PostOffice;


        displayPostOffices(
            allPostOffices
        );


    } catch (error) {

        console.error(error);

        postOfficeList.innerHTML =
            "<p>Unable to load post offices.</p>";
    }
}


// ============================================
// 8. DISPLAY POST OFFICES
// ============================================

function displayPostOffices(postOffices) {

    postOfficeList.innerHTML = "";


    if (postOffices.length === 0) {

        postOfficeList.innerHTML =
            "<p>No matching post offices found.</p>";

        return;
    }


    postOffices.forEach(function (office) {

        const card =
            document.createElement("div");


        card.className =
            "post-office-card";


        card.innerHTML = `

            <p>
                <strong>Name</strong>
                ${office.Name || "---"}
            </p>

            <p>
                <strong>Branch Type</strong>
                ${office.BranchType || "---"}
            </p>

            <p>
                <strong>Delivery Status</strong>
                ${office.DeliveryStatus || "---"}
            </p>

            <p>
                <strong>District</strong>
                ${office.District || "---"}
            </p>

            <p>
                <strong>Division</strong>
                ${office.Division || "---"}
            </p>

        `;


        postOfficeList.appendChild(card);
    });
}


// ============================================
// 9. SEARCH POST OFFICES
// ============================================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            allPostOffices.filter(
                function (office) {

                    const name =
                        (office.Name || "")
                            .toLowerCase();

                    const branchType =
                        (office.BranchType || "")
                            .toLowerCase();


                    return (
                        name.includes(searchText) ||
                        branchType.includes(searchText)
                    );
                }
            );


        displayPostOffices(filtered);
    }
);


// ============================================
// 10. START
// ============================================

getUserIP();