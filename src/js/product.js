import { setLocalStorage, getLocalStorage, setClick } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam, addProductToCart } from "./utils.mjs";
import tentDetails from "./tentDetail.mjs";

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
