import ProductList from "./components/ProductList.svelte"
import { visitCounter } from "./welcome-banner";

new ProductList({
    target: document.querySelector(".products"),
    props: {category: "tents"}
});

window.addEventListener('DOMContentLoaded', () => {
    visitCounter();
})

