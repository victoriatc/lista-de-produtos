import { populateList } from './productList.js';
import { debounce } from '../utils/debounce.js';

export function createCategoryFilter(data) {
    const filterContainer = document.querySelector("#category-filter");
    filterContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const categories = [...new Set(data.map((item) => item.category))];
    categories.forEach((category) => {
        const checkbox = createCategoryCheckbox(category);
        const label = createCategoryLabel(category);

        checkbox.addEventListener(
            "change",
            debounce(() => {
                handleCategoryChange(data, filterContainer);
            }, 300)
        );

        fragment.appendChild(checkbox);
        fragment.appendChild(label);
    });

    filterContainer.appendChild(fragment);
}

function createCategoryCheckbox(category) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `category-${category}`);
    checkbox.setAttribute("value", category);
    return checkbox;
}

function createCategoryLabel(category) {
    const label = document.createElement("label");
    label.setAttribute("for", `category-${category}`);
    label.textContent = category;
    return label;
}

function handleCategoryChange(data, filterContainer) {
    const selectedCategories = Array.from(
        filterContainer.querySelectorAll("input:checked")
    ).map((input) => input.value);

    const filteredData = selectedCategories.length
        ? data.filter((product) => selectedCategories.includes(product.category))
        : data;

    populateList(filteredData);
}

export function handleSearch(data) {
    const inputSearch = document.querySelector("#search");
    let debounceTimeout;

    inputSearch.addEventListener("input", () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const searchValue = inputSearch.value.toLowerCase();
            const filteredData = searchValue.length > 2
                ? data.filter((product) => product.title.toLowerCase().includes(searchValue))
                : data;

            populateList(filteredData);
        }, 300);
    });
}
