<script>
    import { onMount } from 'svelte';
    import { findProductById } from '../productData.mjs';
    import { addProductToCart } from '../product.js';
    import { getParam } from '../utils.mjs';
    import { cartCount } from "../stores.mjs";

    let productId = getParam("product");
    let product = {};
    let selectedColor = '';

    console.log("Product ID:", productId);

    async function fetchProductData() {
        console.log("Fetching product data for ID:", productId);
        if (productId) {
            product = await findProductById(productId);
            console.log("Product data:", product);
        } else {
            console.error("Product ID not found in URL");
        }
    }

    function applyDiscount(product) {
        if (product.IsClearance) {
            const discountedPrice = product.FinalPrice * 0.8;
            return `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}`;
        }
        return `$${product.FinalPrice}`;
    }

    function addToCart() {
        if (!selectedColor) {
            alert('Please select a color before adding to cart');
            return;
        }
        const cartItem = {
            ...product,
            selectedColor: selectedColor,
            Colors: product.Colors.filter(color => color.ColorName === selectedColor)
        };
        addProductToCart(cartItem);
        console.log("Adding product to cart:", cartItem);
        cartCount.update(n => n + 1);
    }

    function toggleColor(event) {
        const button = event.target;
        selectedColor = button.textContent;
        console.log("Selected color:", selectedColor);
        document.querySelectorAll('.color-button').forEach(btn => btn.style.backgroundColor = 'white');
        button.style.backgroundColor = 'gray';
    }

    onMount(fetchProductData);
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
        <p>{@html product.DescriptionHtmlSimple}</p>
        <div id="color-options">
            {#each product.Colors as color}
                <button class="color-button" on:click={toggleColor}>{color.ColorName}</button>
            {/each}
        </div>
        <button id="addToCart" on:click={addToCart}>Add to Cart</button>
    </div>
{:else}
    <p>Loading product details...</p>
{/if}
