import { get } from "svelte/store";
import { getParam } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
      return res.json();
  } else {
      throw new Error("Bad Response");
  }
}

export async function getData(category) {
  category = category || getParam("category");
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}
