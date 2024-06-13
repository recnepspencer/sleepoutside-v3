import { get } from "svelte/store";
import { getParam } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export async function checkout(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${baseURL}checkout`, options)
  return await convertToJson(res)
}

export async function getProductsByCategory(category) {
  category = category || getParam("category");
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id, category) {
  const products = await getProductsByCategory(category);
  return products.find((item) => item.Id === id);
}
