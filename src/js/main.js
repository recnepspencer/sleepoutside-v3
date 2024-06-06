import ProductList from "./components/ProductList.svelte";
import ProductDetails from "./components/ProductDetails.svelte";
import { visitCounter } from "./welcome-banner";
import { getParam } from "./utils";

// Set localStorage variable for visit count.
window.addEventListener("DOMContentLoaded", () => {
  visitCounter();
});

const productId = getParam("product");

if (productId) {
  new ProductDetails({
    target: document.querySelector(".product-detail"),
    props: { productId },
  });
} else {
  new ProductList({
    target: document.querySelector(".products"),
    props: { category: category },
  });
}
