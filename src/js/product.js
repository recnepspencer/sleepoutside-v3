import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";

function addProductToCart(item) {
  let cartItems = getLocalStorage("so-cart");
  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    console.error('Cart items is not an array:', cartItems);
    cartItems = [];
  }

  // Push the new item directly into the array
  cartItems.push(item);  // Add new item

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
