// ==========================================
// HTML ELEMENTS
// ==========================================

const cartItems =
    document.getElementById("cart-items");

const emptyCart =
    document.getElementById("empty-cart");

const cartSummary =
    document.getElementById("cart-summary");

const totalItems =
    document.getElementById("total-items");

const totalPrice =
    document.getElementById("total-price");

const checkoutButton =
    document.getElementById("checkout-btn");


// ==========================================
// GET CART
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cart = getCart();


    cartItems.innerHTML = "";


    // ==============================
    // EMPTY CART
    // ==============================

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartSummary.style.display = "none";

        return;

    }


    emptyCart.style.display = "none";

    cartSummary.style.display = "block";


    // ==============================
    // CREATE CART ITEMS
    // ==============================

    cart.forEach(function (product) {

        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.title}
                </h3>


                <p>
                    Price:
                    $${product.price}
                </p>


                <div class="quantity">

                    <button
                        class="decrease-btn"
                        data-id="${product.id}"
                    >
                        -
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        class="increase-btn"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <div>

                <p>
                    Total:
                    $${(
                        product.price *
                        product.quantity
                    ).toFixed(2)}
                </p>


                <button
                    class="remove-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    updateSummary(cart);

}


// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary(cart) {

    let itemCount = 0;

    let price = 0;


    cart.forEach(function (product) {

        itemCount +=
            product.quantity;


        price +=
            product.price *
            product.quantity;

    });


    totalItems.textContent =
        itemCount;


    totalPrice.textContent =
        price.toFixed(2);

}


// ==========================================
// CART BUTTONS
// ==========================================

cartItems.addEventListener(
    "click",
    function (event) {

        const productId =
            Number(
                event.target.dataset.id
            );


        // REMOVE

        if (
            event.target.classList.contains(
                "remove-btn"
            )
        ) {

            removeFromCart(productId);

        }


        // INCREASE

        if (
            event.target.classList.contains(
                "increase-btn"
            )
        ) {

            changeQuantity(
                productId,
                1
            );

        }


        // DECREASE

        if (
            event.target.classList.contains(
                "decrease-btn"
            )
        ) {

            changeQuantity(
                productId,
                -1
            );

        }

    }
);


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(productId) {

    let cart =
        getCart();


    cart =
        cart.filter(
            function (product) {

                return product.id !== productId;

            }
        );


    saveCart(cart);

    displayCart();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(
    productId,
    amount
) {

    const cart =
        getCart();


    const product =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }


    product.quantity += amount;


    // Remove if quantity reaches zero

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart(cart);

    displayCart();

}


// ==========================================
// RAZORPAY CHECKOUT
// ==========================================

checkoutButton.addEventListener(
    "click",
    async function () {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        // Calculate total

        let total = 0;


        cart.forEach(
            function (product) {

                total +=
                    product.price *
                    product.quantity;

            }
        );


        try {

            // Create order through backend

            const response =
                await fetch(
                    "/api/create-order",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({
                                amount: total
                            })

                    }
                );


            const order =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    order.error ||
                    "Order creation failed"
                );

            }


            // ==============================
            // RAZORPAY OPTIONS
            // ==============================

            const options = {

                key:
                    "rzp_test_TPILenQfSs0oIp",

                amount:
                    order.amount,

                currency:
                    "INR",

                name:
                    "MeShop",

                description:
                    "Shopping Cart Purchase",

                order_id:
                    order.id,


                handler:
                    function (paymentResponse) {

                        console.log(
                            "Payment successful:",
                            paymentResponse
                        );


                        alert(
                            "Payment successful!"
                        );


                        localStorage.removeItem(
                            "cart"
                        );


                        displayCart();

                    },


                prefill: {

                    name:
                        "Customer",

                    email:
                        "customer@example.com"

                },


                theme: {

                    color:
                        "#000000"

                }

            };


            const razorpay =
                new Razorpay(
                    options
                );


            razorpay.open();


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );


            alert(
                "Unable to start payment."
            );

        }

    }
);


// ==========================================
// START
// ==========================================

displayCart();