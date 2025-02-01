
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle dropdown menu visibility on click
    dropdown.addEventListener('click', function () {
        // Toggle visibility of the dropdown menu
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block'; // Show menu
        } else {
            dropdownMenu.style.display = 'none'; // Hide menu
        }
    });

    // close dropdown if clicked outside
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.style.display = 'none'; // Close the dropdown if clicked outside
        }
    });

    // Toggle the search bar visibility
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');

    searchIcon.addEventListener('click', function () {
        searchBar.classList.toggle('hidden'); // Toggle visibility of the search bar
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');

    // Ensure the search bar is hidden initially
    searchBar.style.display = 'none'; 

    // Toggle the search bar visibility when the search icon is clicked
    searchIcon.addEventListener('click', function () {
        // Toggle visibility of search bar
        if (searchBar.style.display === 'none') {
            searchBar.style.display = 'block'; // Show search bar
        } else {
            searchBar.style.display = 'none'; // Hide search bar
        }
    });
});

function scrollToCategory() {
    const giftCategorySection = document.getElementById("gift-categories");
    if (giftCategorySection) {
        giftCategorySection.scrollIntoView({ behavior: "smooth" });
        giftCategorySection.classList.add("highlight");
        setTimeout(() => giftCategorySection.classList.remove("highlight"), 1500);
    }
}


// Cart Object to Hold Items
let cart = {};

// Function to Update the Cart Count in the Header
function updateCartCount() {
    const cartCount = Object.values(cart).reduce((total, item) => total + item.amount, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ""; // Clear existing content

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        updateTotalPrice(); // Reset total price when cart is empty
        return;
    }

    let totalPrice = 0;

    for (const [uniqueKey, item] of Object.entries(cart)) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const itemTotalPrice = item.price * item.amount;
        totalPrice += itemTotalPrice;

        itemDiv.innerHTML = `
            <p>${item.name} (${item.gram ? item.gram + 'g' : ''})</p>
            <p>Amount: ${item.amount}</p>
            <p>Price: $${item.price.toFixed(2)} each</p>
            <p>Total: $${itemTotalPrice.toFixed(2)}</p>
            <button onclick="removeFromCart('${uniqueKey}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    }

    updateTotalPrice(); // Ensure total price is updated after rendering cart items
}

// Product Prices for Cakes and Other Items
const productPrices = {
    "Chocolate Cake": { 500: 7.99, 800: 10.99, 1000: 14.99, 1200: 17.99 },
    "Vanilla Cake": { 500: 7.99, 800: 10.99, 1000: 14.99, 1200: 17.99 },
    "Strawberry Cake": { 500: 7.99, 800: 10.99, 1000: 14.99, 1200: 17.99 },
    "Red Velvet Cake": { 500: 7.99, 800: 10.99, 1000: 14.99, 1200: 17.99 },
    "Watch 1": { 1: 199.99 },
    "Watch 2": { 1: 199.99 },
    "Watch 3": { 1: 199.99 },
    "Watch 4": { 1: 199.99 },
    "Watch 5": { 1: 199.99 },
    "Flower 1": { 1: 29.99 },
    "Flower 2": { 1: 29.99 },
    "Flower 3": { 1: 29.99 },
    "Flower 4": { 1: 29.99 },
    "Flower 5": { 1: 29.99 },
    "Plushie 1": { 1: 19.99 },
    "Plushie 2": { 1: 19.99 },
    "Plushie 3": { 1: 19.99 },
    "Plushie 4": { 1: 19.99 },
    "Plushie 5": { 1: 19.99 },
    "Chocolate 1": { 1: 15.99 },
    "Chocolate 2": { 1: 15.99 },
    "Chocolate 3": { 1: 15.99 },
    "Chocolate 4": { 1: 15.99 },
    "Chocolate 5": { 1: 15.99 },
    "Decor 1": { 1: 15.99 },
    "Decor 2": { 1: 15.99 },
    "Decor 3": { 1: 15.99 },
    "Decor 4": { 1: 15.99 },
    "Decor 5": { 1: 15.99 },
    "Perfume 1": { 1: 15.99 },
    "Perfume 2": { 1: 15.99 },
    "Perfume 3": { 1: 15.99 },
    "Perfume 4": { 1: 15.99 },
    "Perfume 5": { 1: 15.99 }
};

// Function to Add Items to the Cart
function addToCart(productName, amountId, gramId) {
    const amountElement = document.getElementById(amountId);
    const gramElement = gramId ? document.getElementById(gramId) : null;

    if (!amountElement) {
        alert("Amount element not found!");
        return;
    }

    const amount = parseInt(amountElement.textContent, 10);
    const gram = gramElement ? parseInt(gramElement.value, 10) : 1;

    // Fetch price based on product name and weight or default to single price
    const price = productPrices[productName]?.[gram] || productPrices[productName]?.[1];

    if (price === undefined) {
        alert(`${productName} is not available.`);
        return;
    }

    if (amount > 0) {
        // Proper unique key: Combine productName and gram (or a fallback if gram is undefined)
        const uniqueKey = gram ? `${productName}-${gram}g` : productName;

        if (cart[uniqueKey]) {
            cart[uniqueKey].amount += amount;
        } else {
            cart[uniqueKey] = { name: productName, amount, gram, price };
        }

        alert(`Added ${amount} of ${productName} to the cart at $${price.toFixed(2)} each!`);
        updateCartCount();
    } else {
        alert("Please select a valid amount before adding to the cart.");
    }
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('cart-total-price'); // Ensure ID matches
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.amount * item.price), 0);

    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

// Function to Remove Item from the Cart
function removeFromCart(uniqueKey) {
    if (cart[uniqueKey]) {
        delete cart[uniqueKey];
        alert("Item removed from the cart.");
    }
    updateCartDisplay(); // Refresh the cart display
    updateCartCount(); // Refresh the cart count
    updateTotalPrice(); // Update total price
}

// Function to Clear the Entire Cart
function clearCart() {
    cart = {}; // Clear the cart object
    updateCartDisplay(); // Refresh the cart display
    updateCartCount(); // Refresh the cart count
    updateTotalPrice(); // Reset total price to $0.00
    alert("Cart has been cleared.");
}

// Function to Proceed to Checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Add items before proceeding to checkout.");
        return;
    }

    let totalAmount = 0;
    let totalPrice = 0;

    for (const item of Object.values(cart)) {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
    }

    alert(`Proceeding to checkout with ${totalAmount} items. Total Price: $${totalPrice.toFixed(2)}`);
}

// Function to Update the Amount Increment/Decrement
function updateAmount(amountId, delta) {
    const amountElement = document.getElementById(amountId);
    if (!amountElement) return;

    let currentAmount = parseInt(amountElement.textContent, 10);
    currentAmount = Math.max(0, currentAmount + delta); // Prevent negative amounts
    amountElement.textContent = currentAmount;
}

// Function to Open the Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Function to Close the Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Event Listener for Cart Modal Trigger
document.getElementById("cart-link").addEventListener("click", function (event) {
    event.preventDefault();
    updateCartDisplay();
    openModal("cart-modal");
});

// Close Modal When Clicking Outside
document.getElementById("cart-modal").addEventListener("click", function (event) {
    if (event.target === this) {
        closeModal("cart-modal");
    }
});
