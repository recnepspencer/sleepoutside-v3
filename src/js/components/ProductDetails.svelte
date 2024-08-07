<script>
    import { onMount } from 'svelte';
    import { findProductById, getRecommendedProducts } from '../externalServices.mjs';
    import { addProductToCart } from '../product.js';
    import { getParam, getLocalStorage, setLocalStorage } from '../utils.mjs';
    import { cartCount } from "../stores.mjs";
    import {alertMessage} from '../utils.mjs';
    import ProductSummary from "./ProductSummary.svelte";
  
    export let productId = getParam("product");
    let productCategory = getParam("category");
    let product = {};
    let selectedColor = '';
    let errorPage = false

    let quantity = 1;
    let mainImageSrc = '';
    let mainImageAlt = '';
  
    let promise = getRecommendedProducts(productId)

    function getProperImageSize(product) {
      const screenWidth = window.innerWidth;
  
      if (screenWidth <= 480) {
        return product.Images.PrimarySmall;
      } else if (screenWidth <= 768) {
        return product.Images.PrimaryMedium;
      } else if (screenWidth <= 1024) {
        return product.Images.PrimaryLarge;
      } else {
        return product.Images.PrimaryExtraLarge;
      }
    }
  
    function applyDiscount(product) {
      if (product.IsClearance) {
        const discountedPrice = product.FinalPrice * 0.8;
        return `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}`;
      }
      return `$${product.FinalPrice}`;
    }
  
    async function fetchProductData() {
      console.log("Category:", productCategory);
      console.log("Fetching product data for ID:", productId);
      if (productId) {
        product = await findProductById(productId);
        console.log("Product data:", product);
        mainImageSrc = getProperImageSize(product);
        mainImageAlt = product.Name;
      } else {
        console.error("Product ID not found in URL");
      }
    }
  
    function addToCart() {
      if (!selectedColor) {
        alert('Please select a color before adding to cart');
        return;
      }
      const cartItem = {
        ...product,
        selectedColor: selectedColor,
        quantity: quantity,
        Colors: product.Colors.filter(color => color.ColorName === selectedColor)
      };

      // check if the item is already in the cart
      
      let cart = getLocalStorage("so-cart")
      console.log(`PRE CART ${cart}`)
      let alreadyAdded = false
      const isSame = (a,b) => a.Id == b.Id && a.selectedColor == b.selectedColor

      if (Array.isArray(cart)){
        for (let i in cart) {
          if (isSame(cart[i], cartItem)) {
            cart[i].quantity += cartItem.quantity
            setLocalStorage("so-cart", cart)
            alreadyAdded = true
            break
          }
        }
      } else {
        if (isSame(cart, cartItem)) {
          cart.quantity += cartItem.quantity
          cart = [cart]
          setLocalStorage("so-cart", cart)
          alreadyAdded = true
        }
      }

      if (!alreadyAdded) {
        addProductToCart(cartItem);
        console.log("Adding product to cart:", cartItem);
      }
      alertMessage("Product added to cart!")

      cartCount.update(n => n + cartItem.quantity);
    }
  
    function toggleColor(event) {
      const button = event.target;
      selectedColor = button.textContent;
      console.log("Selected color:", selectedColor);
      document.querySelectorAll('.color-button').forEach(btn => btn.style.backgroundColor = 'white');
      button.style.backgroundColor = 'gray';
    }
  
    function changeMainImage(src, alt) {
      mainImageSrc = src;
      mainImageAlt = alt;
    }
  
    function setupImageSwitching() {
      document.querySelectorAll('.extra-image').forEach(element => {
        element.addEventListener('click', () => {
          const index = element.getAttribute('data-index');
          if (index === 'main') {
            changeMainImage(getProperImageSize(product), product.Name);
          } else {
            const selectedImage = product.Images.ExtraImages[index];
            changeMainImage(selectedImage.Src, selectedImage.Title);
          }
        });
      });
    }
  
    onMount(async () => {
      await fetchProductData();
      setupImageSwitching();
    });
  </script>
  
  <style>
    .strikethrough {
      text-decoration: line-through;
    }
    .color-button {
      margin: 5px;
    }
    .product-list {
      flex-wrap: nowrap;
    }
</style>

{#if product?.Name}

    <div class="product-detail">
      <h3>{product.Brand.Name}</h3>
      <h2>{product.NameWithoutBrand}</h2>
      <img id="main-image" src={mainImageSrc} alt={mainImageAlt} />
      <p>{@html applyDiscount(product)}</p>
      <p>{@html product.DescriptionHtmlSimple}</p>
      <div id="color-options">
        {#each product.Colors as color}
          <button class="color-button" on:click={toggleColor}>{color.ColorName}</button>
        {/each}
      </div>
      <div class="extra-images" id="extra-images">
        {#if product.Images.ExtraImages}
          <figure>
            <img src="{getProperImageSize(product)}" alt="{product.Name}" class="extra-image" data-index="main" />
            <figcaption>Main Image</figcaption>
          </figure>
          {#each product.Images.ExtraImages as item, index}
            <figure>
              <img src="{item.Src}" alt="{item.Title}" class="extra-image" data-index="{index}" />
              <figcaption>{item.Title}</figcaption>
            </figure>
          {/each}
        {/if}
      </div>
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" bind:value={quantity} min="1" />
      <button id="addToCart" on:click={addToCart}>Add to Cart</button>
    </div>
      <h3>Recommended Products</h3>
      {#await promise}
        <p>Loading recommended products...</p>
      {:then recommendedProducts} 
        <ul class="product-list">
          {#each recommendedProducts as recPro}
          <li class="product-card"><ProductSummary pro={recPro} category={recPro.Category}/></li>
          {/each}
        </ul>
      {/await}
{:else if errorPage}
    <h2>Error: Product Not Found</h2>
    <p>Unfortunately, the product was not found. Please ensure that the product's ID is correct in the URL.</p>
    <a href="../index.html">Home</a>
{:else}
    <p>Loading product details...</p>
  {/if}
  