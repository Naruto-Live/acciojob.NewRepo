const loginForm =
    document.getElementById("login-form");

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        const storedUser =
            JSON.parse(
                localStorage.getItem("user")
            );


        if (!storedUser) {

            document.getElementById(
                "message"
            ).textContent =
                "No account found. Please sign up first.";

            return;
        }


        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            localStorage.setItem(
                "token",
                "logged-in"
            );


            document.getElementById(
                "message"
            ).textContent =
                "Login successful!";


            setTimeout(function () {

                window.location.href =
                    "shop/index.html";

            }, 500);


        } else {

            document.getElementById(
                "message"
            ).textContent =
                "Invalid email or password.";

        }

    }
);