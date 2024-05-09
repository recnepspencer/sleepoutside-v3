import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import tentDetails from "./tentDetail.mjs"

// add to cart button event handler
export async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id, category);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


  const productId = getParam('product');
 tentDetails(productId, '.product-detail');