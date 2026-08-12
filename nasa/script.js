const API_KEY = "jdjuTB4u6uUuKCvOeLA1EHdAY1v9Z4WxQsyVhSDv";


// ==========================================
// HTML ELEMENTS
// ==========================================

const searchForm =
    document.getElementById("search-form");

const searchInput =
    document.getElementById("search-input");

const currentImageContainer =
    document.getElementById("current-image-container");

const searchHistory =
    document.getElementById("search-history");


// ==========================================
// DISPLAY IMAGE
// ==========================================

function displayImage(data) {

    currentImageContainer.innerHTML = `
    
    
    <img
    src="${data.url}"
    alt="${data.title}"
    >
    <h2>${data.title}</h2>

    <p>${data.explanation}</p>
    `;
}


// ==========================================
// GET CURRENT IMAGE OF THE DAY
// ==========================================

async function getCurrentImageOfTheDay() {

    try {

        const currentDate =
            new Date().toISOString().split("T")[0];

        const url =
            `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${API_KEY}`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Failed to fetch today's image."
            );
        }

        const data =
            await response.json();

        displayImage(data);

    } catch (error) {

        console.error(error);

        currentImageContainer.innerHTML = `
            <p class="error">
                Unable to load today's NASA image.
            </p>
        `;
    }
}


// ==========================================
// GET IMAGE FOR SELECTED DATE
// ==========================================

async function getImageOfTheDay(date) {

    try {

        const url =
            `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "No NASA image found for this date."
            );
        }

        const data =
            await response.json();

        displayImage(data);

        saveSearch(date);

        addSearchToHistory();

    } catch (error) {

        console.error(error);

        currentImageContainer.innerHTML = `
            <p class="error">
                Unable to find an image for ${date}.
            </p>
        `;
    }
}


// ==========================================
// SAVE SEARCH
// ==========================================

function saveSearch(date) {

    let searches =
        JSON.parse(
            localStorage.getItem("searches")
        ) || [];

    searches.push(date);

    localStorage.setItem(
        "searches",
        JSON.stringify(searches)
    );
}


// ==========================================
// ADD SEARCHES TO HISTORY
// ==========================================

function addSearchToHistory() {

    const searches =
        JSON.parse(
            localStorage.getItem("searches")
        ) || [];


    searchHistory.innerHTML = "";


    searches.forEach(function (date) {

        const li =
            document.createElement("li");

        li.textContent = date;


        li.addEventListener(
            "click",
            function () {

                getImageOfTheDay(date);

            }
        );


        searchHistory.appendChild(li);
    });
}


// ==========================================
// FORM SUBMISSION
// ==========================================

searchForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const selectedDate =
            searchInput.value;


        if (!selectedDate) {
            return;
        }


        getImageOfTheDay(selectedDate);
    }
);


// ==========================================
// PAGE LOAD
// ==========================================

getCurrentImageOfTheDay();

addSearchToHistory();