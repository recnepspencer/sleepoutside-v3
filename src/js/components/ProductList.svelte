<script>
    import { getData } from "../productData.mjs";
    import ProductSummary from "./ProductSummary.svelte";

    export let category;

  let promise = getData(category)

  function checkIfNeeded(pro){
    // TODO: Change this in the future to allow more products
    const neededItems = ["880RR", "985RF", "344YJ", "985PR"];
    return neededItems.includes(pro.Id)
  }
  
</script>

<h2>Top Products</h2>
{#await promise}
    <p>Loading</p>
{:then products}
<ul class="product-list">
{#each products as pro}
    {#if checkIfNeeded(pro)}
        <li class="product-card"><ProductSummary {pro} /></li>
    {/if}
{/each}
</ul>
{:catch error}
    <p>{error}</p>
{/await}


