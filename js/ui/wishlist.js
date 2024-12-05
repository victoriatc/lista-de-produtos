import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage.js';

// Add an item to the wishlist
export function addToWishlist(item) {
    const wishlist = loadFromLocalStorage('wishlist');
    if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        wishlist.push(item);
        saveToLocalStorage('wishlist', wishlist);
        console.log(`Added to wishlist: ${item.title}`);
    }
}

// Remove an item from the wishlist
export function removeFromWishlist(itemId) {
    let wishlist = loadFromLocalStorage('wishlist');
    wishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== itemId);
    saveToLocalStorage('wishlist', wishlist);
    console.log(`Removed from wishlist: ${itemId}`);
}

// Get all items from the wishlist
export function getWishlist() {
    return loadFromLocalStorage('wishlist');
}
