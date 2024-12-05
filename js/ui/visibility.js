import { loadFromLocalStorage } from '../utils/localStorage.js';

// Manage visibility of loading, error, and product list
export function setVisibility({ loading, error, productList }) {
    const loadingElement = document.querySelector("#loading");
    const errorElement = document.querySelector("#error");
    const productListElement = document.querySelector("#products-list");

    loadingElement.style.display = loading ? "block" : "none";
    errorElement.style.display = error ? "block" : "none";
    productListElement.style.display = productList ? "flex" : "none";

    if (error) {
        errorElement.textContent = "Failed to load the products.";
    }
}

// Update the cart display with the total price
export function updateCartDisplay() {
    const cart = loadFromLocalStorage('cart');
    const cartTotalElement = document.getElementById('cart-total');

    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price;
    });

    cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}
