import ProductDetails from "./components/ProductDetails.svelte";
import ProductList from "./components/ProductList.svelte";
import { getParam } from "./utils.mjs";

const category = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: category }
});