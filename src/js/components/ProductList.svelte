<script>
  import { getProductsByCategory } from "../externalServices.mjs";
  import ProductSummary from "./ProductSummary.svelte";

  export let category;

  $: products = [];
  let promise = getProductsByCategory(category);

  promise.then((pros) => {
    products = pros;
  });
  const sortByName = (a, b) => {
    if (a.Name > b.Name) {
      return 1;
    } else if (a.Name < b.Name) {
      return -1;
    } else if (a.Name === b.Name) {
      return 0;
    }
  };
  const sortByPrice = (a, b) => a.FinalPrice - b.FinalPrice;

  function selectName() {
    products = products.sort(sortByName);
    console.log("name clicked");
    document.querySelector(".price-sort").classList.remove("active");
    document.querySelector(".name-sort").classList.add("active");
  }
  function selectPrice() {
    products = products.sort(sortByPrice);
    document.querySelector(".name-sort").classList.remove("active");
    document.querySelector(".price-sort").classList.add("active");
  }
</script>

<h2>Top Products</h2>
{#await promise}
  <p>Loading</p>
{:then}
  <div class="none active"></div>
  <div class="sort-selection-container">
    <p>Sort by:</p>
    <button on:click={selectName} class="sort-selection name-sort">Name</button>
    <button on:click={selectPrice} class="sort-selection price-sort"
      >Price</button
    >
  </div>
  <ul class="product-list">
    {#each products as pro (pro.Id)}
      <li class="product-card"><ProductSummary {pro} /></li>
    {/each}
  </ul>
{:catch error}
  <p>{error}</p>
{/await}

<style>
  .sort-selection-container {
    display: flex;
    max-width: 200px;
  }
  .sort-selection {
    padding: 5px;
    font-size: small;
    border: solid 2px var(--secondary-color);
    background-color: white;
    color: var(--secondary-color);
  }
  .active {
    background-color: var(--secondary-color);
    color: white;
  }
  .none {
    display: none;
  }
</style>
