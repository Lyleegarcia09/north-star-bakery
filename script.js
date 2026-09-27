// North Star Bakery - Touchstone 4 JavaScript


// Product information
const bakeryProducts = [
    {
        id: "bread",
        name: "Breads"
    },
    {
        id: "pastries",
        name: "Pastries"
    },
    {
        id: "cakes",
        name: "Cakes"
    },
    {
        id: "signature-loaf",
        name: "Our Signature Loaf"
    }
];


// Another object used for storing favorite information
const favoriteSettings = {
    storageKey: "northStarFavorites",
    favoriteText: "♥ Favorited",
    defaultText: "♡ Add to Favorites"
};


// Store the user's favorite products
let favorites = [];


// Load favorites from browser storage
function loadFavorites() {

    const savedFavorites =
        localStorage.getItem(favoriteSettings.storageKey);

    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    } else {
        favorites = [];
    }
}


// Save favorites to browser storage
function saveFavorites() {

    localStorage.setItem(
        favoriteSettings.storageKey,
        JSON.stringify(favorites)
    );
}


// Add or remove a product from favorites
function toggleFavorite(productId) {

    if (favorites.includes(productId)) {

        favorites = favorites.filter(function (id) {
            return id !== productId;
        });

    } else {

        favorites.push(productId);
    }

    saveFavorites();
    updateFavoriteButtons();
    renderFavorites();
}


// Update the text on the favorite buttons
function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {

        const productId =
            button.getAttribute("data-product");

        if (favorites.includes(productId)) {

            button.textContent =
                favoriteSettings.favoriteText;

        } else {

            button.textContent =
                favoriteSettings.defaultText;
        }
    });
}


// Set up the favorite buttons
function setupFavoriteButtons() {

    const buttons =
        document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                button.getAttribute("data-product");

            toggleFavorite(productId);

        });
    });
}


// Display the user's favorite products
function renderFavorites() {

    const favoritesSection =
        document.getElementById("favorites-list");

    if (!favoritesSection) {
        return;
    }

    favoritesSection.innerHTML = "";

    if (favorites.length === 0) {

        const message = document.createElement("li");

        message.textContent =
            "No favorite products yet.";

        favoritesSection.appendChild(message);

        return;
    }


    favorites.forEach(function (favoriteId) {

        const product = bakeryProducts.find(function (item) {

            return item.id === favoriteId;

        });

        if (product) {

            const listItem =
                document.createElement("li");

            listItem.textContent =
                product.name;

            favoritesSection.appendChild(listItem);
        }
    });
}


// Validate the Contact & Pre-Orders form
function validateContactForm(event) {

    const form =
        document.getElementById("contact-form");

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const nameError =
        document.getElementById("name-error");

    const emailError =
        document.getElementById("email-error");


    // Make sure the form elements exist
    if (!form || !name || !email) {
        return false;
    }


    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";


    let isValid = true;


    // Check that the name is not empty
    if (name.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;
    }


    // Check that the email has a valid format
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    // If the form is not valid, stop submission
    if (!isValid) {

        event.preventDefault();

        return false;
    }


    // Keep the page from resetting because this is a
    // demonstration website without a real server.
    event.preventDefault();


    // Create a success message
    let successMessage =
        document.getElementById("form-success");


    if (!successMessage) {

        successMessage =
            document.createElement("p");

        successMessage.id =
            "form-success";

        successMessage.setAttribute(
            "role",
            "status"
        );

        form.appendChild(successMessage);
    }


    successMessage.textContent =
        "Thank you! Your request has been received. We will contact you soon.";


    // Keep the information the customer entered
    // instead of resetting the form.
    return false;
}


// Run the JavaScript after the page loads
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadFavorites();

        setupFavoriteButtons();

        updateFavoriteButtons();

        renderFavorites();

    }
);