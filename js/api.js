export async function fetchProducts() {
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
