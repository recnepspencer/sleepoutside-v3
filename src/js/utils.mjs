import { findProductById } from "./productData.mjs";
import MainHeader from './components/MainHeader.svelte';
import MainFooter from './components/MainFooter.svelte';

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



export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(`${param}`)
  return param;
}

export function renderHeaderFooter() {
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');
  
  if (headerElement) {
    new MainHeader({
      target: headerElement,
    })
  }

  if (footerElement) {
    new MainFooter({
      target: footerElement
    })
  }
}

export function getCartCount() {
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems) && cartItems != null) {
    return 1;
  }
  return cartItems.length || null;

}

const productId = getParam('id');