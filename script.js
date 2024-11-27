async function init() {
    setVisibility({ loading: true, error: false, productList: false });

    //save wishilist locally 
    function saveWishilist(wishilist){
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }

    //load wishlist from local storage
    function addToWishiList(itemId){
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    }


    try {
      const data = await fetchProducts();
      handleSuccessfulFetch(data);
    } catch (error) {
      handleFetchError(error);
    }
  }
  
  // Function to handle successful data fetch
  function handleSuccessfulFetch(data) {
    setVisibility({ loading: false, error: false, productList: true });
    populateList(data);
    handleSearch(data);
    createCategoryFilter(data);
  }
  
  // Function to handle fetch error
  function handleFetchError(error) {
    setVisibility({ loading: false, error: true, productList: false });
    console.error("Error fetching data:", error);
  }
  
  // Function to fetch products from the API
  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error("Network error or API is unavailable");
    }
  }
  
  // Function to populate the product list
  function populateList(data) {
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
  
  // Function to create individual product list items
  function createProductListItem(item) {
    const li = document.createElement("li");
    li.setAttribute("id", item.id);
  
    const image = createImage(item);
    const details = createDetails(item);
  
    li.append(image, details);
  
    return li;
  }
  
  // Function to create the product image element
  function createImage(item) {
    const image = document.createElement("img");
    const link = document.createElement("a")
    image.setAttribute("src", item.image);
    image.setAttribute("alt", item.title);
    image.style.width = "100px";
    image.style.cursor = "pointer"
    return image;
  }
  
  // Function to create the product details element
  function createDetails(item) {
    const details = document.createElement("div");
  
    const titleLink = createTitleLink(item);
    const price = createPrice(item);
    const saveCheckbox = createSaveCheckbox(item);
    const saveLabel = createSaveLabel(item);
    const addToCartButton = createAddToCartButton();
  
    details.append(titleLink, price, saveCheckbox, saveLabel, addToCartButton);
    return details;
  }
  
  // Function to create the title link element
  function createTitleLink(item) {
    const titleLink = document.createElement("a");
    titleLink.setAttribute("href", "#");
    titleLink.textContent = item.title;
    titleLink.style.textDecoration = "none";
    titleLink.style.color = "black";
    return titleLink;
  }
  
  // Function to create the price element
  function createPrice(item) {
    const price = document.createElement("p");
    price.innerHTML = `Price: $${item.price}`;
    return price;
  }
  
  // Function to create the save checkbox element
  function createSaveCheckbox(item) {
    const saveCheckbox = document.createElement("input");
    saveCheckbox.setAttribute("type", "checkbox");
    saveCheckbox.setAttribute("id", `save-${item.id}`);
    saveCheckbox.setAttribute("name", "save");
    saveCheckbox.setAttribute("value", item.id);
    return saveCheckbox;
  }
  
  // Function to create the save label element
  function createSaveLabel(item) {
    const saveLabel = document.createElement("label");
    saveLabel.setAttribute("for", `save-${item.id}`);
    saveLabel.textContent = " Save in my list";
    return saveLabel;
  }
  
  // Function to handle search input with debounce
  function handleSearch(data) {
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
  
  // Function to create category filter
  function createCategoryFilter(data) {
    const filterContainer = document.querySelector("#category-filter");
    filterContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
  
    // Extract unique categories from the product data
    const categories = [...new Set(data.map((item) => item.category))];
  
    // Iterate over each category to create a checkbox and label
    categories.forEach((category) => {
      const checkbox = createCategoryCheckbox(category);
      const label = createCategoryLabel(category);
  
      // Add an event listener to the checkbox to filter products when checked or unchecked, with debounce
      let debounceTimeout;
      checkbox.addEventListener("change", () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          handleCategoryChange(data, filterContainer);
        }, 300);
      });
  
      // Append the checkbox and label to the fragment
      fragment.appendChild(checkbox);
      fragment.appendChild(label);
    });
  
    // Append the fragment containing all checkboxes and labels to the filter container
    filterContainer.appendChild(fragment);
  }
  
  // Function to create a category checkbox
  function createCategoryCheckbox(category) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `category-${category}`);
    checkbox.setAttribute("value", category);
    return checkbox;
  }
  
  // Function to create a category label
  function createCategoryLabel(category) {
    const label = document.createElement("label");
    label.setAttribute("for", `category-${category}`);
    label.textContent = category;
    return label;
  }
  
  // Function to handle category change
  function handleCategoryChange(data, filterContainer) {
    const selectedCategories = Array.from(
      filterContainer.querySelectorAll("input:checked")
    ).map((input) => input.value);
  
    // Filter the product data based on selected categories
    // If no category is selected, show all products
    const filteredData = selectedCategories.length
      ? data.filter((product) => selectedCategories.includes(product.category))
      : data;
  
    // Populate the product list with the filtered data
    populateList(filteredData);
  }
  
  // Utility function to set visibility states
  function setVisibility({ loading, error, productList }) {
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


  // Function to create the add to cart button element
  function createAddToCartButton() {
    const addToCartButton = document.createElement("button")
    addToCartButton.textContent = "Add to Cart"
    return addToCartButton;
  }
  
    // Save the shopping cart to localStorage
    function saveCart(cart) {
        return JSON.parse(localStorage.getItem('cart')) || [];
}

    //add item from cart
    function addToCart(item) {
    const cart = loadCart();
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      cart.push(item);
      saveCart(cart);
      updateCartDisplay();
    }
  }

  //remove item
  function removeFromCart(itemId) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    updateCartDisplay();
  }

    // change buttom  
  function toggleAddToCartButton(button, item) {
    const cart = loadCart();
    if (cart.some(cartItem => cartItem.id === item.id)) {
      button.textContent = 'Remove from Cart';
      button.onclick = () => {
        removeFromCart(item.id);
        toggleAddToCartButton(button, item); 
      };
    } else {
        button.textContent = 'Add to Cart';
        button.onclick = () => {
          addToCart(item);
          toggleAddToCartButton(button, item); 
        };
      }
    }


    //up cart counter value
  function updateCartDisplay() {
    const cart = loadCart();
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');
    
    const itemCount = cart.length;
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price; 
      });

  }

  init();
  