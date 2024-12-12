import { setVisibility } from './ui/visibility.js';
import { fetchProducts } from './api.js';
import { handleSuccessfulFetch, handleFetchError } from './ui/productList.js';
import { loadSavedCart } from './ui/cart.js';

async function init() {
    setVisibility({ loading: true, error: false, productList: false });

    try {
        const data = await fetchProducts();
        handleSuccessfulFetch(data);
        loadSavedCart();
    } catch (error) {
        handleFetchError(error);
    }
}




init();
