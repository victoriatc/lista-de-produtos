import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage.js';
import { updateCartDisplay } from './visibility.js';

// Toggle the cart button's text and functionality
export function toggleCartButton(button, item) {
    const cart = loadFromLocalStorage('cart');
    if (cart.some((cartItem) => cartItem.id === item.id)) {
        button.textContent = 'Remove from Cart';
        button.onclick = () => {
            removeFromCart(item.id);
            toggleCartButton(button, item);
        };
    } else {
        button.textContent = 'Add to Cart';
        button.onclick = () => {
            addToCart(item);
            toggleCartButton(button, item);
        };
    }
}

// Add an item to the cart
export function addToCart(item) {
    const cart = loadFromLocalStorage('cart');
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
        cart.push(item);
        saveToLocalStorage('cart', cart);
        updateCartDisplay();
    }
}

// Remove an item from the cart
export function removeFromCart(itemId) {
    let cart = loadFromLocalStorage('cart');
    cart = cart.filter((item) => item.id !== itemId);
    saveToLocalStorage('cart', cart);
    updateCartDisplay();
}

// Load saved cart items and update the UI
export function loadSavedCart() {
    const cart = loadFromLocalStorage('cart');
    cart.forEach((item) => {
        const productElement = document.getElementById(`product-${item.id}`);
        if (productElement) {
            const button = productElement.querySelector('button');
            toggleCartButton(button, item);
        }
    });
    updateCartDisplay();
}
