<script>
  import { createEventDispatcher } from "svelte";

    export let pro
    export let isShown
    
    const dispatch = createEventDispatcher()
    console.log(pro)

    // Using Spencer's code...
    function applyDiscount(product) {
      let finalPrice = product.FinalPrice;
  
      if (product.IsClearance) {
        finalPrice = finalPrice * 0.8;
        return `<span class="strikethrough">$${product.ListPrice.toFixed(2)}</span> $${finalPrice.toFixed(2)}`;
      }
      return `$${finalPrice.toFixed(2)}`;
    }

</script>

{#if isShown}
<div class="modal-container">
    <button type="button" on:click={() => {dispatch("hide")}} class="close-modal">X</button>
    
    <p class="title middle">{pro.Name}</p>
    <p class="middle">Product Id: <strong>{pro.Id}</strong></p>
    <p class="middle price-wrap"><span class="price">{@html applyDiscount(pro)}</span></p>
    <div>
        {#each pro.Colors as color}
        <div class="middle">{color.ColorName}</div>
        <div class="center">
            <img src="{color.ColorPreviewImageSrc}" alt="{color.ColorName}">
        </div>
        {/each}
    </div>
</div>
{/if}

<style>
    .modal-container {
        border-radius: 5px;
        box-shadow: 1px 1px 4px var(--light-grey);
        padding: 5px;
        position: absolute;
        z-index: 2;
        background-color: white;
        /* used code from: https://www.freecodecamp.org/news/how-to-center-an-absolute-positioned-element/ */
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow-y: scroll;
    }

    .center {
        display: flex;
        justify-content: center;
    }

    .middle {
        text-align: center;
    }

    .price-wrap {
        margin: 15px 0;
    }

    img {
        width: 100px;
    }
    .title {
        padding: 0 15px;
        font-weight: bold;
    }

    .price {
        border: 2px solid var(--secondary-color);
        padding: 5px;
    }

    .close-modal {
        position: absolute;
        border: none;
        background-color: rgba(255, 255, 255, 0);
        padding: 0;
        left: 5px;
        color: var(--dark-grey);
        font-size: medium;
    }
</style>