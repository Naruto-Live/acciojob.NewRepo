let products = [];

let selectedCategory = "all";
let selectedRating = 0;
let selectedPriceRange = "";


// ============================================
// HTML ELEMENTS
// ============================================

const productContainer =
    document.getElementById("product-container");

const searchInput =
    document.getElementById("search-input");

const filterButtons =
    document.querySelectorAll(".filter");

const ratingRange =
    document.getElementById("range");

const priceCheckboxes =
    document.querySelectorAll('input[name="prange"]');

const sortSelect =
    document.getElementById("sort");


// ============================================
// GET PRODUCTS
// ============================================

async function getProducts() {

    try {

        const response =
            await fetch(
                "https://fakestoreapi.com/products"
            );

        if (!response.ok) {

            throw new Error(
                "Failed to fetch products"
            );

        }

        products = await response.json();

        console.log("Products loaded:", products);

        applyFilters();

    } catch (error) {

        console.error(
            "Error fetching products:",
            error
        );

        productContainer.innerHTML = `
            <p>Unable to load products.</p>
        `;

    }

}


// ============================================
// DISPLAY PRODUCTS
// ============================================

function displayProducts(productList) {

    productContainer.innerHTML = "";


    if (productList.length === 0) {

        productContainer.innerHTML = `
            <p>No products found.</p>
        `;

        return;

    }


    productList.forEach(function (product) {

        const productCard =
            document.createElement("div");


        productCard.className = "item";


        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="info">

                <div class="row">

                    <div class="price">
                        $${product.price}
                    </div>

                </div>


                <div class="product-title">
                    ${product.title}
                </div>


                <div class="row">
                    Rating:
                    ${product.rating.rate}
                    ⭐
                </div>

            </div>


            <button
                class="add-btn"
                data-id="${product.id}"
            >
                Add to Cart
            </button>

        `;


        productContainer.appendChild(
            productCard
        );

    });

}


// ============================================
// APPLY ALL FILTERS
// ============================================

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filteredProducts =
        products.filter(function (product) {


            // SEARCH

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchText);


            // CATEGORY

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            // RATING

            const matchesRating =
                product.rating.rate >= selectedRating;


            // PRICE

            const matchesPrice =
                checkPriceRange(product.price);


            return (
                matchesSearch &&
                matchesCategory &&
                matchesRating &&
                matchesPrice
            );

        });


    // SORT

    filteredProducts =
        sortProducts(filteredProducts);


    displayProducts(
        filteredProducts
    );

}


// ============================================
// PRICE FILTER
// ============================================

function checkPriceRange(price) {

    if (selectedPriceRange === "") {

        return true;

    }


    if (selectedPriceRange === "0-25") {

        return price >= 0 && price < 25;

    }


    if (selectedPriceRange === "25-50") {

        return price >= 25 && price < 50;

    }


    if (selectedPriceRange === "50-100") {

        return price >= 50 && price < 100;

    }


    if (selectedPriceRange === "100on") {

        return price >= 100;

    }


    return true;

}


// ============================================
// SORT PRODUCTS
// ============================================

function sortProducts(productList) {

    const sorted =
        [...productList];


    if (sortSelect.value === "low-high") {

        sorted.sort(function (a, b) {

            return a.price - b.price;

        });

    }


    if (sortSelect.value === "high-low") {

        sorted.sort(function (a, b) {

            return b.price - a.price;

        });

    }


    if (sortSelect.value === "rating-high") {

        sorted.sort(function (a, b) {

            return (
                b.rating.rate -
                a.rating.rate
            );

        });

    }


    return sorted;

}


// ============================================
// SEARCH
// ============================================

searchInput.addEventListener(
    "input",
    function () {

        applyFilters();

    }
);


// ============================================
// CATEGORY FILTER
// ============================================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                applyFilters();

            }
        );

    }
);


// ============================================
// RATING FILTER
// ============================================

ratingRange.addEventListener(
    "input",
    function () {

        selectedRating =
            Number(
                ratingRange.value
            );


        applyFilters();

    }
);


// ============================================
// PRICE FILTER
// ============================================

priceCheckboxes.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {


                priceCheckboxes.forEach(
                    function (otherCheckbox) {

                        if (
                            otherCheckbox !== checkbox
                        ) {

                            otherCheckbox.checked =
                                false;

                        }

                    }
                );


                if (checkbox.checked) {

                    selectedPriceRange =
                        checkbox.id;

                } else {

                    selectedPriceRange = "";

                }


                applyFilters();

            }
        );

    }
);


// ============================================
// SORT
// ============================================

sortSelect.addEventListener(
    "change",
    function () {

        applyFilters();

    }
);


// ============================================
// ADD TO CART
// ============================================

function addToCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    const existingProduct =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            title: product.title,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    console.log(
        "Added to cart:",
        product.title
    );


    console.log(
        "Current cart:",
        cart
    );


    alert(
        "Product added to cart!"
    );

}


// ============================================
// ADD TO CART BUTTON CLICK
// ============================================

productContainer.addEventListener(
    "click",
    function (event) {


        if (
            event.target.classList.contains(
                "add-btn"
            )
        ) {


            const productId =
                Number(
                    event.target.dataset.id
                );


            addToCart(productId);

        }

    }
);


// ============================================
// START APPLICATION
// ============================================

getProducts();