import { setLocalStorage,getLocalStorage, setClick } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
<<<<<<< HEAD
import { getLocalStorage, getParam } from "./utils.mjs";

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
}
=======
import { getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import tentDetails from "./tentDetail.mjs"
>>>>>>> revert-branch

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


<<<<<<< HEAD
// add listener to Add to Cart button
setClick ("#addToCart", addToCartHandler); // Attach event listener
=======
  const productId = getParam('product');
 tentDetails(productId, '.product-detail');
>>>>>>> revert-branch
