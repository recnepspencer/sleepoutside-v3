import { findProductById } from "./productData.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  if (item === null) {
    return [];  // Return an empty array if there is no item
  }
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error("Parsing error in getLocalStorage for key:", key, error);
    return [];  // Return an empty array if parsing fails
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function addProductToCart(item) {
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    console.error('Cart items is not an array:', cartItems);
    cartItems = [];
  }
  cartItems.push(item);  // Add new item
  setLocalStorage("so-cart", cartItems);
}

// Define and export the addToCartHandler
export async function addToCartHandler(e, productId, category) {
  const product = await findProductById(productId, category);
  addProductToCart(product);
}
