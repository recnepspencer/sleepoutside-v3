// Import necessary functions from other modules
import { findProductById } from "./productData.mjs";
import { addProductToCart } from "./product.js";

let product = {};

// Define and export the default function for handling tent details
export default async function tentDetails(productId, selector) {
  console.log("Product ID:", productId);
  
  // Fetch product details using the product ID
  product = await findProductById(productId);
  if (!product) {
    console.error("Product not found");
    return;
  }

  // Select the HTML element and insert product details using a template
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  
  // Add an event listener to the 'Add to Cart' button
  const addToCartButton = el.querySelector("#addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
  } else {
    console.error("Add to Cart button not found");
  }
}

// Function to handle adding products to the cart
function addToCart() {
  console.log("Adding product to cart:", product);
  addProductToCart(product)
}

// Template function to render HTML content for the product details
function productDetailsTemplate(product) {
  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.Name}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}
