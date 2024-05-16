import { setLocalStorage, getLocalStorage, setClick, getParam, addProductToCart } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import tentDetails from "./tentDetail.mjs";

//get , set , update the local storage
function addProductToCart(product) {
  // console.log(product);
  let cart = [];
  if (getLocalStorage("so-cart")) {
      getLocalStorage("so-cart").forEach(oldCartItem => {
        cart.push(oldCartItem);
      });
  }
  // if (!Array.isArray(cart)) {
  //   cart = [];
  // }
  cart.push(product);
  // console.log(cart);
  setLocalStorage("so-cart", cart);
  cartSuperscript();
}

// add to cart button event handler
async function addToCartHandler(e) {
  // console.log(e.target.dataset.id);
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  //   console.log("running");
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParam("product");
tentDetails(productId, ".product-detail");
