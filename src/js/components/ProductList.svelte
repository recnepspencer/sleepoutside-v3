<script>
    import { getData } from "../productData.mjs";
    import ProductSummary from "./ProductSummary.svelte";

    export let category;

  let promise = getData(category)


  
</script>

<h2>Top Products</h2>
{#await promise}
    <p>Loading</p>
{:then products}
<ul class="product-list">
{#each products as pro}
        <li class="product-card"><ProductSummary {pro} /></li>
{/each}
</ul>
{:catch error}
    <p>{error}</p>
{/await}


