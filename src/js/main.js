import ProductList from "./components/ProductList.svelte"
import { visitCounter } from "./welcome-banner";

// Set localStorage variable for visit count.
window.addEventListener('DOMContentLoaded', () => {
    visitCounter();
})

new ProductList({
    target: document.querySelector(".products"),
    props: {category: "tents"}
});