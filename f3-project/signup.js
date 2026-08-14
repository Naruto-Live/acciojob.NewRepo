const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const firstName =
        document.getElementById("first-name").value;

    const lastName =
        document.getElementById("last-name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    document.getElementById("message").textContent =
        "Account created successfully!";


    signupForm.reset();

});