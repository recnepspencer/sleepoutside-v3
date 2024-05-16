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



export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(`${param}`)
  return param;
}

const productId = getParam('id');