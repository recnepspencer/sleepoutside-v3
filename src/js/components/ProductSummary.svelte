<script>
    import { getParam } from "../utils.mjs";
    import QuickViewModal from "./QuickViewModal.svelte";
  
    export let pro = {};
    export let category = getParam("category");
    $: isShown = false
  
    function getImageUrl(product) {
      return product.Images.PrimaryLarge;
    }
  
    function applyDiscount(product) {
      let finalPrice = product.FinalPrice;
  
      if (product.IsClearance) {
        finalPrice = finalPrice * 0.8;
        return `<span class="strikethrough">$${product.ListPrice.toFixed(2)}</span> $${finalPrice.toFixed(2)}`;
      }
      return `$${finalPrice.toFixed(2)}`;
    }

    function showModal(productToShow) {
      isShown = true
    }
  </script>
  
  <section class="summary-container">
    <QuickViewModal on:hide={()=>{isShown = false}} {pro} {isShown} />
    <button class="quick-view-btn" on:click|stopPropagation={() => showModal(pro)}>Quick View</button>
    <a href={`/product_pages/index.html?category=${category}&product=${pro.Id}`}>
      <img src={getImageUrl(pro)} alt={pro.NameWithoutBrand} />
      <h3 class="card__brand">{pro.Brand.Name}</h3>
      <h2 class="card__name">{pro.NameWithoutBrand}</h2>
      <p class="product-card__price">{@html applyDiscount(pro)}</p>
    </a>
  </section>
  

<style>
  .summary-container{
    position: relative;
  }
  .quick-view-btn {
    position: absolute;
    font-size: x-small;
    padding: 5px;
    top: 5px;
    left: 5px;
  }
</style>