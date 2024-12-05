import { createProductListItem } from './productItem.js';
import { setVisibility } from './visibility.js';
import { handleSearch, createCategoryFilter } from './filters.js';

export function handleSuccessfulFetch(data) {
    setVisibility({ loading: false, error: false, productList: true });
    populateList(data);
    handleSearch(data);
    createCategoryFilter(data);
}

export function handleFetchError(error) {
    setVisibility({ loading: false, error: true, productList: false });
    console.error("Error fetching data:", error);
}

export function populateList(data) {
    const productList = document.querySelector("#products-list");
    productList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    if (data.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.textContent = "No products available.";
        productList.appendChild(noProductsMessage);
        return;
    }

    data.forEach((item) => {
        const li = createProductListItem(item);
        fragment.appendChild(li);
    });

    productList.appendChild(fragment);
}
