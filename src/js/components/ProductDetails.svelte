<script>
    import { onMount } from 'svelte';
    import { findProductById } from '../productData.mjs'
    import { addProductToCart } from '../product';
    import { getParam } from '../utils.mjs';

    let productId = getParam("product");
    let product = {};

    onMount(async () => {
        if (productId) {
            product = await findProductById(productId);
        } else {
            console.error("Product ID not found in URL");
        }
    });

    function applyDiscount(product) {
        if (product.IsClearance) {
            const discountedPrice = product.FinalPrice * 0.8;
            return `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}`;
        }
        return `$${product.FinalPrice}`;
    }

    function addToCart() {
        addProductToCart(product);
    }
</script>

<style>
    .strikethrough {
        text-decoration: line-through;
    }
    .color-button {
        margin: 5px;
    }
</style>

{#if product.Name}
    <div class="product-detail">
        <h3>{product.Brand.Name}</h3>
        <h2>{product.NameWithoutBrand}</h2>
        <img src={product.Image} alt={product.Name} />
        <p>{@html applyDiscount(product)}</p>
        <p>{product.DescriptionHtmlSimple}</p>
        <div id="color-options">
            {#each product.Colors as color}
                <button class="color-button" on:click="{() => toggleColor(color)}">{color.ColorName}</button>
            {/each}
        </div>
        <button id="addToCart" on:click="{addToCart}">Add to Cart</button>
    </div>
{:else}
    <p>Loading product details...</p>
{/if}
