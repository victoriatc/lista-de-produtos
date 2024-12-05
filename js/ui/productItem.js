import { toggleCartButton } from './cart.js';
import { addToWishlist, removeFromWishlist } from './wishlist.js';
import { loadFromLocalStorage } from '../utils/localStorage.js';

// Create a list item for a product
export function createProductListItem(item) {
    const li = document.createElement("li");
    li.setAttribute("id", `product-${item.id}`);

    const image = createImage(item);
    const details = createDetails(item);

    li.append(image, details);
    return li;
}

// Create product image element
function createImage(item) {
    const image = document.createElement("img");
    image.setAttribute("src", item.image);
    image.setAttribute("alt", item.title);
    image.style.width = "100px";
    image.style.cursor = "pointer";
    return image;
}

// Create product details element
function createDetails(item) {
    const details = document.createElement("div");

    const titleLink = createTitleLink(item);
    const price = createPrice(item);
    const cartButton = createAddToCartButton(item);
    const saveCheckbox = createSaveCheckbox(item);
    const saveLabel = createSaveLabel(item);

    details.append(titleLink, price, cartButton, saveCheckbox, saveLabel);
    return details;
}

// Create title link for a product
function createTitleLink(item) {
    const titleLink = document.createElement("a");
    titleLink.setAttribute("href", "#");
    titleLink.textContent = item.title;
    titleLink.style.textDecoration = "none";
    titleLink.style.color = "black";
    return titleLink;
}

// Create product price element
function createPrice(item) {
    const price = document.createElement("p");
    price.innerHTML = `Price: $${item.price}`;
    return price;
}

// Create 'Add to Cart' button
function createAddToCartButton(item) {
    const button = document.createElement("button");
    toggleCartButton(button, item);
    return button;
}

// Create save checkbox for wishlist
function createSaveCheckbox(item) {
    const saveCheckbox = document.createElement("input");
    saveCheckbox.setAttribute("type", "checkbox");
    saveCheckbox.setAttribute("id", `save-${item.id}`);
    saveCheckbox.setAttribute("name", "save");
    saveCheckbox.setAttribute("value", item.id);

    const wishlist = loadFromLocalStorage('wishlist');
    saveCheckbox.checked = wishlist.some((wishlistItem) => wishlistItem.id === item.id);

    saveCheckbox.addEventListener('change', () => {
        if (saveCheckbox.checked) {
            addToWishlist(item);
        } else {
            removeFromWishlist(item.id);
        }
    });

    return saveCheckbox;
}

// Create save label for wishlist checkbox
function createSaveLabel(item) {
    const saveLabel = document.createElement("label");
    saveLabel.setAttribute("for", `save-${item.id}`);
    saveLabel.textContent = " Save in my list";
    return saveLabel;
}
