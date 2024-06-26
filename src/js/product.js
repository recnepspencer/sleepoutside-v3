import {
  setLocalStorage,
  getLocalStorage,
  setClick,
  getParam,
} from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
//import tentDetails from "./tentDetail.mjs";

//get , set , update the local storage
export function addProductToCart(product) {
  // console.log(product);
  let cart = [];
  if (getLocalStorage("so-cart")) {
    getLocalStorage("so-cart").forEach((oldCartItem) => {
      cart.push(oldCartItem);
    });
  }
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  // console.log(cart);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  // console.log(e.target.dataset.id);
  console.log(e);
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  //   console.log("running");
}

const productId = getParam("product");
//tentDetails(productId, ".product-detail");

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
