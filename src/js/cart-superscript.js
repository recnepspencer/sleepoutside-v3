import { getLocalStorage } from "./utils.mjs";

export function cartSuperscript() {
  let cartItems = getLocalStorage("so-cart");
  let superscript = document.getElementById("superscript-number");
  superscript.textContent = cartItems.length;
  console.log("Completed");
}
