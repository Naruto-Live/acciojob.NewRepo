// Write your script here
// ==========================================
// HTML ELEMENTS
// ==========================================

const firstNameInput =
    document.getElementById("first-name");

const lastNameInput =
    document.getElementById("last-name");

const emailInput =
    document.getElementById("email");

const editButton =
    document.getElementById("edit-btn");

const saveButton =
    document.getElementById("save-btn");

const logoutButton =
    document.getElementById("logout-btn");

const message =
    document.getElementById("message");


// ==========================================
// CHECK LOGIN
// ==========================================

const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href =
        "../login.html";

}


// ==========================================
// GET USER
// ==========================================

function getUser() {

    return JSON.parse(
        localStorage.getItem("user")
    );

}


// ==========================================
// DISPLAY USER
// ==========================================

function displayUser() {

    const user = getUser();


    if (!user) {

        message.textContent =
            "User information not found.";

        return;

    }


    firstNameInput.value =
        user.firstName || "";

    lastNameInput.value =
        user.lastName || "";

    emailInput.value =
        user.email || "";

}


// ==========================================
// EDIT PROFILE
// ==========================================

editButton.addEventListener(
    "click",
    function () {

        firstNameInput.disabled =
            false;

        lastNameInput.disabled =
            false;

        emailInput.disabled =
            false;


        editButton.style.display =
            "none";

        saveButton.style.display =
            "inline-block";


        message.textContent = "";

    }
);


// ==========================================
// SAVE PROFILE
// ==========================================

saveButton.addEventListener(
    "click",
    function () {

        const user = getUser();


        if (!user) {
            return;
        }


        user.firstName =
            firstNameInput.value;

        user.lastName =
            lastNameInput.value;

        user.email =
            emailInput.value;


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        firstNameInput.disabled =
            true;

        lastNameInput.disabled =
            true;

        emailInput.disabled =
            true;


        editButton.style.display =
            "inline-block";

        saveButton.style.display =
            "none";


        message.textContent =
            "Profile updated successfully.";

    }
);


// ==========================================
// LOGOUT
// ==========================================

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "token"
        );


        window.location.href =
            "../login.html";

    }
);


// ==========================================
// START
// ==========================================

displayUser();