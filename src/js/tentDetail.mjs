// Import necessary functions from other modules
import { findProductById } from "./productData.mjs";
import { addProductToCart } from "./product.js";
import { cartCount } from "./stores.mjs";
import { getCartCount } from "./utils.mjs";


// Define and export the default function for handling tent details
export default async function tentDetails(productId, selector) {
  console.log("Product ID:", productId);

  // Fetch product details using the product ID
  let product = await findProductById(productId);
  if (!product) {
    console.error("Product not found");
    return;
  }

  // Select the HTML element and insert product details using a template
  const el = document.querySelector(selector);
  el.innerHTML = productDetailsTemplate(product);

  // Add an event listener to the 'Add to Cart' button
  const addToCartButton = el.querySelector("#addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      addToCart(product);
    });
  } else {
    console.error("Add to Cart button not found");
  }

  // Create color buttons
  createColorButtons(product);
}

// Function to handle adding products to the cart
function addToCart(product) {
  console.log("Adding product to cart:", product);
  addProductToCart(product);
  cartCount.set(getCartCount());
}

// Function to apply a discount if the product is on clearance
function applyDiscount(product) {
  if (product.IsClearance) {
    const discountedPrice = product.FinalPrice * 0.8;
    return `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}`;
  }
  return `$${product.FinalPrice}`;
}

// Function to create color buttons for the product
function createColorButtons(product) {
  const colorContainer = document.getElementById('color-options');
  product.Colors.forEach(color => {
    const colorButton = document.createElement('button');
    colorButton.textContent = color.ColorName;
    colorButton.classList.add('color-button');
    colorButton.onclick = function() {
      // Toggle the background color between gray and white
      if (this.style.backgroundColor === 'gray') {
        this.style.backgroundColor = 'white';
      } else {
        // Reset other buttons
        document.querySelectorAll('.color-button').forEach(btn => btn.style.backgroundColor = 'white');
        this.style.backgroundColor = 'gray';
      }
    };
    colorContainer.appendChild(colorButton);
  });
}

// Template function to render HTML content for the product details
function productDetailsTemplate(product) {
  const discountedPrice = applyDiscount(product); // Apply discount if applicable

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.Name}" />
    <p class="product-card__price">${discountedPrice}</p> <!-- Show discounted price if applicable -->
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    <div id="color-options"></div>
  `;
}
