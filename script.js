document.addEventListener("DOMContentLoaded", function () {
    // Toggle mobile menu
    const menuToggle = document.querySelector(".fa-bars");
    const sideBar = document.querySelector(".side-bar");

    if (menuToggle && sideBar) {
        menuToggle.addEventListener("click", function () {
            sideBar.classList.toggle("active");
        });
    }

    // Search functionality (basic example)
    const searchBox = document.querySelector(".search-box input");
    searchBox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            alert("Searching for: " + searchBox.value);
        }
    });

    // Cart functionality placeholder
    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cartIcon) {
        cartIcon.addEventListener("click", function () {
            alert("Cart functionality coming soon!");
        });
    }

    // Wishlist functionality placeholder
    const wishlistIcon = document.querySelector(".fa-heart");
    if (wishlistIcon) {
        wishlistIcon.addEventListener("click", function () {
            alert("Wishlist functionality coming soon!");
        });
    }
});