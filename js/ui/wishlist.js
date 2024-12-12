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

// show wish list button event
function wishToggle(){
document.getElementById('wishlist-toggle').addEventListener('click', () => {
    const wishlistContainer = document.getElementById('wishlist-items');
    wishlistContainer.style.display =
        wishlistContainer.style.display === 'none' || !wishlistContainer.style.display ? 'block' : 'none';
    
    if (wishlistContainer.style.display === 'block') {
        loadWishlistItems();
    }
});
}


// Upload wishlist items
function loadWishlistItems() {
    const wishlist = getWishlist();
    const wishlistContainer = document.getElementById('wishlist-items');
    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>There are no items in the wishlist</p>';
        return;
    }

    wishlist.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'wishlist-item';
        itemElement.textContent = item.title;
        wishlistContainer.appendChild(itemElement);
    });
}

// invisible accordion
document.getElementById('wishlist-items').style.display = 'none';